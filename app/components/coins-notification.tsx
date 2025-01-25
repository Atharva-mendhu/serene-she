"use client"

import { useEffect } from "react"
import { Flame } from "lucide-react"

interface CoinsNotificationProps {
  amount: number
  streak?: number
  isVisible: boolean
  onHide: () => void
}

export function CoinsNotification({ amount, streak, isVisible, onHide }: CoinsNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-1.5">
          {streak && (
            <div className="flex items-center gap-1 mr-2 text-yellow-300">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-medium">{streak}</span>
            </div>
          )}
          <span className="font-bold">+{amount}</span>
          <span className="text-sm">SereneCoins</span>
        </div>
      </div>
    </div>
  )
} 

