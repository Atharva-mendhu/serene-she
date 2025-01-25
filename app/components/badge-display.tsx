"use client"

import { useState } from "react"
import { Medal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge, BadgeCategory, RARITY_COLORS, getBadgesByCategory } from "../lib/badge-system"

interface BadgeDisplayProps {
  badges: Badge[]
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const badgesByCategory = getBadgesByCategory(badges)
  const earnedCount = badges.filter(b => b.earned).length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
          <Medal className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{earnedCount} / {badges.length}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Badges</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="WELLNESS" className="mt-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
            {Object.keys(badgesByCategory).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-xs py-2"
              >
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
            <TabsContent
              key={category}
              value={category}
              className="border rounded-lg mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {(categoryBadges as Badge[]).map((badge: Badge) => (
                  <div
                    key={badge.id}
                    className={`relative p-4 rounded-lg border ${
                      badge.earned ? "bg-primary/10" : "bg-muted/50 opacity-50"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className={`text-3xl ${badge.earned ? badge.animation : ""}`}>
                        {badge.icon}
                      </span>
                      <div>
                        <p className={`font-medium ${RARITY_COLORS[badge.rarity]}`}>
                          {badge.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {badge.description}
                        </p>
                      </div>
                      {badge.earned && badge.earnedDate && (
                        <p className="text-xs text-primary mt-2">
                          Earned {new Date(badge.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 


