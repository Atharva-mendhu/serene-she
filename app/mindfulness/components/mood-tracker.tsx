"use client"

import { Smile, Meh, Frown } from "lucide-react"
import { Button } from "@/app/components/ui/button"

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
    { score: 1, icon: Frown, label: "Stressed" },
    { score: 2, icon: Meh, label: "Neutral" },
    { score: 3, icon: Smile, label: "Relaxed" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2 text-white">How are you feeling?</h3>
        <div className="flex justify-center gap-4">
          {moods.map(({ score, icon: Icon, label }) => (
            <Button
              key={score}
              variant="outline"
              className={`flex flex-col items-center p-4 bg-[#0f172a] hover:bg-[#1e293b] transition-colors ${
                preMoodScore === score 
                  ? "border-2 border-white/40" 
                  : "border border-white/10"
              }`}
              onClick={() => onPreMoodChange(score)}
            >
              <Icon className={`h-8 w-8 mb-1 text-white ${
                preMoodScore === score ? "opacity-100" : "opacity-60"
              }`} />
              <span className={`text-sm font-medium text-white ${
                preMoodScore === score ? "opacity-100" : "opacity-60"
              }`}>
                {label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {preMoodScore && !postMoodScore && (
        <p className="text-center text-white/70 font-medium bg-[#1e293b] p-4 rounded-lg">
          {getMoodMessage(preMoodScore)}
        </p>
      )}

      {postMoodScore && (
        <div>
          <h3 className="text-lg font-medium mb-2 text-white">After the exercise:</h3>
          <div className="flex justify-center gap-4">
            {moods.map(({ score, icon: Icon, label }) => (
              <Button
                key={score}
                variant="outline"
                className={`flex flex-col items-center p-4 bg-[#0f172a] hover:bg-[#1e293b] transition-colors ${
                  postMoodScore === score 
                    ? "border-2 border-white/40" 
                    : "border border-white/10"
                }`}
                onClick={() => onPostMoodChange(score)}
              >
                <Icon className={`h-8 w-8 mb-1 text-white ${
                  postMoodScore === score ? "opacity-100" : "opacity-60"
                }`} />
                <span className={`text-sm font-medium text-white ${
                  postMoodScore === score ? "opacity-100" : "opacity-60"
                }`}>
                  {label}
                </span>
              </Button>
            ))}
          </div>
          
          {postMoodScore < preMoodScore && (
            <p className="text-center text-white/70 mt-4 bg-[#1e293b] p-4 rounded-lg">
              It's okay to not feel better right away. Consider trying another exercise or reaching out for support.
            </p>
          )}
          {postMoodScore === preMoodScore && (
            <p className="text-center text-white/70 mt-4 bg-[#1e293b] p-4 rounded-lg">
              Maintaining your mood is also progress. Regular practice can help build resilience.
            </p>
          )}
          {postMoodScore > preMoodScore && (
            <p className="text-center text-white/70 mt-4 bg-[#1e293b] p-4 rounded-lg">
              Great improvement! Remember this feeling and come back whenever you need a boost.
            </p>
          )}
        </div>
      )}
    </div>
  )
} 


