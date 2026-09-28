import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MobileControlsProps {
  onJump: () => void;
  onSlideStart: () => void;
  onSlideEnd: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onJump,
  onSlideStart,
  onSlideEnd,
}) => {
  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 px-6 flex justify-between items-center pointer-events-none z-30 select-none">
      {/* Slide button on Left */}
      <button
        id="mobile-slide-btn"
        onTouchStart={onSlideStart}
        onTouchEnd={onSlideEnd}
        onMouseDown={onSlideStart}
        onMouseUp={onSlideEnd}
        className="pointer-events-auto w-16 h-16 rounded-full bg-slate-900/80 backdrop-blur border-2 border-slate-600 active:bg-slate-700 active:scale-95 flex flex-col items-center justify-center text-white shadow-xl shadow-slate-950/60 transition"
      >
        <ArrowDown className="w-6 h-6 text-sky-400" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Trượt</span>
      </button>

      {/* Jump button on Right */}
      <button
        id="mobile-jump-btn"
        onTouchStart={(e) => {
          e.preventDefault();
          onJump();
        }}
        onClick={onJump}
        className="pointer-events-auto w-20 h-20 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 border-2 border-sky-300 active:scale-95 flex flex-col items-center justify-center text-white shadow-xl shadow-sky-600/40 transition"
      >
        <ArrowUp className="w-8 h-8 text-white stroke-[2.5]" />
        <span className="text-[10px] font-black uppercase tracking-wider text-white">NHẢY</span>
      </button>
    </div>
  );
};
