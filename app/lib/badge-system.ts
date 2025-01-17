export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  earned: boolean
  earnedDate?: string
  animation: string
}

export type BadgeCategory = 
  | "WELLNESS"
  | "MINDFULNESS"
  | "JOURNALING"
  | "SOCIAL"
  | "ACHIEVEMENT"
  | "SPECIAL"

export type BadgeRarity = 
  | "COMMON"
  | "RARE"
  | "EPIC"
  | "LEGENDARY"

export const BADGE_ANIMATIONS = {
  SPARKLE: "animate-sparkle",
  PULSE: "animate-pulse",
  BOUNCE: "animate-bounce",
  SPIN: "animate-spin",
  GLOW: "animate-glow"
}

export const BADGES: Badge[] = [
  // Wellness Badges
  {
    id: "wellness-starter",
    name: "Wellness Pioneer",
    description: "Begin your wellness journey",
    icon: "🌱",
    category: "WELLNESS",
    rarity: "COMMON",
    earned: false,
    animation: BADGE_ANIMATIONS.SPARKLE
  },
  {
    id: "wellness-master",
    name: "Wellness Guru",
    description: "Reach level 10 in your wellness journey",
    icon: "🌟",
    category: "WELLNESS",
    rarity: "LEGENDARY",
    earned: false,
    animation: BADGE_ANIMATIONS.GLOW
  },

  // Mindfulness Badges
  {
    id: "mindful-beginner",
    name: "Mindful Moments",
    description: "Complete your first mindfulness session",
    icon: "🧘",
    category: "MINDFULNESS",
    rarity: "COMMON",
    earned: false,
    animation: BADGE_ANIMATIONS.PULSE
  },
  {
    id: "zen-master",
    name: "Zen Master",
    description: "Complete 50 mindfulness sessions",
    icon: "☯️",
    category: "MINDFULNESS",
    rarity: "EPIC",
    earned: false,
    animation: BADGE_ANIMATIONS.SPIN
  },

  // Journaling Badges
  {
    id: "journal-starter",
    name: "Dear Diary",
    description: "Write your first journal entry",
    icon: "📖",
    category: "JOURNALING",
    rarity: "COMMON",
    earned: false,
    animation: BADGE_ANIMATIONS.BOUNCE
  },
  {
    id: "prolific-writer",
    name: "Prolific Writer",
    description: "Write 100 journal entries",
    icon: "✍️",
    category: "JOURNALING",
    rarity: "EPIC",
    earned: false,
    animation: BADGE_ANIMATIONS.SPARKLE
  },

  // Social Badges
  {
    id: "serena-friend",
    name: "Serena's Confidant",
    description: "Have deep conversations with Serena",
    icon: "💫",
    category: "SOCIAL",
    rarity: "RARE",
    earned: false,
    animation: BADGE_ANIMATIONS.PULSE
  },
  {
    id: "community-pillar",
    name: "Community Pillar",
    description: "Achieve all social milestones",
    icon: "🤝",
    category: "SOCIAL",
    rarity: "LEGENDARY",
    earned: false,
    animation: BADGE_ANIMATIONS.GLOW
  },

  // Achievement Badges
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintain a 30-day login streak",
    icon: "🔥",
    category: "ACHIEVEMENT",
    rarity: "EPIC",
    earned: false,
    animation: BADGE_ANIMATIONS.PULSE
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete all challenges in your level",
    icon: "🏆",
    category: "ACHIEVEMENT",
    rarity: "RARE",
    earned: false,
    animation: BADGE_ANIMATIONS.SPARKLE
  },

  // Special Badges
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Use the app early in the morning for 7 days",
    icon: "🌅",
    category: "SPECIAL",
    rarity: "RARE",
    earned: false,
    animation: BADGE_ANIMATIONS.BOUNCE
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Practice mindfulness before bed for 7 days",
    icon: "🌙",
    category: "SPECIAL",
    rarity: "RARE",
    earned: false,
    animation: BADGE_ANIMATIONS.GLOW
  }
]

export const RARITY_COLORS = {
  COMMON: "text-slate-500 dark:text-slate-400",
  RARE: "text-blue-500 dark:text-blue-400",
  EPIC: "text-purple-500 dark:text-purple-400",
  LEGENDARY: "text-yellow-500 dark:text-yellow-400"
}

export function getBadgesByCategory(badges: Badge[]): Record<BadgeCategory, Badge[]> {
  return badges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = []
    }
    acc[badge.category].push(badge)
    return acc
  }, {} as Record<BadgeCategory, Badge[]>)
}

export function checkBadgeEligibility(badge: Badge, stats: any): boolean {
  // Implement badge-specific eligibility checks
  switch (badge.id) {
    case "wellness-starter":
      return stats.totalPoints > 0
    case "wellness-master":
      return stats.level >= 10
    case "mindful-beginner":
      return stats.mindfulnessSessions > 0
    case "zen-master":
      return stats.mindfulnessSessions >= 50
    case "journal-starter":
      return stats.journalEntries > 0
    case "prolific-writer":
      return stats.journalEntries >= 100
    case "streak-master":
      return stats.dailyStreak >= 30
    default:
      return false
  }
} 