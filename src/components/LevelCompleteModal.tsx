import React from 'react';
import { Trophy, ArrowRight, RotateCcw, Home, Sparkles, ShieldCheck } from 'lucide-react';
import { PlayerStats, LevelConfig } from '../types';

interface LevelCompleteModalProps {
  stats: PlayerStats;
  level: LevelConfig;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onHome: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  stats,
  level,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/70 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl shadow-emerald-950/60 text-white relative">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-400 animate-bounce">
          <Trophy className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          HOÀN THÀNH LEVEL
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
          {level.title}
        </h2>
        <p className="text-xs text-slate-300 mb-5">
          Bạn đã kích hoạt thành công tất cả trạm dịch vụ số và cán đích an toàn!
        </p>

        {/* Stats card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 grid grid-cols-2 gap-3 text-left">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Tổng điểm tích lũy</div>
            <div className="text-xl font-black text-amber-300 font-mono">
              {stats.score.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">HP còn lại</div>
            <div className="text-xl font-black text-rose-400 font-mono">
              {'❤️'.repeat(stats.hp)}
            </div>
          </div>

          {stats.noDamageRun && (
            <div className="col-span-2 flex items-center gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Thành tích Không Nhận Sát Thương: Thưởng +200 điểm!</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel ? (
            <button
              id="level-complete-next-btn"
              onClick={onNextLevel}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            >
              TIẾP TỤC LEVEL TIẾP THEO
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="level-complete-finish-btn"
              onClick={onHome}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              CHÚC MỪNG HOÀN THÀNH GAME!
            </button>
          )}

          <div className="flex gap-2">
            <button
              id="level-complete-replay-btn"
              onClick={onReplay}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Chơi lại
            </button>
            <button
              id="level-complete-home-btn"
              onClick={onHome}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              Menu chính
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
