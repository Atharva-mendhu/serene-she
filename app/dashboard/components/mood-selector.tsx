"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Mood = {
  emoji: string
  label: string
  value: string
}

const moods: Mood[] = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😤", label: "Angry", value: "angry" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😴", label: "Tired", value: "tired" },
]

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const handleMoodSelect = (value: string) => {
    setSelectedMood(value)
    setSaved(false)
  }

  const handleSaveMood = async () => {
    if (!selectedMood) return

    // Here you would typically save to your backend
    // For now, we'll just simulate saving
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setSaved(true)
    } catch (error) {
      console.error('Failed to save mood:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {moods.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMood === mood.value ? "default" : "outline"}
            className={`h-20 w-20 flex flex-col items-center justify-center gap-1 ${
              selectedMood === mood.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleMoodSelect(mood.value)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={handleSaveMood}
          disabled={!selectedMood || saved}
          className="w-32"
        >
          {saved ? "Saved!" : "Save Mood"}
        </Button>
        {saved && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Your mood has been recorded!
          </p>
        )}
      </div>
    </div>
  )
}

