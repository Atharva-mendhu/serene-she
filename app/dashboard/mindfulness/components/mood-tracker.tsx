"use client"

import { Smile, Meh, Frown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MoodTrackerProps {
  preMoodScore: number | null
  postMoodScore: number | null
  onPreMoodChange: (score: number) => void
  onPostMoodChange: (score: number) => void
}

const getMoodMessage = (score: number) => {
  switch (score) {
    case 1:
      return "Let's help you find some calm and relief through mindful practices."
    case 2:
      return "A mindfulness session can help lift your spirits even higher."
    case 3:
      return "Great! Let's maintain this positive energy with some mindful moments."
    default:
      return "Complete an exercise to track your mood improvement!"
  }
}

export function MoodTracker({
  preMoodScore,
  postMoodScore,
  onPreMoodChange,
  onPostMoodChange,
}: MoodTrackerProps) {
  const moods = [
    { score: 1, icon: Frown, label: "Stressed", color: "text-red-500" },
    { score: 2, icon: Meh, label: "Neutral", color: "text-amber-500" },
    { score: 3, icon: Smile, label: "Relaxed", color: "text-green-500" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">How are you feeling?</h3>
        <div className="flex justify-center gap-4">
          {moods.map(({ score, icon: Icon, label, color }) => (
            <Button
              key={score}
              variant="ghost"
              className={`flex flex-col items-center p-4 hover:bg-muted/50 ${
                preMoodScore === score 
                  ? "bg-primary/20 border-2 border-primary shadow-lg" 
                  : ""
              }`}
              onClick={() => onPreMoodChange(score)}
            >
              <Icon className={`h-8 w-8 mb-1 ${color}`} />
              <span className={`text-sm font-medium ${color}`}>{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {preMoodScore && !postMoodScore && (
        <p className="text-center text-muted-foreground font-medium bg-muted/50 p-4 rounded-lg">
          {getMoodMessage(preMoodScore)}
        </p>
      )}

      {postMoodScore && (
        <div>
          <h3 className="text-lg font-medium mb-2">After the exercise:</h3>
          <div className="flex justify-center gap-4">
            {moods.map(({ score, icon: Icon, label, color }) => (
              <Button
                key={score}
                variant="ghost"
                className={`flex flex-col items-center p-4 hover:bg-muted/50 ${
                  postMoodScore === score 
                    ? "bg-primary/20 border-2 border-primary shadow-lg" 
                    : ""
                }`}
                onClick={() => onPostMoodChange(score)}
              >
                <Icon className={`h-8 w-8 mb-1 ${color}`} />
                <span className={`text-sm font-medium ${color}`}>{label}</span>
              </Button>
            ))}
          </div>
          
          {postMoodScore < preMoodScore && (
            <p className="text-center text-muted-foreground mt-4 bg-muted/50 p-4 rounded-lg">
              It's okay to not feel better right away. Consider trying another exercise or reaching out for support.
            </p>
          )}
          {postMoodScore === preMoodScore && (
            <p className="text-center text-muted-foreground mt-4 bg-muted/50 p-4 rounded-lg">
              Maintaining your mood is also progress. Regular practice can help build resilience.
            </p>
          )}
          {postMoodScore > preMoodScore && (
            <p className="text-center text-muted-foreground mt-4 bg-muted/50 p-4 rounded-lg">
              Great improvement! Remember this feeling and come back whenever you need a boost.
            </p>
          )}
        </div>
      )}
    </div>
  )
} 

