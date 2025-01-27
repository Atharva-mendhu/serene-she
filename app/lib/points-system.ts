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
  coins: number
  streak: number
  lastActive: string
  activities: {
    [key: string]: {
      lastCompleted: string
      count: number
    }
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
  addActivityPoints(currentPoints: UserPoints, activity: keyof typeof POINTS): { updatedPoints: UserPoints; coinsEarned: number } {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const points = { ...currentPoints };
    
    // Initialize if first time
    if (!points.activities) {
      points.activities = {};
    }
    if (!points.activities[activity]) {
      points.activities[activity] = {
        lastCompleted: '',
        count: 0
      };
    }

    let coinsEarned = POINTS[activity];

    // Update activity tracking
    const activityData = points.activities[activity];
    if (activityData.lastCompleted !== today) {
      activityData.lastCompleted = today;
      activityData.count = 1;
    } else {
      activityData.count++;
      // Diminishing returns for repeated activities
      coinsEarned = Math.max(1, Math.floor(coinsEarned / activityData.count));
    }

    // Update streak
    const lastActiveDate = points.lastActive ? new Date(points.lastActive) : null;
    if (!lastActiveDate || now.getDate() !== lastActiveDate.getDate()) {
      if (lastActiveDate) {
        const daysDiff = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          points.streak++;
          // Bonus coins for streak milestones
          if (points.streak % 7 === 0) {
            coinsEarned += 10;
          }
        } else if (daysDiff > 1) {
          points.streak = 1;
        }
      } else {
        points.streak = 1;
      }
      points.lastActive = now.toISOString();
    }

    // Update total coins
    points.coins = (points.coins || 0) + coinsEarned;

    return {
      updatedPoints: points,
      coinsEarned
    };
  },

  getStreakInfo(points: UserPoints) {
    const now = new Date();
    const lastActive = points.lastActive ? new Date(points.lastActive) : null;
    
    if (!lastActive) {
      return {
        isActive: false,
        daysUntilReset: 0,
        daysUntilReward: 7
      };
    }

    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    const isActive = daysDiff <= 1;
    const daysUntilReset = isActive ? 1 - daysDiff : 0;
    const daysUntilReward = 7 - (points.streak % 7);

    return {
      isActive,
      daysUntilReset,
      daysUntilReward
    };
  }
} as const

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
    },
    coins: 0,
    streak: 0,
    lastActive: "",
    activities: {}
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

