import React from 'react';
import { Trophy, Star, RotateCcw, Home, Sparkles } from 'lucide-react';
import { PlayerStats } from '../types';

interface VictoryModalProps {
  stats: PlayerStats;
  highScore: number;
  onRestartAll: () => void;
  onHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  highScore,
  onRestartAll,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-400/80 rounded-2xl max-w-lg w-full p-6 text-center shadow-2xl shadow-amber-950/70 text-white relative overflow-hidden">
        {/* Confetti sparkle ambiance */}
        <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-4 text-amber-300 animate-bounce">
          <Trophy className="w-11 h-11" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          QUÁN QUÂN CHUYỂN ĐỔI SỐ VNPT
        </div>

        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-2 tracking-tight">
          VICTORY! CHIẾN THẮNG
        </h2>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Bạn đã hoàn thành trọn vẹn cả 3 hành trình số: từ Văn phòng điện tử, Đô thị thông minh đến Chính quyền số VNPT!
        </p>

        {/* Score Board */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 text-left">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Điểm tổng kết</div>
            <div className="text-2xl font-black text-amber-300 font-mono">
              {stats.score.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Kỷ lục cá nhân</div>
            <div className="text-2xl font-black text-sky-400 font-mono">
              {highScore.toLocaleString()}
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" /> Danh hiệu mở khóa:
            </span>
            <span className="font-bold text-emerald-400">CHIẾN BINH SỐ VNPT HERO</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            id="victory-replay-btn"
            onClick={onRestartAll}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/30 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            CHINH PHỤC LẠI TỪ LEVEL 1
          </button>
          <button
            id="victory-home-btn"
            onClick={onHome}
            className="w-full py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            TRỞ VỀ MENU CHÍNH
          </button>
        </div>
      </div>
    </div>
  );
};
