"use client"

import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPoints } from "@/lib/points-system"

interface DailyRewardsProps {
  points: UserPoints
  onClaimReward: () => void
}

export function DailyRewards({ points, onClaimReward }: DailyRewardsProps) {
  const today = new Date().toISOString().split('T')[0]
  const lastLogin = new Date(points.lastLoginDate).toISOString().split('T')[0]
  const canClaim = today !== lastLogin

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={canClaim ? "animate-bounce" : ""}
        >
          <Gift className={`h-5 w-5 ${canClaim ? "text-primary" : "text-muted-foreground"}`} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daily Rewards</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Login Bonus</p>
                <p className="text-sm text-muted-foreground">
                  +10 SP for logging in each day
                </p>
              </div>
              <Button
                onClick={onClaimReward}
                disabled={!canClaim}
              >
                {canClaim ? "Claim" : "Claimed"}
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="font-medium">Streak Bonus</p>
            <p className="text-sm text-muted-foreground mb-2">
              Current streak: {points.dailyStreak} days
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${
                    points.dailyStreak >= day
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +5 SP bonus for each consecutive day
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
