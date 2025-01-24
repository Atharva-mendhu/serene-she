"use client"

import { Card } from "@/components/ui/card"
import { JournalEntry, Mood, getMoodEmoji, getMoodColor } from "@/lib/journal-types"
import { subDays, format, eachDayOfInterval } from "date-fns"

interface MoodPatternProps {
  entries: JournalEntry[]
}

interface DayMood {
  date: Date
  mood?: Mood
  entry?: JournalEntry
}

export function MoodPattern({ entries }: MoodPatternProps) {
  // Get the last 14 days
  const endDate = new Date()
  const startDate = subDays(endDate, 13) // 14 days including today
  
  // Create array of all days in range
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  
  // Map entries to days
  const moodsByDay: DayMood[] = days.map(date => {
    const dayStr = date.toISOString().split('T')[0]
    const entry = entries.find(e => e.date.split('T')[0] === dayStr)
    return {
      date,
      mood: entry?.mood,
      entry
    }
  })

  // Calculate mood transitions
  const moodTransitions = moodsByDay.reduce((acc, day, index, array) => {
    if (index === 0) return acc
    const prevMood = array[index - 1].mood
    const currentMood = day.mood
    if (prevMood && currentMood) {
      const key = `${prevMood}-${currentMood}`
      acc[key] = (acc[key] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  // Find most common transitions
  const commonTransitions = Object.entries(moodTransitions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Mood Pattern</h3>
      
      {/* Calendar View */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-2">
          {moodsByDay.map(({ date, mood, entry }) => (
            <div
              key={date.toISOString()}
              className={`aspect-square rounded-lg flex items-center justify-center ${
                mood ? getMoodColor(mood) : "bg-muted"
              }`}
              title={entry ? `${format(date, "MMM d")}: ${entry.content}` : format(date, "MMM d")}
            >
              <span className="text-lg">
                {mood ? getMoodEmoji(mood) : "·"}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-1">
          {moodsByDay.map(({ date }) => (
            <div key={date.toISOString()} className="text-center text-xs text-muted-foreground">
              {format(date, "d")}
            </div>
          ))}
        </div>
      </div>

      {/* Mood Transitions */}
      {commonTransitions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Common Mood Transitions</h4>
          <div className="space-y-2">
            {commonTransitions.map(([transition, count]) => {
              const [fromMood, toMood] = transition.split("-") as [Mood, Mood]
              return (
                <div key={transition} className="flex items-center gap-2">
                  <span>{getMoodEmoji(fromMood)}</span>
                  <span>→</span>
                  <span>{getMoodEmoji(toMood)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({count} times)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
} 
