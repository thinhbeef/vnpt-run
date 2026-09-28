import { Achievement, UserProgress } from '../types';

const STORAGE_KEY = 'vnpt_service_run_save_v1';

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_run',
    title: 'FIRST RUN',
    description: 'Hoàn thành level đầu tiên của hành trình VNPT.',
    icon: 'flag',
    unlocked: false,
  },
  {
    id: 'service_expert',
    title: 'SERVICE EXPERT',
    description: 'Vượt qua 5 trạm dịch vụ số VNPT.',
    icon: 'award',
    unlocked: false,
  },
  {
    id: 'digital_hero',
    title: 'DIGITAL HERO',
    description: 'Chinh phục toàn bộ các Level trong game.',
    icon: 'trophy',
    unlocked: false,
  },
  {
    id: 'perfect_run',
    title: 'PERFECT RUN',
    description: 'Hoàn thành một level mà không hề mất một giọt máu (HP) nào.',
    icon: 'shield',
    unlocked: false,
  },
  {
    id: 'knowledge_master',
    title: 'KNOWLEDGE MASTER',
    description: 'Trả lời chính xác tổng cộng 15 câu hỏi dịch vụ số.',
    icon: 'book-open',
    unlocked: false,
  },
];

const DEFAULT_PROGRESS: UserProgress = {
  highScore: 0,
  unlockedLevel: 1,
  achievements: [],
  soundEnabled: true,
  musicEnabled: true,
  totalRuns: 0,
  totalQuestionsAnswered: 0,
};

export function loadGame(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    };
  } catch (e) {
    console.warn('Storage not accessible, fallback to memory', e);
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveGame(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

export function saveScore(score: number): number {
  const current = loadGame();
  if (score > current.highScore) {
    current.highScore = score;
    saveGame(current);
  }
  return current.highScore;
}

export function unlockLevel(levelId: number): void {
  const current = loadGame();
  if (levelId > current.unlockedLevel) {
    current.unlockedLevel = levelId;
    saveGame(current);
  }
}

export function unlockAchievement(achievementId: string): boolean {
  const current = loadGame();
  if (!current.achievements.includes(achievementId)) {
    current.achievements.push(achievementId);
    saveGame(current);
    return true; // freshly unlocked
  }
  return false;
}

export function resetProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn(e);
  }
  return { ...DEFAULT_PROGRESS };
}
