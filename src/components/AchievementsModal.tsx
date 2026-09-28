import React from 'react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { DEFAULT_ACHIEVEMENTS } from '../game/storage';

interface AchievementsModalProps {
  unlockedIds: string[];
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  unlockedIds,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-xl w-full p-6 text-white max-h-[90vh] flex flex-col relative shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-black text-white">
              BẢNG THÀNH TÍCH (ACHIEVEMENTS)
            </h2>
          </div>
          <button
            id="close-achievements-btn"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-slate-400 mb-4">
          Đã mở khóa: <span className="text-amber-400 font-bold">{unlockedIds.length}</span> / {DEFAULT_ACHIEVEMENTS.length} thành tích
        </div>

        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          {DEFAULT_ACHIEVEMENTS.map((item) => {
            const isUnlocked = unlockedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3.5 transition ${
                  isUnlocked
                    ? 'bg-slate-800/90 border-amber-500/50 shadow'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                        ĐÃ ĐẠT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4 shrink-0">
          <button
            id="close-achievements-modal-btn"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200 transition cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
