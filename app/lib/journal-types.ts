export type Mood = "happy" | "calm" | "sad" | "angry" | "anxious" | "tired"

export interface JournalEntry {
  id: string
  date: string
  mood: Mood
  content: string
  tags: string[]
}

export interface MoodAnalytics {
  mood: Mood
  count: number
  percentage: number
}

export interface JournalAnalytics {
  totalEntries: number
  moodDistribution: MoodAnalytics[]
  mostFrequentMood: Mood
  mostFrequentTags: string[]
  streakDays: number
}

// Helper function to get mood emoji
export function getMoodEmoji(mood: Mood): string {
  const moodEmojis: Record<Mood, string> = {
    happy: "😊",
    calm: "😌",
    sad: "😔",
    angry: "😤",
    anxious: "😰",
    tired: "😴"
  }
  return moodEmojis[mood]
}

// Helper function to get mood color
export function getMoodColor(mood: Mood): string {
  const moodColors: Record<Mood, { light: string; dark: string }> = {
    happy: { light: "bg-green-100", dark: "dark:bg-green-900" },
    calm: { light: "bg-blue-100", dark: "dark:bg-blue-900" },
    sad: { light: "bg-purple-100", dark: "dark:bg-purple-900" },
    angry: { light: "bg-red-100", dark: "dark:bg-red-900" },
    anxious: { light: "bg-yellow-100", dark: "dark:bg-yellow-900" },
    tired: { light: "bg-gray-100", dark: "dark:bg-gray-900" }
  }
  return `${moodColors[mood].light} ${moodColors[mood].dark}`
}

// Function to calculate analytics from journal entries
export function calculateAnalytics(entries: JournalEntry[]): JournalAnalytics {
  // Count total entries
  const totalEntries = entries.length

  // Calculate mood distribution
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1
    return acc
  }, {} as Record<Mood, number>)

  const moodDistribution: MoodAnalytics[] = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood as Mood,
    count,
    percentage: (count / totalEntries) * 100
  }))

  // Find most frequent mood
  const mostFrequentMood = moodDistribution.reduce((a, b) => 
    a.count > b.count ? a : b
  ).mood

  // Calculate most frequent tags
  const tagCounts = entries.reduce((acc, entry) => {
    entry.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const mostFrequentTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag)

  // Calculate streak
  const sortedDates = entries
    .map(entry => new Date(entry.date).toISOString().split('T')[0])
    .sort()
    .reverse()

  let streakDays = 1
  const today = new Date().toISOString().split('T')[0]
  if (sortedDates[0] === today) {
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i-1])
      const prevDate = new Date(sortedDates[i])
      const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays === 1) {
        streakDays++
      } else {
        break
      }
    }
  }

  return {
    totalEntries,
    moodDistribution,
    mostFrequentMood,
    mostFrequentTags,
    streakDays
  }
} 