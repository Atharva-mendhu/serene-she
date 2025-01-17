"use client"

import { Target, Trophy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UserPoints } from "@/lib/points-system"

interface ChallengeDisplayProps {
  points: UserPoints
}

export function ChallengeDisplay({ points }: ChallengeDisplayProps) {
  if (!points.activeChallenge) {
    return null
  }

  const { activeChallenge } = points
  const progress = (activeChallenge.progress / activeChallenge.requirement) * 100

  return (
    <Card className="p-4 bg-muted/50">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Target className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{activeChallenge.title}</h4>
              <p className="text-sm text-muted-foreground">
                {activeChallenge.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">
                {activeChallenge.reward} SP
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span>
                {activeChallenge.progress} / {activeChallenge.requirement}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  )
} 