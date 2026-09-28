import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { QUESTIONS_POOL } from '../data/questions';
import { audioManager } from '../game/audio';

interface BossChallengeModalProps {
  onVictory: () => void;
  onFailHpPenalty: () => void;
}

export const BossChallengeModal: React.FC<BossChallengeModalProps> = ({
  onVictory,
  onFailHpPenalty,
}) => {
  // Pick 3 diverse challenge questions from hard/medium questions
  const [questions] = useState<Question[]>(() => {
    const hardPool = QUESTIONS_POOL.filter((q) => (q.difficulty || 1) >= 2);
    // Shuffle and pick 3
    const shuffled = [...hardPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (optionIdx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(optionIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optionIdx === currentQ.answer;
    if (isCorrect) {
      audioManager.playCorrect();
    } else {
      audioManager.playWrong();
    }

    const nextAnswers = [...userAnswers];
    nextAnswers[currentIdx] = isCorrect;
    setUserAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentIdx < 2) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setIsFinished(true);
      const correctCount = userAnswers.filter((a) => a === true).length;
      if (correctCount === 3) {
        audioManager.playLevelComplete();
      } else {
        onFailHpPenalty();
      }
    }
  };

  const handleRetryFailed = () => {
    setUserAnswers([null, null, null]);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setIsFinished(false);
  };

  const correctCount = userAnswers.filter((a) => a === true).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/70 rounded-2xl max-w-xl w-full p-6 shadow-2xl shadow-amber-950/60 text-white relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              THỬ THÁCH CUỐI: HOÀN THÀNH HÀNH TRÌNH CHUYỂN ĐỔI SỐ
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {userAnswers.map((ans, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full border transition-all ${
                  ans === true
                    ? 'bg-emerald-500 border-emerald-400'
                    : ans === false
                    ? 'bg-rose-500 border-rose-400'
                    : i === currentIdx
                    ? 'bg-amber-400 border-white scale-125'
                    : 'bg-slate-700 border-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {!isFinished ? (
          <div>
            <div className="text-xs text-slate-400 mb-1">
              Câu hỏi {currentIdx + 1} / 3
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {currentQ.question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5 mb-4">
              {currentQ.options.map((opt, optIdx) => {
                let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-200';
                if (isAnswerRevealed) {
                  if (optIdx === currentQ.answer) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (optIdx === selectedOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
                  }
                }
                return (
                  <button
                    key={optIdx}
                    id={`boss-opt-${optIdx}`}
                    onClick={() => handleSelect(optIdx)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {isAnswerRevealed && (
              <div className="flex justify-end mt-4">
                <button
                  id="boss-next-btn"
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition"
                >
                  {currentIdx < 2 ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            {correctCount === 3 ? (
              <div>
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center mx-auto mb-3 text-amber-400">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-amber-300 mb-1">
                  XUẤT SẮC! 3/3 CÂU HỎI ĐÚNG
                </h3>
                <p className="text-sm text-slate-300 mb-6">
                  Bạn đã chứng minh bản lĩnh của Chiến binh số VNPT đích thực!
                </p>
                <button
                  id="boss-victory-btn"
                  onClick={onVictory}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-lg transition"
                >
                  NHẬN HUÂN CHƯƠNG CHIẾN THẮNG
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto mb-3 text-rose-400">
                  <XCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-rose-400 mb-1">
                  KẾT QUẢ: {correctCount}/3 ĐÚNG
                </h3>
                <p className="text-sm text-slate-300 mb-6">
                  Bạn cần đạt 3/3 để hoàn tất chuyển đổi số đỉnh cao. Hãy thử lại!
                </p>
                <button
                  id="boss-retry-btn"
                  onClick={handleRetryFailed}
                  className="w-full py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw className="w-5 h-5" />
                  THỬ LẠI THÁCH THỨC
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
