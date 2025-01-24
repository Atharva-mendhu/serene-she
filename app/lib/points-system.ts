export interface UserPoints {
  totalPoints: number
  sereneCoins: number
  dailyStreak: number
  lastLoginDate: string
  level: number
  currentLevelPoints: number
  pointsToNextLevel: number
  achievements: Achievement[]
  dailyRewards: {
    lastClaimDate: string
    claimedRewards: string[]
    streakBonus: number
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  earned: boolean
  earnedDate?: string
}

export const LEVEL_TITLES = [
  "Serenity Seeker",
  "Mindful Explorer",
  "Wellness Wanderer",
  "Peace Pioneer",
  "Harmony Hero",
  "Tranquility Guide",
  "Balance Bearer",
  "Wisdom Walker",
  "Zen Master",
  "Enlightened Soul"
]

export const POINTS = {
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5,
  JOURNAL_ENTRY: 10,
  BREATHING_EXERCISE: 5,
  DESK_YOGA: 5,
  QUIZ_COMPLETION: 20,
  MOOD_TRACKING: 5,
} as const

export interface PointsData {
  totalPoints: number;
  lastDailyReward: string | null;
  streak: number;
}

export const INITIAL_POINTS: PointsData = {
  totalPoints: 0,
  lastDailyReward: null,
  streak: 0
};

export const POINTS_REWARDS = {
  DAILY_LOGIN: 10,
  CHAT_INTERACTION: 5,
  COMPLETE_CHALLENGE: 20,
  STREAK_BONUS: 15
};

export function calculateLevel(points: number): number {
  return Math.floor(Math.sqrt(points / 100)) + 1
}

export function getLevelProgress(points: number): { current: number, next: number, progress: number } {
  const level = calculateLevel(points)
  const currentLevelMinPoints = Math.pow(level - 1, 2) * 100
  const nextLevelMinPoints = Math.pow(level, 2) * 100
  const progress = ((points - currentLevelMinPoints) / (nextLevelMinPoints - currentLevelMinPoints)) * 100

  return {
    current: points - currentLevelMinPoints,
    next: nextLevelMinPoints - currentLevelMinPoints,
    progress
  }
}

export function initializePoints(): UserPoints {
  return {
    totalPoints: 0,
    sereneCoins: 0,
    dailyStreak: 0,
    lastLoginDate: new Date().toISOString(),
    level: 1,
    currentLevelPoints: 0,
    pointsToNextLevel: 100,
    achievements: [],
    dailyRewards: {
      lastClaimDate: "",
      claimedRewards: [],
      streakBonus: 0
    }
  }
}

export function handleDailyLogin(points: UserPoints): { 
  updatedPoints: UserPoints,
  coinsEarned: number,
  newStreak: number
} {
  const today = new Date().toISOString().split('T')[0]
  const lastLogin = new Date(points.lastLoginDate).toISOString().split('T')[0]

  if (today === lastLogin) {
    return { updatedPoints: points, coinsEarned: 0, newStreak: points.dailyStreak }
  }

  const isConsecutiveDay = new Date(lastLogin) >= new Date(Date.now() - 86400000)
  const newStreak = isConsecutiveDay ? points.dailyStreak + 1 : 1
  const streakBonus = Math.min(newStreak * POINTS.STREAK_BONUS, 25)
  const coinsEarned = POINTS.DAILY_LOGIN + streakBonus

  const updatedPoints: UserPoints = {
    ...points,
    sereneCoins: points.sereneCoins + coinsEarned,
    totalPoints: points.totalPoints + coinsEarned,
    dailyStreak: newStreak,
    lastLoginDate: today,
    dailyRewards: {
      ...points.dailyRewards,
      lastClaimDate: today,
      streakBonus
    }
  }

  const newLevel = calculateLevel(updatedPoints.totalPoints)
  if (newLevel > points.level) {
    updatedPoints.level = newLevel
  }

  const progress = getLevelProgress(updatedPoints.totalPoints)
  updatedPoints.currentLevelPoints = progress.current
  updatedPoints.pointsToNextLevel = progress.next

  return { updatedPoints, coinsEarned, newStreak }
}

export function addActivityPoints(
  points: UserPoints, 
  activity: keyof typeof POINTS
): {
  updatedPoints: UserPoints,
  coinsEarned: number
} {
  const coinsEarned = POINTS[activity]
  const updatedPoints: UserPoints = {
    ...points,
    sereneCoins: points.sereneCoins + coinsEarned,
    totalPoints: points.totalPoints + coinsEarned
  }

  const newLevel = calculateLevel(updatedPoints.totalPoints)
  if (newLevel > points.level) {
    updatedPoints.level = newLevel
  }

  const progress = getLevelProgress(updatedPoints.totalPoints)
  updatedPoints.currentLevelPoints = progress.current
  updatedPoints.pointsToNextLevel = progress.next

  return { updatedPoints, coinsEarned }
}

export function calculateStreak(lastReward: string | null): number {
  if (!lastReward) return 0;
  
  const lastRewardDate = new Date(lastReward);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastRewardDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1 ? 1 : 0;
} 