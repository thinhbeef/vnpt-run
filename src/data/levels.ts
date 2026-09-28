import { LevelConfig } from '../types';

export const GAME_LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'LEVEL 1: VNPT OFFICE',
    subtitle: 'Khởi đầu hành trình tại Văn phòng số VNPT',
    difficulty: 'Easy',
    worldLength: 3600,
    playerSpeed: 3.8,
    theme: 'office',
    stationIds: ['wifi', 'fibervnn', 'vinaphone', 'ioffice'],
    stations: [
      { serviceId: 'wifi', x: 800 },
      { serviceId: 'fibervnn', x: 1600 },
      { serviceId: 'vinaphone', x: 2400 },
      { serviceId: 'ioffice', x: 3100 },
    ],
    obstacles: [
      { type: 'cone', x: 500 },
      { type: 'box', x: 1200 },
      { type: 'barrier', x: 2000 },
      { type: 'sign', x: 2750 },
    ],
    hasFinalChallenge: false,
  },
  {
    id: 2,
    title: 'LEVEL 2: DIGITAL CITY',
    subtitle: 'Phủ sóng đô thị thông minh và hạ tầng số',
    difficulty: 'Medium',
    worldLength: 4800,
    playerSpeed: 4.4,
    theme: 'city',
    stationIds: ['wifi', 'fibervnn', 'vinaphone', 'cloud', 'invoice'],
    stations: [
      { serviceId: 'wifi', x: 800 },
      { serviceId: 'fibervnn', x: 1600 },
      { serviceId: 'vinaphone', x: 2450 },
      { serviceId: 'cloud', x: 3300 },
      { serviceId: 'invoice', x: 4150 },
    ],
    obstacles: [
      { type: 'cone', x: 480 },
      { type: 'box', x: 1150 },
      { type: 'pothole', x: 1350 },
      { type: 'barrier', x: 2050 },
      { type: 'sign', x: 2900 },
      { type: 'box', x: 3700 },
      { type: 'cone', x: 3900 },
    ],
    hasFinalChallenge: false,
  },
  {
    id: 3,
    title: 'LEVEL 3: DIGITAL GOVERNMENT',
    subtitle: 'Kiến tạo Chính quyền số & Thử thách đỉnh cao',
    difficulty: 'Hard',
    worldLength: 5600,
    playerSpeed: 5.0,
    theme: 'digital_gov',
    stationIds: ['ioffice', 'ilis', 'smartca', 'egov', 'cloud'],
    stations: [
      { serviceId: 'ioffice', x: 900 },
      { serviceId: 'ilis', x: 1800 },
      { serviceId: 'smartca', x: 2700 },
      { serviceId: 'egov', x: 3650 },
      { serviceId: 'cloud', x: 4600 },
    ],
    obstacles: [
      { type: 'cone', x: 500 },
      { type: 'pothole', x: 700 },
      { type: 'barrier', x: 1350 },
      { type: 'box', x: 1550 },
      { type: 'sign', x: 2250 },
      { type: 'cone', x: 3150 },
      { type: 'barrier', x: 3400 },
      { type: 'pothole', x: 4100 },
      { type: 'box', x: 4350 },
      { type: 'sign', x: 5100 },
    ],
    hasFinalChallenge: true,
  },
];

export function getLevelById(id: number): LevelConfig {
  return GAME_LEVELS.find((l) => l.id === id) || GAME_LEVELS[0];
}
