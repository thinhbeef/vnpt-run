import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Question, ServiceData } from '../types';
import { audioManager } from '../game/audio';

interface ServiceStationModalProps {
  service: ServiceData;
  question: Question;
  onAnswerCorrect: (timeBonus: boolean) => void;
  onAnswerWrong: () => void;
  onClose: () => void;
}

export const ServiceStationModal: React.FC<ServiceStationModalProps> = ({
  service,
  question,
  onAnswerCorrect,
  onAnswerWrong,
  onClose,
}) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [countdown, setCountdown] = useState<number>(2);

  const startQuiz = () => {
    setStep('quiz');
    setStartTime(Date.now());
    audioManager.playStation();
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || step === 'result') return; // already selected

    setSelectedOption(idx);
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const isFast = elapsedSeconds < 6;

    if (idx === question.answer) {
      setIsCorrect(true);
      setStep('result');
      audioManager.playCorrect();
      onAnswerCorrect(isFast);
    } else {
      setIsCorrect(false);
      setStep('result');
      audioManager.playWrong();
      onAnswerWrong();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setStep('quiz');
    setStartTime(Date.now());
  };

  // Auto resume after correct answer
  useEffect(() => {
    if (step === 'result' && isCorrect) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, isCorrect, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-sky-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl shadow-sky-950/60 text-white relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 -left-24 w-52 h-52 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: service.colorTheme || '#0066cc' }}
        />

        {/* STEP 1: SERVICE STATION INTRO */}
        {step === 'intro' && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950 border border-sky-500/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Trạm Dịch Vụ VNPT
            </div>

            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg mb-4 border-2 border-white/20"
              style={{ backgroundColor: service.colorTheme }}
            >
              {service.name.replace('VNPT ', '').slice(0, 3)}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
              {service.name}
            </h2>

            <p className="text-sky-300 text-xs font-medium px-2.5 py-0.5 rounded bg-sky-900/40 mb-4">
              {service.category}
            </p>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md mb-6">
              {service.shortDescription}
            </p>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 w-full max-w-md mb-6 text-left">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5" /> Nhiệm vụ trạm
              </div>
              <p className="text-xs text-slate-300">
                Trả lời chính xác câu hỏi nghiệp vụ số để kích hoạt trạm và tiếp tục hành trình chuyển đổi số!
              </p>
            </div>

            <button
              id="start-mission-button"
              onClick={startQuiz}
              className="w-full max-w-md py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-sky-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              THỰC HIỆN NHIỆM VỤ
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: QUIZ QUESTION */}
        {step === 'quiz' && (
          <div className="py-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: service.colorTheme }}
                />
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {service.name} — Câu hỏi thử thách
                </span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                +100 Điểm
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-5 leading-snug">
              {question.question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5 mb-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleSelectOption(idx)}
                  className="p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3 bg-slate-800/80 border-slate-700 hover:border-sky-500 hover:bg-slate-800 text-slate-200 active:scale-[0.99] cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: RESULT FEEDBACK */}
        {step === 'result' && (
          <div className="py-4 text-center">
            {isCorrect ? (
              <div className="animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-emerald-400 mb-1">
                  ✓ NHIỆM VỤ HOÀN THÀNH
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-4">
                  <Award className="w-4 h-4" />
                  +100 SCORE
                </div>
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-left mb-6 text-xs md:text-sm text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold block mb-1">Kiến thức bổ trợ:</span>
                  {question.explanation}
                </div>
                <button
                  id="resume-game-button"
                  onClick={onClose}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  TIẾP TỤC HÀNH TRÌNH ({countdown}s)
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto mb-3 text-rose-400">
                  <XCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-rose-400 mb-1">
                  ✕ CHƯA CHÍNH XÁC
                </h3>
                <p className="text-xs text-rose-300 font-semibold mb-3">
                  Bạn bị giảm 1 HP! Hãy đọc kỹ giải thích dưới đây:
                </p>
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-left mb-6 text-xs md:text-sm text-slate-300 leading-relaxed">
                  <span className="text-sky-400 font-bold block mb-1">Gợi ý kiến thức:</span>
                  {question.explanation}
                </div>
                <button
                  id="retry-quiz-button"
                  onClick={handleRetry}
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg shadow-sky-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  THỬ LẠI CÂU HỎI
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
