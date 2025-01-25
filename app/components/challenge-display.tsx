"use client"

import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ChallengeDisplay() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
    >
      <Trophy className="h-5 w-5 text-muted-foreground" />
    </Button>
  )
} 
