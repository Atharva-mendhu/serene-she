"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { JournalEntry, calculateAnalytics, getMoodEmoji, getMoodLabel } from "../../../lib/journal-types"

interface JournalAnalyticsProps {
  entries: JournalEntry[]
}

export function JournalAnalytics({ entries }: JournalAnalyticsProps) {
  const analytics = calculateAnalytics(entries)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Mood Overview</h3>
        <div className="space-y-4">
          {Object.entries(analytics.moodCounts).map(([mood, count]) => (
            <div key={mood}>
              <div className="flex justify-between text-sm mb-1">
                <span>{getMoodEmoji(Number(mood) as 1|2|3|4|5)} {getMoodLabel(Number(mood) as 1|2|3|4|5)}</span>
                <span>{count} entries</span>
              </div>
              <Progress value={(count / entries.length) * 100} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Common Tags</h3>
        <div className="flex flex-wrap gap-2">
          {analytics.commonTags.map(({ tag, count }) => (
            <div
              key={tag}
              className="px-2 py-1 bg-muted rounded-full text-sm"
            >
              {tag} ({count})
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 


