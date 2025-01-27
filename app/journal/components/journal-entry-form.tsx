"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { JournalEntry, Mood, getMoodEmoji } from "@/lib/journal-types"

interface JournalEntryFormProps {
  onSubmit: (entry: JournalEntry) => void
}

const MOODS: Mood[] = ["happy", "calm", "sad", "angry", "anxious", "tired"]

export function JournalEntryForm({ onSubmit }: JournalEntryFormProps) {
  const [content, setContent] = useState("")
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !selectedMood) return

    const entry: JournalEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      mood: selectedMood,
      content: content.trim(),
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean)
    }

    onSubmit(entry)
    setContent("")
    setSelectedMood(null)
    setTags("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          How are you feeling?
        </label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map(mood => (
            <Button
              key={mood}
              type="button"
              variant={selectedMood === mood ? "default" : "outline"}
              onClick={() => setSelectedMood(mood)}
              className="h-auto py-2 px-4"
            >
              <span className="mr-2 text-lg">{getMoodEmoji(mood)}</span>
              <span className="capitalize">{mood}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Write your thoughts
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-[150px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., work, family, health"
        />
      </div>

      <Button
        type="submit"
        disabled={!content.trim() || !selectedMood}
        className="w-full"
      >
        Save Journal Entry
      </Button>
    </form>
  )
} 


