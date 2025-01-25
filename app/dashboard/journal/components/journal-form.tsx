"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { JournalEntry, Mood, getMoodEmoji, getMoodLabel } from "../../../lib/journal-types"

interface JournalFormProps {
  onSubmit: (entry: JournalEntry) => void
}

export function JournalForm({ onSubmit }: JournalFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim() || !selectedMood) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood: selectedMood,
      tags: tagInput.split(",").map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onSubmit(entry)
    setTitle("")
    setContent("")
    setSelectedMood(null)
    setTagInput("")
  }

  return (
    <div className="relative">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">How are you feeling?</label>
            <div className="grid grid-cols-5 gap-2">
              {([1, 2, 3, 4, 5] as Mood[]).map((mood) => (
                <Button
                  key={mood}
                  type="button"
                  variant={selectedMood === mood ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood)}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <span className="text-2xl mb-1">{getMoodEmoji(mood)}</span>
                  <span className="text-xs">{getMoodLabel(mood)}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Write your thoughts</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[150px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
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
      </Card>
    </div>
  )
} 

