"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { POINTS_REWARDS } from "@/lib/points-system"

interface DailyRewardsProps {
  onClaim: () => void
  canClaim: boolean
}

export function DailyRewards({ onClaim, canClaim }: DailyRewardsProps) {
  if (!canClaim) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-primary/5 p-4 rounded-lg"
    >
      <div className="flex items-center gap-3 mb-2">
        <Gift className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Daily Reward Available!</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        Claim your {POINTS_REWARDS.DAILY_LOGIN} points reward for today
      </p>
      <Button onClick={onClaim} className="w-full">
        Claim Reward
      </Button>
    </motion.div>
  )
} 
