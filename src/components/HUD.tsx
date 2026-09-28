import React from 'react';
import { Volume2, VolumeX, Music, Pause, Play, Heart, Award } from 'lucide-react';
import { PlayerStats, LevelConfig } from '../types';

interface HUDProps {
  stats: PlayerStats;
  level: LevelConfig;
  isPaused: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onTogglePause: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  level,
  isPaused,
  soundEnabled,
  musicEnabled,
  onTogglePause,
  onToggleSound,
  onToggleMusic,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-3 md:p-4 pointer-events-none flex flex-col gap-2 z-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto w-full">
        {/* Left: VNPT Badge & Level Title */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-sky-600 border border-sky-400 text-white font-black px-2.5 py-1 rounded-md text-xs tracking-wider shadow-md shadow-sky-950/40">
            VNPT
          </div>
          <div className="bg-slate-900/85 backdrop-blur border border-slate-700/80 px-3 py-1 rounded-md text-white text-xs md:text-sm font-semibold flex items-center gap-2 shadow">
            <span className="text-sky-400 font-bold">{level.title}</span>
            <span className="hidden sm:inline text-slate-400 text-xs font-normal">| {level.difficulty}</span>
          </div>
        </div>

        {/* Center: HP & Combo */}
        <div className="flex items-center gap-3">
          {/* HP Hearts */}
          <div className="bg-slate-900/85 backdrop-blur border border-slate-700/80 px-3 py-1 rounded-md flex items-center gap-1.5 shadow">
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${
                  stats.hp >= heartIndex
                    ? 'text-red-500 fill-red-500 scale-100'
                    : 'text-slate-600 fill-slate-800 scale-90 opacity-40'
                }`}
              />
            ))}
          </div>

          {/* Combo Multiplier */}
          {stats.combo > 1 && (
            <div className="bg-amber-500/90 border border-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs animate-bounce flex items-center gap-1 shadow-md shadow-amber-500/20">
              <Award className="w-3.5 h-3.5" />
              COMBO x{stats.combo}
            </div>
          )}
        </div>

        {/* Right: Score & Audio/Pause Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Score Counter */}
          <div className="bg-slate-900/85 backdrop-blur border border-sky-500/40 px-3.5 py-1 rounded-md text-right shadow">
            <div className="text-[10px] uppercase font-bold text-sky-400 leading-tight tracking-wider">Điểm số</div>
            <div className="text-sm md:text-base font-black text-amber-300 font-mono leading-tight">
              {stats.score.toLocaleString()}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center bg-slate-900/85 backdrop-blur border border-slate-700/80 rounded-md p-0.5 shadow">
            <button
              id="hud-toggle-sound"
              onClick={onToggleSound}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
            <button
              id="hud-toggle-music"
              onClick={onToggleMusic}
              title={musicEnabled ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-sky-400' : 'text-slate-500'}`} />
            </button>
            <button
              id="hud-toggle-pause"
              onClick={onTogglePause}
              title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
            >
              {isPaused ? <Play className="w-4 h-4 text-amber-400" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar along Top/Mid */}
      <div className="max-w-5xl mx-auto w-full bg-slate-950/70 backdrop-blur rounded-full h-2.5 p-0.5 border border-slate-800 shadow">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-150 relative"
          style={{ width: `${Math.min(100, Math.max(0, stats.progress))}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-sky-600 shadow" />
        </div>
      </div>
    </div>
  );
};
