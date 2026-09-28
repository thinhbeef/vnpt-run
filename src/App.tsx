import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';
import { ServiceStationModal } from './components/ServiceStationModal';
import { BossChallengeModal } from './components/BossChallengeModal';
import { GameOverModal } from './components/GameOverModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { VictoryModal } from './components/VictoryModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ServicesModal } from './components/ServicesModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SettingsModal } from './components/SettingsModal';
import { MobileControls } from './components/MobileControls';
import { ControlHint } from './components/ControlHint';

import {
  GameState,
  PlayerStats,
  LevelConfig,
  Question,
  ServiceData,
  UserProgress,
} from './types';
import { GAME_LEVELS, getLevelById } from './data/levels';
import { getServiceById } from './data/services';
import { getRandomQuestionForService } from './data/questions';
import {
  loadGame,
  saveScore,
  unlockLevel,
  unlockAchievement,
  resetProgress,
  saveGame,
} from './game/storage';
import { audioManager } from './game/audio';
import { ServiceStation } from './game/station';

const INITIAL_STATS: PlayerStats = {
  hp: 3,
  maxHp: 3,
  score: 0,
  combo: 1,
  progress: 0,
  questionsAnswered: 0,
  stationsCompleted: 0,
  noDamageRun: true,
};

export default function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const currentLevel: LevelConfig = getLevelById(currentLevelId);

  // Player stats
  const [stats, setStats] = useState<PlayerStats>({ ...INITIAL_STATS });

  // Persistent storage state
  const [progress, setProgress] = useState<UserProgress>(() => loadGame());

  // Active interactive modals
  const [activeStation, setActiveStation] = useState<ServiceStation | null>(null);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showBossChallenge, setShowBossChallenge] = useState<boolean>(false);

  // Secondary dialogs
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showServices, setShowServices] = useState<boolean>(false);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Question tracking to prevent repetition
  const answeredQuestionIds = useRef<string[]>([]);

  // Mobile control handles
  const mobileJumpRef = useRef<() => void>(() => {});
  const mobileSlideStartRef = useRef<() => void>(() => {});
  const mobileSlideEndRef = useRef<() => void>(() => {});

  // Sync audio with stored settings
  useEffect(() => {
    audioManager.setSoundEnabled(progress.soundEnabled);
    audioManager.setMusicEnabled(progress.musicEnabled);
  }, [progress.soundEnabled, progress.musicEnabled]);

  // Audio music trigger on game state change
  useEffect(() => {
    if (gameState === 'PLAYING') {
      audioManager.startMusic();
    } else if (gameState === 'PAUSED' || gameState === 'MENU' || gameState === 'GAME_OVER') {
      audioManager.stopMusic();
    }
  }, [gameState]);

  // Keyboard shortcut for ESC to Pause / Resume
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (gameState === 'PLAYING') {
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Start or replay game
  const handleStartGame = useCallback((levelId: number) => {
    setCurrentLevelId(levelId);
    setStats({
      ...INITIAL_STATS,
      score: levelId === 1 ? 0 : stats.score, // keep score if advancing, reset if starting from 1
    });
    answeredQuestionIds.current = [];
    setActiveStation(null);
    setActiveService(null);
    setActiveQuestion(null);
    setShowBossChallenge(false);
    setGameState('PLAYING');
  }, [stats.score]);

  // Handle station encounter
  const handleEncounterStation = useCallback((station: ServiceStation) => {
    const sData = getServiceById(station.serviceId);
    if (!sData) return;

    const q = getRandomQuestionForService(station.serviceId, answeredQuestionIds.current);
    answeredQuestionIds.current.push(q.id);

    setActiveStation(station);
    setActiveService(sData);
    setActiveQuestion(q);
    setGameState('SERVICE_INTERACTION');
    audioManager.playStation();
  }, []);

  // Station Quiz Correct
  const handleAnswerCorrect = useCallback((timeBonus: boolean) => {
    setStats((prev) => {
      const basePoints = 100;
      const speedPoints = timeBonus ? 50 : 0;
      const comboMultiplier = prev.combo;
      const addedScore = (basePoints + speedPoints) * comboMultiplier;

      const newScore = prev.score + addedScore;
      const newStations = prev.stationsCompleted + 1;
      const newQuestions = prev.questionsAnswered + 1;
      const newCombo = Math.min(5, prev.combo + 1);

      // Check achievements
      if (newStations >= 5) {
        const fresh = unlockAchievement('service_expert');
        if (fresh) audioManager.playAchievement();
      }
      if (newQuestions >= 15) {
        const fresh = unlockAchievement('knowledge_master');
        if (fresh) audioManager.playAchievement();
      }

      saveScore(newScore);
      setProgress(loadGame());

      return {
        ...prev,
        score: newScore,
        combo: newCombo,
        stationsCompleted: newStations,
        questionsAnswered: newQuestions,
      };
    });

    if (activeStation) {
      activeStation.completed = true;
    }
  }, [activeStation]);

  // Station Quiz Wrong
  const handleAnswerWrong = useCallback(() => {
    setStats((prev) => {
      const newHp = Math.max(0, prev.hp - 1);
      if (newHp <= 0) {
        setGameState('GAME_OVER');
      }
      return {
        ...prev,
        hp: newHp,
        combo: 1, // reset combo
        noDamageRun: false,
      };
    });
  }, []);

  // Resume after quiz
  const handleCloseStationModal = useCallback(() => {
    setActiveStation(null);
    setActiveService(null);
    setActiveQuestion(null);
    setGameState('PLAYING');
  }, []);

  // Reach Finish Line
  const handleReachFinishLine = useCallback(() => {
    if (currentLevel.hasFinalChallenge) {
      // Level 3 Boss Challenge!
      setShowBossChallenge(true);
      setGameState('QUESTION');
    } else {
      // Level 1 or 2 Complete
      audioManager.playLevelComplete();
      setStats((prev) => {
        const completionBonus = 500;
        const noDmgBonus = prev.noDamageRun ? 200 : 0;
        const totalScore = prev.score + completionBonus + noDmgBonus;

        saveScore(totalScore);
        unlockLevel(currentLevelId + 1);

        // Check First Run Achievement
        if (currentLevelId === 1) {
          const fresh = unlockAchievement('first_run');
          if (fresh) audioManager.playAchievement();
        }
        if (prev.noDamageRun) {
          const fresh = unlockAchievement('perfect_run');
          if (fresh) audioManager.playAchievement();
        }

        setProgress(loadGame());

        return {
          ...prev,
          score: totalScore,
        };
      });
      setGameState('LEVEL_COMPLETE');
    }
  }, [currentLevel.hasFinalChallenge, currentLevelId]);

  // Boss challenge completed successfully
  const handleBossVictory = useCallback(() => {
    setShowBossChallenge(false);
    audioManager.playLevelComplete();

    setStats((prev) => {
      const victoryBonus = 1000;
      const totalScore = prev.score + victoryBonus;
      saveScore(totalScore);
      unlockAchievement('digital_hero');
      setProgress(loadGame());
      return {
        ...prev,
        score: totalScore,
      };
    });

    setGameState('VICTORY');
  }, []);

  // Boss challenge penalty
  const handleBossPenalty = useCallback(() => {
    setStats((prev) => {
      const newHp = Math.max(0, prev.hp - 1);
      if (newHp <= 0) {
        setShowBossChallenge(false);
        setGameState('GAME_OVER');
      }
      return { ...prev, hp: newHp };
    });
  }, []);

  // Next Level
  const handleNextLevel = useCallback(() => {
    if (currentLevelId < GAME_LEVELS.length) {
      handleStartGame(currentLevelId + 1);
    } else {
      setGameState('VICTORY');
    }
  }, [currentLevelId, handleStartGame]);

  // Replay Current Level
  const handleReplayCurrent = useCallback(() => {
    handleStartGame(currentLevelId);
  }, [currentLevelId, handleStartGame]);

  // Return to Menu
  const handleReturnHome = useCallback(() => {
    setGameState('MENU');
    setProgress(loadGame());
  }, []);

  // Audio toggles from HUD / Settings
  const handleToggleSound = useCallback(() => {
    setProgress((prev) => {
      const nextVal = !prev.soundEnabled;
      const updated = { ...prev, soundEnabled: nextVal };
      saveGame(updated);
      audioManager.setSoundEnabled(nextVal);
      return updated;
    });
  }, []);

  const handleToggleMusic = useCallback(() => {
    setProgress((prev) => {
      const nextVal = !prev.musicEnabled;
      const updated = { ...prev, musicEnabled: nextVal };
      saveGame(updated);
      audioManager.setMusicEnabled(nextVal);
      return updated;
    });
  }, []);

  const handleResetAllProgress = useCallback(() => {
    const fresh = resetProgress();
    setProgress(fresh);
    setStats({ ...INITIAL_STATS });
    setCurrentLevelId(1);
    setShowSettings(false);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      {/* 1. MAIN MENU */}
      {gameState === 'MENU' && (
        <MainMenu
          progress={progress}
          onStartGame={handleStartGame}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
          onOpenServices={() => setShowServices(true)}
          onOpenAchievements={() => setShowAchievements(true)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {/* 2. GAMEPLAY CANVAS & IN-GAME OVERLAYS */}
      {gameState !== 'MENU' && (
        <>
          {/* Top HUD */}
          <HUD
            stats={stats}
            level={currentLevel}
            isPaused={gameState === 'PAUSED'}
            soundEnabled={progress.soundEnabled}
            musicEnabled={progress.musicEnabled}
            onTogglePause={() => {
              setGameState((prev) => (prev === 'PAUSED' ? 'PLAYING' : 'PAUSED'));
            }}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
          />

          {/* First level control hint */}
          <ControlHint visible={currentLevelId === 1 && gameState === 'PLAYING'} />

          {/* Core Game Canvas */}
          <GameCanvas
            level={currentLevel}
            gameState={gameState}
            stats={stats}
            onUpdateStats={setStats}
            onEncounterStation={handleEncounterStation}
            onReachFinishLine={handleReachFinishLine}
            onGameOver={() => setGameState('GAME_OVER')}
            onRegisterJumpHandler={(fn) => {
              mobileJumpRef.current = fn;
            }}
            onRegisterSlideHandler={(start, end) => {
              mobileSlideStartRef.current = start;
              mobileSlideEndRef.current = end;
            }}
          />

          {/* Mobile on-screen touch controls */}
          {gameState === 'PLAYING' && (
            <MobileControls
              onJump={() => mobileJumpRef.current()}
              onSlideStart={() => mobileSlideStartRef.current()}
              onSlideEnd={() => mobileSlideEndRef.current()}
            />
          )}

          {/* Paused Overlay */}
          {gameState === 'PAUSED' && (
            <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full text-center text-white shadow-2xl">
                <h3 className="text-2xl font-black text-amber-400 mb-4">
                  ĐÃ TẠM DỪNG
                </h3>
                <div className="flex flex-col gap-2.5">
                  <button
                    id="pause-resume-btn"
                    onClick={() => setGameState('PLAYING')}
                    className="py-3 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white transition cursor-pointer"
                  >
                    TIẾP TỤC CHƠI
                  </button>
                  <button
                    id="pause-restart-btn"
                    onClick={handleReplayCurrent}
                    className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
                  >
                    CHƠI LẠI MÀN NÀY
                  </button>
                  <button
                    id="pause-home-btn"
                    onClick={handleReturnHome}
                    className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium transition cursor-pointer"
                  >
                    VỀ MENU CHÍNH
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Service Station Quiz Modal */}
          {gameState === 'SERVICE_INTERACTION' && activeService && activeQuestion && (
            <ServiceStationModal
              service={activeService}
              question={activeQuestion}
              onAnswerCorrect={handleAnswerCorrect}
              onAnswerWrong={handleAnswerWrong}
              onClose={handleCloseStationModal}
            />
          )}

          {/* Final Challenge on Level 3 */}
          {showBossChallenge && (
            <BossChallengeModal
              onVictory={handleBossVictory}
              onFailHpPenalty={handleBossPenalty}
            />
          )}

          {/* Game Over Modal */}
          {gameState === 'GAME_OVER' && (
            <GameOverModal
              stats={stats}
              level={currentLevel}
              onRestart={handleReplayCurrent}
              onHome={handleReturnHome}
            />
          )}

          {/* Level Complete Modal */}
          {gameState === 'LEVEL_COMPLETE' && (
            <LevelCompleteModal
              stats={stats}
              level={currentLevel}
              hasNextLevel={currentLevelId < GAME_LEVELS.length}
              onNextLevel={handleNextLevel}
              onReplay={handleReplayCurrent}
              onHome={handleReturnHome}
            />
          )}

          {/* Victory Modal */}
          {gameState === 'VICTORY' && (
            <VictoryModal
              stats={stats}
              highScore={progress.highScore}
              onRestartAll={() => handleStartGame(1)}
              onHome={handleReturnHome}
            />
          )}
        </>
      )}

      {/* 3. SECONDARY UTILITY MODALS */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
      {showServices && (
        <ServicesModal onClose={() => setShowServices(false)} />
      )}
      {showAchievements && (
        <AchievementsModal
          unlockedIds={progress.achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}
      {showSettings && (
        <SettingsModal
          progress={progress}
          onUpdateSound={handleToggleSound}
          onUpdateMusic={handleToggleMusic}
          onResetProgress={handleResetAllProgress}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
