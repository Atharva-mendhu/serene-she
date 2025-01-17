"use client"

import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { JournalEntry, getMoodEmoji, getMoodColor } from "@/lib/journal-types"

interface JournalEntryListProps {
  entries: JournalEntry[]
}

export function JournalEntryList({ entries }: JournalEntryListProps) {
  if (entries.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          No journal entries yet. Start writing to track your journey!
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getMoodColor(entry.mood)}`}>
                <span className="text-xl" role="img" aria-label={entry.mood}>
                  {getMoodEmoji(entry.mood)}
                </span>
              </div>
              <div>
                <p className="font-medium">
                  Feeling <span className="capitalize">{entry.mood}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.date), "PPP 'at' p")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="whitespace-pre-wrap">{entry.content}</p>
          </div>

          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
} 