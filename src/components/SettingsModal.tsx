import React from 'react';
import { X, Settings, Volume2, VolumeX, Music, Trash2 } from 'lucide-react';
import { UserProgress } from '../types';

interface SettingsModalProps {
  progress: UserProgress;
  onUpdateSound: (enabled: boolean) => void;
  onUpdateMusic: (enabled: boolean) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  progress,
  onUpdateSound,
  onUpdateMusic,
  onResetProgress,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-black text-white">
              CÀI ĐẶT TRÒ CHƠI
            </h2>
          </div>
          <button
            id="close-settings-btn"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/70 border border-slate-700/80 rounded-xl">
            <div className="flex items-center gap-3">
              {progress.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-sky-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <div className="text-sm font-bold text-white">Hiệu ứng âm thanh</div>
                <div className="text-xs text-slate-400">Âm thanh nhảy, va chạm, đúng/sai</div>
              </div>
            </div>
            <button
              id="settings-toggle-sound"
              onClick={() => onUpdateSound(!progress.soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                progress.soundEnabled ? 'bg-sky-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
                  progress.soundEnabled ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/70 border border-slate-700/80 rounded-xl">
            <div className="flex items-center gap-3">
              <Music className={`w-5 h-5 ${progress.musicEnabled ? 'text-sky-400' : 'text-slate-500'}`} />
              <div>
                <div className="text-sm font-bold text-white">Nhạc nền Arcade</div>
                <div className="text-xs text-slate-400">Giai điệu chiptune retro nhẹ nhàng</div>
              </div>
            </div>
            <button
              id="settings-toggle-music"
              onClick={() => onUpdateMusic(!progress.musicEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                progress.musicEnabled ? 'bg-sky-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
                  progress.musicEnabled ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Reset progress */}
          <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Xóa dữ liệu & Chơi lại từ đầu
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
              Đặt lại điểm cao kỷ lục, mở khóa level và thành tích lưu trong localStorage.
            </p>
            <button
              id="settings-reset-btn"
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ điểm và tiến trình chơi?')) {
                  onResetProgress();
                }
              }}
              className="w-full py-2 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold border border-rose-700/50 transition cursor-pointer"
            >
              XÁC NHẬN ĐẶT LẠI DỮ LIỆU
            </button>
          </div>
        </div>

        <button
          id="close-settings-modal-btn"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200 transition cursor-pointer"
        >
          ĐÓNG
        </button>
      </div>
    </div>
  );
};
