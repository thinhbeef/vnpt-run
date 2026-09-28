import React from 'react';
import { Play, BookOpen, Globe, Award, Settings, Trophy, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';
import { GAME_LEVELS } from '../data/levels';

interface MainMenuProps {
  progress: UserProgress;
  onStartGame: (levelId: number) => void;
  onOpenHowToPlay: () => void;
  onOpenServices: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  progress,
  onStartGame,
  onOpenHowToPlay,
  onOpenServices,
  onOpenAchievements,
  onOpenSettings,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white overflow-hidden select-none">
      {/* Background Decorative Tech Grid & Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-sky-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
        {/* VNPT Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/60 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-sky-950/40">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-blue-400 drop-shadow-md">
          VNPT SERVICE RUN
        </h1>

        <p className="text-xs md:text-sm text-slate-300 mb-6 font-medium">
          Hành trình 2D Runner & Thử thách nghiệp vụ số tiên phong
        </p>

        {/* High Score & Level Progress Banner */}
        <div className="w-full bg-slate-900/80 backdrop-blur border border-slate-700/80 rounded-xl p-3.5 mb-6 flex items-center justify-around shadow-lg">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Điểm cao nhất</div>
            <div className="text-lg font-black text-amber-300 font-mono flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              {progress.highScore.toLocaleString()}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Level đã mở</div>
            <div className="text-lg font-black text-sky-400 font-mono">
              {progress.unlockedLevel} / {GAME_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Level Fast Launch Selector */}
        <div className="w-full mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-left px-1">
            Chọn chặng hành trình:
          </div>
          <div className="grid grid-cols-3 gap-2">
            {GAME_LEVELS.map((lvl) => {
              const isUnlocked = lvl.id <= progress.unlockedLevel;
              return (
                <button
                  key={lvl.id}
                  id={`select-level-btn-${lvl.id}`}
                  disabled={!isUnlocked}
                  onClick={() => onStartGame(lvl.id)}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center ${
                    isUnlocked
                      ? 'bg-slate-800/90 border-sky-500/50 hover:border-sky-400 hover:bg-sky-950/60 active:scale-95 shadow'
                      : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className="text-xs font-black text-sky-400">LEVEL {lvl.id}</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">{lvl.difficulty}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* PLAY BUTTON */}
          <button
            id="menu-play-button"
            onClick={() => onStartGame(Math.min(progress.unlockedLevel, GAME_LEVELS.length))}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-500 hover:to-blue-500 text-white font-black text-lg shadow-xl shadow-sky-600/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-white" />
            CHƠI NGAY
          </button>

          {/* SECONDARY BUTTONS */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id="menu-howtoplay-button"
              onClick={onOpenHowToPlay}
              className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              HƯỚNG DẪN
            </button>
            <button
              id="menu-services-button"
              onClick={onOpenServices}
              className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              DỊCH VỤ SỐ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="menu-achievements-button"
              onClick={onOpenAchievements}
              className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              THÀNH TÍCH
            </button>
            <button
              id="menu-settings-button"
              onClick={onOpenSettings}
              className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              CÀI ĐẶT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
