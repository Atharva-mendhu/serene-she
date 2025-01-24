"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { PointsData } from "@/lib/points-system"

interface PointsDisplayProps {
  points: PointsData
}

export function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <motion.div 
      className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Star className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium">
        {points.totalPoints} points
      </span>
      {points.streak > 0 && (
        <span className="text-xs text-muted-foreground">
          🔥 {points.streak} day streak
        </span>
      )}
    </motion.div>
  )
} 