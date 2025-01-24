"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { POINTS_REWARDS } from "@/lib/points-system"

interface Challenge {
  id: string
  title: string
  description: string
  completed: boolean
}

interface ChallengeDisplayProps {
  challenges: Challenge[]
  onComplete: (id: string) => void
}

export function ChallengeDisplay({ challenges, onComplete }: ChallengeDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Daily Challenges</h3>
      </div>
      <div className="grid gap-3">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg border ${
              challenge.completed ? "bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => !challenge.completed && onComplete(challenge.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{challenge.title}</p>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
              </div>
              <div className="text-xs font-medium">
                +{POINTS_REWARDS.COMPLETE_CHALLENGE} points
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 
