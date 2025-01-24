"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JournalEntry, getMoodEmoji, getMoodLabel } from "../../../lib/journal-types"
import { format, startOfWeek, addDays, isToday, isSameDay } from "date-fns"

interface JournalCalendarProps {
  entries: JournalEntry[]
}

export function JournalCalendar({ entries }: JournalCalendarProps) {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  // Get entries for the current week
  const startOfCurrentWeek = startOfWeek(new Date())
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))
  
  const weekEntries = weekDays.map(date => {
    return entries.find(entry => 
      isSameDay(new Date(entry.createdAt), date)
    )
  })

  // Sort entries by date, most recent first
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="space-y-6">
      {/* Weekly Emotion Graph */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Weekly Mood Pattern</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const entry = weekEntries[index]
            return (
              <Button
                key={date.toISOString()}
                variant="ghost"
                className={`aspect-square flex flex-col items-center justify-center p-2 ${
                  isToday(date) ? "ring-2 ring-primary" : ""
                } ${entry ? "hover:bg-muted" : "opacity-50"}`}
                onClick={() => entry && setSelectedEntry(entry)}
                disabled={!entry}
              >
                <span className="text-xs text-muted-foreground">
                  {format(date, "EEE")}
                </span>
                <span className="text-2xl my-1">
                  {entry ? getMoodEmoji(entry.mood) : "·"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(date, "d")}
                </span>
              </Button>
            )
          })}
        </div>
      </Card>

      {/* Entry List */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Journal History</h3>
        <div className="space-y-4">
          {sortedEntries.map(entry => (
            <Button
              key={entry.id}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{entry.title || "Untitled Entry"}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(entry.createdAt), "PPP")}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Selected Entry View */}
      {selectedEntry && (
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">{selectedEntry.title || "Untitled Entry"}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(selectedEntry.createdAt), "PPP 'at' p")}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl">{getMoodEmoji(selectedEntry.mood)}</span>
              <span className="text-sm text-muted-foreground">{getMoodLabel(selectedEntry.mood)}</span>
            </div>
          </div>
          
          <p className="mb-4 whitespace-pre-wrap">{selectedEntry.content}</p>
          
          {selectedEntry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedEntry.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
} 
