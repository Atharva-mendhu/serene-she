"use client"

import { useState } from "react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data - In production, this would come from your database
const journalEntries = [
  {
    id: 1,
    date: new Date(2024, 0, 15),
    mood: "Happy",
    intensity: 8,
    note: "Had a great presentation at work today. The team was very supportive and the client loved our ideas.",
  },
  {
    id: 2,
    date: new Date(2024, 0, 14),
    mood: "Stressed",
    intensity: 7,
    note: "Deadline approaching for the quarterly report. Need to focus on managing time better.",
  },
  // Add more entries as needed
]

export function JournalEntries() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredEntries = journalEntries.filter(
    (entry) => selectedDate && entry.date.toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>View entries for a specific day</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entries</CardTitle>
          <CardDescription>
            {selectedDate ? (
              `Entries for ${format(selectedDate, "MMMM d, yyyy")}`
            ) : (
              "Select a date to view entries"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <AnimatePresence mode="wait">
              {filteredEntries.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="rounded-lg border p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{entry.mood}</span>
                          <span className="text-sm text-muted-foreground">
                            Intensity: {entry.intensity}/10
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  No entries found for this date
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

