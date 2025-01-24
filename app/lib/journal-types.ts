export type Mood = 1 | 2 | 3 | 4 | 5

export interface JournalEntry {
  id: string
  title: string
  content: string
  mood: Mood
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function getMoodEmoji(mood: Mood): string {
  const emojis: Record<Mood, string> = {
    1: "😢",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😊"
  }
  return emojis[mood]
}

export function getMoodLabel(mood: Mood): string {
  const labels: Record<Mood, string> = {
    1: "Very Low",
    2: "Low",
    3: "Neutral",
    4: "Good",
    5: "Excellent"
  }
  return labels[mood]
}

export function calculateAnalytics(entries: JournalEntry[]) {
  if (!entries.length) {
    return {
      averageMood: 0,
      moodCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      moodTrend: [],
      commonTags: []
    }
  }

  // Calculate mood counts and average
  const moodCounts: Record<Mood, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let moodSum = 0
  entries.forEach(entry => {
    moodCounts[entry.mood]++
    moodSum += entry.mood
  })

  // Calculate mood trend (last 7 entries)
  const moodTrend = entries
    .slice(-7)
    .map(entry => ({
      date: entry.createdAt.split('T')[0],
      mood: entry.mood
    }))

  // Calculate common tags
  const tagCounts: Record<string, number> = {}
  entries.forEach(entry => {
    entry.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const commonTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    averageMood: moodSum / entries.length,
    moodCounts,
    moodTrend,
    commonTags
  }
} 