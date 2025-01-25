"use client"

import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { UserPoints, getLevelProgress } from "@/lib/points-system"

interface PointsDisplayProps {
  points: UserPoints
}

const LEVEL_TITLES = [
  "Serenity Seeker",
  "Mindful Explorer",
  "Wellness Wanderer",
  "Peace Pioneer",
  "Harmony Hero",
  "Tranquility Guide",
  "Balance Bearer",
  "Wisdom Walker",
  "Zen Master",
  "Enlightened Soul"
]

export function PointsDisplay({ points }: PointsDisplayProps) {
  if (!points) return null

  const progress = getLevelProgress(points.totalPoints)
  const levelTitle = LEVEL_TITLES[Math.min(points.level - 1, LEVEL_TITLES.length - 1)] || `Level ${points.level}`

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium">Level {points.level}</span>
      </div>
      <div className="flex-1 max-w-[200px]">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{levelTitle}</span>
          <span>{progress.current}/{progress.next} SP</span>
        </div>
        <Progress value={progress.progress} className="h-2" />
      </div>
    </div>
  )
} 
