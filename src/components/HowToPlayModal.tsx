import React from 'react';
import { X, ArrowUp, ArrowDown, Space, Zap, CheckCircle2, Flag } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-sky-500/60 rounded-2xl max-w-xl w-full p-6 text-white max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <h2 className="text-xl font-black text-sky-400 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            HƯỚNG DẪN CHƠI GAME
          </h2>
          <button
            id="close-howtoplay-btn"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Steps Workflow as specified in prompt section 19 */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
            <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Tự động di chuyển</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nhân viên VNPT sẽ liên tục chạy từ trái sang phải trên các cung đường văn phòng, đô thị số.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
            <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Né vật cản & Chướng ngại vật</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dùng phím <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-[11px]">Arrow Up</kbd> hoặc <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-[11px]">W</kbd> để nhảy qua thùng hàng, nón công trình; phím <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-[11px]">Arrow Down</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-amber-300 font-mono text-[11px]">S</kbd> để trượt.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
            <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Gặp Trạm Dịch Vụ (Service Station)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Khi đến gần trạm dịch vụ số VNPT, nhân vật sẽ dừng lại để kết nối hệ thống trạm.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
            <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Hoàn thành Thử thách Quiz</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chọn câu trả lời chính xác về dịch vụ số để nhận <span className="text-amber-400 font-bold">+100 Điểm</span> và tăng chuỗi COMBO.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
            <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              5
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Tiếp tục hành trình & Về đích</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sau khi kích hoạt xong các trạm, chạy qua cổng đích Finish Line để hoàn thành Level!
              </p>
            </div>
          </div>
        </div>

        {/* Controls cheat sheet */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-5">
          <div className="text-xs font-bold uppercase text-slate-400 mb-3">Phím điều khiển:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-slate-800 text-amber-400 font-mono font-bold">↑ / W / Space</span>
              <span>Nhảy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-slate-800 text-amber-400 font-mono font-bold">↓ / S</span>
              <span>Trượt</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-slate-800 text-amber-400 font-mono font-bold">ESC</span>
              <span>Tạm dừng</span>
            </div>
          </div>
        </div>

        <button
          id="close-howtoplay-confirm-btn"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white transition cursor-pointer"
        >
          ĐÃ HIỂU, BẮT ĐẦU CHƠI!
        </button>
      </div>
    </div>
  );
};
