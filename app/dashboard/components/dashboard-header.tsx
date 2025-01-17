"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, User } from "lucide-react"
import { useTheme } from "next-themes"
import { PointsDisplay } from "@/components/points-display"
import { DailyRewards } from "@/components/daily-rewards"
import { ChallengeDisplay } from "@/components/challenge-display"
import { UserPoints, initializePoints, handleDailyLogin } from "@/lib/points-system"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [points, setPoints] = useState<UserPoints>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_points')
      return saved ? JSON.parse(saved) : initializePoints()
    }
    return initializePoints()
  })

  useEffect(() => {
    // Handle daily login
    const updatedPoints = handleDailyLogin(points)
    setPoints(updatedPoints)
    localStorage.setItem('user_points', JSON.stringify(updatedPoints))
  }, [])

  const handleRewardClaimed = (updatedPoints: UserPoints) => {
    setPoints(updatedPoints)
    localStorage.setItem('user_points', JSON.stringify(updatedPoints))
  }

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Serene</h1>
            <p className="text-muted-foreground">Your Mental Wellness Companion</p>
          </div>

          <div className="flex items-center space-x-4">
            <PointsDisplay points={points} />
            <DailyRewards points={points} onRewardClaimed={handleRewardClaimed} />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User profile</span>
            </Button>
          </div>
        </div>

        {/* Active Challenge */}
        {points.activeChallenge && (
          <div className="mt-4">
            <ChallengeDisplay points={points} />
          </div>
        )}
      </div>
    </div>
  )
}

