import React, { useRef, useEffect, useCallback } from 'react';
import { Player } from '../game/player';
import { Camera } from '../game/camera';
import { ParallaxRenderer } from '../game/renderer';
import { Obstacle } from '../game/obstacle';
import { ServiceStation } from '../game/station';
import { checkCollision } from '../game/collision';
import { audioManager } from '../game/audio';
import { LevelConfig, PlayerStats, GameState } from '../types';

interface GameCanvasProps {
  level: LevelConfig;
  gameState: GameState;
  stats: PlayerStats;
  onUpdateStats: (updater: (prev: PlayerStats) => PlayerStats) => void;
  onEncounterStation: (station: ServiceStation) => void;
  onReachFinishLine: () => void;
  onGameOver: () => void;
  onRegisterJumpHandler?: (handler: () => void) => void;
  onRegisterSlideHandler?: (start: () => void, end: () => void) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  level,
  gameState,
  stats,
  onUpdateStats,
  onEncounterStation,
  onReachFinishLine,
  onGameOver,
  onRegisterJumpHandler,
  onRegisterSlideHandler,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game internal resolution (16:9 virtual canvas)
  const V_WIDTH = 960;
  const V_HEIGHT = 540;
  const GROUND_Y = 430;

  // Entities refs
  const playerRef = useRef<Player>(new Player(120, GROUND_Y));
  const cameraRef = useRef<Camera>(new Camera(V_WIDTH, V_HEIGHT));
  const rendererRef = useRef<ParallaxRenderer>(new ParallaxRenderer());
  const obstaclesRef = useRef<Obstacle[]>([]);
  const stationsRef = useRef<ServiceStation[]>([]);

  // State flags ref to avoid stale closures inside requestAnimationFrame
  const activeStationIdRef = useRef<string | null>(null);
  const gameStateRef = useRef<GameState>(gameState);
  gameStateRef.current = gameState;

  // Initialize or reset level
  const initLevel = useCallback(() => {
    playerRef.current.reset(120, GROUND_Y);
    cameraRef.current.x = 0;
    cameraRef.current.worldLength = level.worldLength;
    activeStationIdRef.current = null;

    // Build obstacles
    obstaclesRef.current = level.obstacles.map((obs, idx) => {
      return new Obstacle(
        {
          id: `obs_${level.id}_${idx}`,
          x: obs.x,
          y: GROUND_Y,
          width: 40,
          height: 40,
          type: obs.type,
          name: obs.type,
        },
        GROUND_Y
      );
    });

    // Build stations
    stationsRef.current = level.stations.map((st) => {
      return new ServiceStation(st, GROUND_Y);
    });
  }, [level]);

  useEffect(() => {
    initLevel();
  }, [initLevel]);

  // Jump trigger
  const handleJump = useCallback(() => {
    if (gameStateRef.current === 'PLAYING') {
      const jumped = playerRef.current.jump();
      if (jumped) {
        audioManager.playJump();
      }
    }
  }, []);

  // Slide trigger
  const handleSlideStart = useCallback(() => {
    if (gameStateRef.current === 'PLAYING') {
      playerRef.current.setSlide(true);
    }
  }, []);

  const handleSlideEnd = useCallback(() => {
    playerRef.current.setSlide(false);
  }, []);

  // Expose jump/slide handlers to parent for mobile controls
  useEffect(() => {
    if (onRegisterJumpHandler) {
      onRegisterJumpHandler(handleJump);
    }
    if (onRegisterSlideHandler) {
      onRegisterSlideHandler(handleSlideStart, handleSlideEnd);
    }
  }, [onRegisterJumpHandler, onRegisterSlideHandler, handleJump, handleSlideStart, handleSlideEnd]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        handleJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        handleSlideStart();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        handleSlideEnd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleJump, handleSlideStart, handleSlideEnd]);

  // Core 60 FPS Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1); // clamp delta time
      lastTime = time;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const isPlaying = gameStateRef.current === 'PLAYING';
          const player = playerRef.current;
          const camera = cameraRef.current;
          const renderer = rendererRef.current;

          // 1. UPDATE LOGIC (only when state is PLAYING)
          if (isPlaying) {
            // Update parallax animations
            renderer.update(dt);

            // Update player
            player.update(dt, level.playerSpeed, true);

            // Update camera smoothly
            camera.update(player.x, true);

            // Update progress in HUD
            const progressPct = Math.min(100, Math.round((player.x / level.worldLength) * 100));
            onUpdateStats((prev) => ({
              ...prev,
              progress: progressPct,
            }));

            // Check obstacle collisions
            for (const obstacle of obstaclesRef.current) {
              // Pass check for score
              if (!obstacle.passed && player.x > obstacle.x + obstacle.width) {
                obstacle.passed = true;
                onUpdateStats((prev) => ({
                  ...prev,
                  score: prev.score + 10 * prev.combo,
                }));
              }

              // Collision check
              const isColliding = checkCollision(
                { x: player.x, y: player.y, width: player.width, height: player.height },
                { x: obstacle.x, y: obstacle.y, width: obstacle.width, height: obstacle.height }
              );

              if (isColliding && !player.isInvulnerable) {
                player.triggerHurt();
                audioManager.playHurt();

                onUpdateStats((prev) => {
                  const newHp = Math.max(0, prev.hp - 1);
                  if (newHp <= 0) {
                    setTimeout(() => onGameOver(), 300);
                  }
                  return {
                    ...prev,
                    hp: newHp,
                    combo: 1, // reset combo
                    noDamageRun: false,
                  };
                });
              }
            }

            // Check Service Station encounter
            for (const station of stationsRef.current) {
              station.update(dt);

              if (!station.completed) {
                // When player reaches station stop area (within 35px)
                if (player.x >= station.x - 35 && player.x <= station.x + 20) {
                  // Lock station encounter
                  if (activeStationIdRef.current !== station.id) {
                    activeStationIdRef.current = station.id;
                    player.x = station.x - 30; // position player at kiosk
                    player.vx = 0;
                    player.state = 'idle';
                    onEncounterStation(station);
                    break;
                  }
                }
              }
            }

            // Check Finish line
            if (player.x >= level.worldLength - 30) {
              onReachFinishLine();
            }
          }

          // 2. RENDER SCENE
          ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

          // Render background layers and road
          renderer.render(
            ctx,
            camera.x,
            V_WIDTH,
            V_HEIGHT,
            GROUND_Y,
            level.worldLength,
            level.theme
          );

          // Render service stations
          for (const station of stationsRef.current) {
            const isNear = Math.abs(player.x - station.x) < 140;
            station.render(ctx, camera.x, isNear);
          }

          // Render obstacles
          for (const obstacle of obstaclesRef.current) {
            obstacle.render(ctx, camera.x);
          }

          // Render player
          player.render(ctx, camera.x);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [level, onUpdateStats, onEncounterStation, onReachFinishLine, onGameOver]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
      <canvas
        ref={canvasRef}
        id="vnpt-game-canvas"
        width={V_WIDTH}
        height={V_HEIGHT}
        className="w-full h-full max-w-[1280px] max-h-[720px] object-contain shadow-2xl"
      />
    </div>
  );
};
