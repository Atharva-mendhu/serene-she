"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { JournalEntry, calculateAnalytics, getMoodEmoji } from "@/lib/journal-types"
import { MoodPattern } from "./mood-pattern"

interface JournalAnalyticsProps {
  entries: JournalEntry[]
}

export function JournalAnalytics({ entries }: JournalAnalyticsProps) {
  const analytics = useMemo(() => calculateAnalytics(entries), [entries])

  if (entries.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Start journaling to see your mood analytics!
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mood Pattern Visualization */}
      <MoodPattern entries={entries} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview Card */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Overview</h3>
          <div className="space-y-2">
            <p>
              <span className="text-muted-foreground">Total Entries:</span>{" "}
              <span className="font-medium">{analytics.totalEntries}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Current Streak:</span>{" "}
              <span className="font-medium">{analytics.streakDays} days</span>
            </p>
            <p>
              <span className="text-muted-foreground">Most Frequent Mood:</span>{" "}
              <span className="font-medium">
                {getMoodEmoji(analytics.mostFrequentMood)}{" "}
                {analytics.mostFrequentMood}
              </span>
            </p>
          </div>
        </Card>

        {/* Mood Distribution Card */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Mood Distribution</h3>
          <div className="space-y-3">
            {analytics.moodDistribution.map(({ mood, count, percentage }) => (
              <div key={mood}>
                <div className="flex justify-between mb-1 text-sm">
                  <span>
                    {getMoodEmoji(mood)} {mood}
                  </span>
                  <span className="text-muted-foreground">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Common Tags Card */}
        <Card className="p-6 md:col-span-2">
          <h3 className="font-semibold mb-4">Common Themes</h3>
          <div className="flex flex-wrap gap-2">
            {analytics.mostFrequentTags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
} 