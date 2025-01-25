"use client"

import { useState, useEffect } from "react"
import { Flame, Coins } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CoinsNotification } from "../../components/coins-notification"
import { UserPoints, handleDailyLogin, initializePoints } from "../../lib/points-system"

export function DashboardHeader() {
  const [points, setPoints] = useState<UserPoints | null>(null)
  const [showCoinsNotification, setShowCoinsNotification] = useState(false)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const storedPoints = localStorage.getItem("userPoints")
    let userPoints = storedPoints ? JSON.parse(storedPoints) : initializePoints()

    if (userPoints) {
      const { updatedPoints, coinsEarned, newStreak } = handleDailyLogin(userPoints)
      if (coinsEarned > 0) {
        setCoinsEarned(coinsEarned)
        setStreak(newStreak)
        setShowCoinsNotification(true)
      }
      userPoints = updatedPoints
      localStorage.setItem("userPoints", JSON.stringify(userPoints))
    }

    setPoints(userPoints)
  }, [])

  return (
    <div className="relative">
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Welcome to SereneShe</h1>
          <div className="flex items-center gap-4">
            {points?.dailyStreak > 0 && (
              <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">{points.dailyStreak}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <Coins className="w-4 h-4" />
              <span className="text-sm font-medium">{points?.sereneCoins || 0}</span>
            </div>
          </div>
        </div>
      </Card>

      <CoinsNotification
        amount={coinsEarned}
        streak={streak > 0 ? streak : undefined}
        isVisible={showCoinsNotification}
        onHide={() => setShowCoinsNotification(false)}
      />
    </div>
  )
}




