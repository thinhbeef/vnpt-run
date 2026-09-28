import React from 'react';
import { RotateCcw, Home, Skull } from 'lucide-react';
import { PlayerStats, LevelConfig } from '../types';

interface GameOverModalProps {
  stats: PlayerStats;
  level: LevelConfig;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  level,
  onRestart,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl shadow-rose-950/60 text-white">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto mb-4 text-rose-400">
          <Skull className="w-9 h-9" />
        </div>

        <h2 className="text-3xl font-black text-rose-400 mb-1 tracking-tight">
          HẾT MÁU (HP)
        </h2>
        <p className="text-sm text-slate-300 mb-5">
          Nhân viên VNPT đã kiệt sức trên cung đường {level.title}.
        </p>

        {/* Stats summary */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 grid grid-cols-2 gap-3 text-left">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Điểm đạt được</div>
            <div className="text-xl font-black text-amber-300 font-mono">
              {stats.score.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Trạm đã mở</div>
            <div className="text-xl font-black text-sky-400 font-mono">
              {stats.stationsCompleted}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            id="gameover-restart-btn"
            onClick={onRestart}
            className="w-full py-3 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            CHƠI LẠI MÀN NÀY
          </button>
          <button
            id="gameover-home-btn"
            onClick={onHome}
            className="w-full py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            VỀ MENU CHÍNH
          </button>
        </div>
      </div>
    </div>
  );
};
