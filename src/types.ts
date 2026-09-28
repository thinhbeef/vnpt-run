export type GameState =
  | 'MENU'
  | 'PLAYING'
  | 'PAUSED'
  | 'SERVICE_INTERACTION'
  | 'QUESTION'
  | 'SUCCESS'
  | 'GAME_OVER'
  | 'LEVEL_COMPLETE'
  | 'VICTORY';

export type PlayerAction = 'idle' | 'run' | 'jump' | 'fall' | 'slide' | 'hurt' | 'success';

export interface PlayerStats {
  hp: number;
  maxHp: number;
  score: number;
  combo: number;
  progress: number; // 0 to 100
  questionsAnswered: number;
  stationsCompleted: number;
  noDamageRun: boolean;
}

export interface Question {
  id: string;
  service: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed index of correct option
  explanation: string;
  difficulty?: number; // 1: easy, 2: medium, 3: hard
}

export interface ServiceData {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  colorTheme: string;
  accentColor: string;
  difficulty: number;
  iconName: string;
}

export interface ObstacleData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'box' | 'cone' | 'barrier' | 'pothole' | 'sign';
  name: string;
  passed?: boolean;
}

export interface StationData {
  id: string;
  serviceId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  completed: boolean;
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  worldLength: number; // in pixels
  playerSpeed: number;
  theme: 'office' | 'city' | 'digital_gov';
  stationIds: string[];
  stations: { serviceId: string; x: number }[];
  obstacles: { type: 'box' | 'cone' | 'barrier' | 'pothole' | 'sign'; x: number }[];
  hasFinalChallenge?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  highScore: number;
  unlockedLevel: number;
  achievements: string[];
  soundEnabled: boolean;
  musicEnabled: boolean;
  totalRuns: number;
  totalQuestionsAnswered: number;
}
