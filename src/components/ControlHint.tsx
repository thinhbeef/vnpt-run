import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface ControlHintProps {
  visible: boolean;
}

export const ControlHint: React.FC<ControlHintProps> = ({ visible }) => {
  const [show, setShow] = useState<boolean>(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
      <div className="bg-slate-900/90 backdrop-blur border border-sky-500/80 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-xl shadow-sky-950/60 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>
          Nhấn <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 font-mono">SPACE</kbd> hoặc{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300 font-mono">MŨI TÊN LÊN</kbd> để nhảy né vật cản!
        </span>
      </div>
    </div>
  );
};
