export interface UserPoints {
  totalPoints: number
  level: number
  currentLevelPoints: number
  pointsToNextLevel: number
  dailyStreak: number
  lastLoginDate: string
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  earned: boolean
  earnedDate?: string
}

export const LEVEL_THRESHOLDS = [
  0,    // Level 1: 0-99
  100,  // Level 2: 100-299
  300,  // Level 3: 300-599
  600,  // Level 4: 600-999
  1000, // Level 5: 1000-1999
  2000, // Level 6: 2000-3999
  4000, // Level 7: 4000-5999
  6000, // Level 8: 6000-7999
  8000, // Level 9: 8000-9999
  10000 // Level 10: 10000+
]

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
  CHAT_WITH_SERENA: 5,
  COMPLETE_JOURNAL: 15,
  MINDFULNESS_SESSION: 20,
  STREAK_BONUS: 5
}

export const ACHIEVEMENTS = [
  {
    id: "first-login",
    name: "First Steps",
    description: "Begin your wellness journey"
  },
  {
    id: "level-5",
    name: "Rising Star",
    description: "Reach Level 5"
  },
  {
    id: "chat-with-serena",
    name: "Serena's Friend",
    description: "Have your first conversation with Serena"
  }
]

export function calculateLevel(points: number): number {
  return LEVEL_THRESHOLDS.findIndex((threshold, index, arr) => {
    const nextThreshold = arr[index + 1]
    return points >= threshold && (!nextThreshold || points < nextThreshold)
  }) + 1
}

export function getLevelProgress(points: number): { current: number, next: number, progress: number } {
  const level = calculateLevel(points)
  const currentThreshold = LEVEL_THRESHOLDS[level - 1]
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold * 2
  const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100

  return {
    current: points - currentThreshold,
    next: nextThreshold - currentThreshold,
    progress: Math.min(progress, 100)
  }
}

export function initializePoints(): UserPoints {
  return {
    totalPoints: 0,
    level: 1,
    currentLevelPoints: 0,
    pointsToNextLevel: LEVEL_THRESHOLDS[1],
    dailyStreak: 0,
    lastLoginDate: new Date().toISOString(),
    achievements: ACHIEVEMENTS.map(a => ({ ...a, earned: false }))
  }
}

export function handleDailyLogin(points: UserPoints): UserPoints {
  const today = new Date()
  const lastLogin = new Date(points.lastLoginDate)
  const isConsecutiveDay = 
    today.getDate() - lastLogin.getDate() === 1 ||
    (today.getDate() === 1 && lastLogin.getMonth() !== today.getMonth())

  const newPoints = {
    ...points,
    totalPoints: points.totalPoints + POINTS.DAILY_LOGIN + (isConsecutiveDay ? POINTS.STREAK_BONUS : 0),
    dailyStreak: isConsecutiveDay ? points.dailyStreak + 1 : 1,
    lastLoginDate: today.toISOString()
  }

  const level = calculateLevel(newPoints.totalPoints)
  const progress = getLevelProgress(newPoints.totalPoints)

  return {
    ...newPoints,
    level,
    currentLevelPoints: progress.current,
    pointsToNextLevel: progress.next
  }
}

export function addPoints(points: UserPoints, amount: number): UserPoints {
  const newTotal = points.totalPoints + amount
  const level = calculateLevel(newTotal)
  const progress = getLevelProgress(newTotal)

  // Check for level-based achievements
  const achievements = points.achievements.map(achievement => {
    if (achievement.id === "level-5" && !achievement.earned && level >= 5) {
      return { ...achievement, earned: true, earnedDate: new Date().toISOString() }
    }
    return achievement
  })

  return {
    ...points,
    totalPoints: newTotal,
    level,
    currentLevelPoints: progress.current,
    pointsToNextLevel: progress.next,
    achievements
  }
} 