"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addActivityPoints } from "@/lib/points-system"
import { CoinsNotification } from "@/components/coins-notification"
import { Play, Pause, RotateCcw } from "lucide-react"

interface BreathingExercisesProps {
  onComplete: () => void
}

const BREATHING_TECHNIQUES = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Inhale, hold, exhale, and hold - each for 4 seconds",
    pattern: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Exhale", duration: 4 },
      { phase: "Hold", duration: 4 },
    ],
  },
  {
    id: "478",
    name: "4-7-8 Relaxation",
    description: "Inhale for 4, hold for 7, exhale for 8 seconds",
    pattern: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 7 },
      { phase: "Exhale", duration: 8 },
    ],
  },
  {
    id: "alternate",
    name: "Alternate Nostril",
    description: "Balance your breath between nostrils",
    pattern: [
      { phase: "Right Nostril In", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Left Nostril Out", duration: 4 },
      { phase: "Left Nostril In", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Right Nostril Out", duration: 4 },
    ],
  },
]

export function BreathingExercises({ onComplete }: BreathingExercisesProps) {
  const [selectedTechnique, setSelectedTechnique] = useState(BREATHING_TECHNIQUES[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(selectedTechnique.pattern[0].duration)
  const [cycles, setCycles] = useState(0)
  const [showCoinsNotification, setShowCoinsNotification] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isPlaying) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const nextPhaseIndex = (currentPhaseIndex + 1) % selectedTechnique.pattern.length
            setCurrentPhaseIndex(nextPhaseIndex)
            
            // If we completed a cycle
            if (nextPhaseIndex === 0) {
              setCycles((prev) => prev + 1)
              if (cycles >= 2) { // 3 cycles completed
                setIsPlaying(false)
                onComplete()
                return 0
              }
            }
            
            return selectedTechnique.pattern[nextPhaseIndex].duration
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isPlaying, currentPhaseIndex, selectedTechnique, cycles, onComplete])

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentPhaseIndex(0)
    setTimeRemaining(selectedTechnique.pattern[0].duration)
    setCycles(0)
  }

  const currentPhase = selectedTechnique.pattern[currentPhaseIndex]

  const getInstructionDisplay = (phase: string) => {
    if (phase.includes("Nostril")) {
      const [side, action] = phase.split(" ")
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-1">{side}</span>
          <span className="text-lg font-medium">{action}</span>
        </div>
      )
    }
    return <span className="text-lg font-medium">{phase}</span>
  }

  const handleComplete = () => {
    const storedPoints = localStorage.getItem("userPoints")
    if (storedPoints) {
      const userPoints = JSON.parse(storedPoints)
      const { updatedPoints, coinsEarned } = addActivityPoints(userPoints, "BREATHING_EXERCISE")
      localStorage.setItem("userPoints", JSON.stringify(updatedPoints))
      setShowCoinsNotification(true)
    }
    onComplete?.()
  }

  return (
    <div className="relative">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {BREATHING_TECHNIQUES.map((technique) => (
            <Card
              key={technique.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedTechnique.id === technique.id
                  ? "border-primary border-2"
                  : ""
              }`}
              onClick={() => {
                setSelectedTechnique(technique)
                handleReset()
              }}
            >
              <h3 className="font-semibold mb-2">{technique.name}</h3>
              <p className="text-sm text-muted-foreground">{technique.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex flex-col items-center">
            <motion.div
              className="w-40 h-40 rounded-full border-4 border-primary mb-4 flex items-center justify-center bg-primary/5"
              animate={{
                scale: currentPhase?.phase.includes("Inhale") ? 1.2 : 0.8,
              }}
              transition={{
                duration: timeRemaining,
                ease: "easeInOut",
              }}
            >
              {getInstructionDisplay(currentPhase?.phase || "")}
            </motion.div>

            <div className="text-4xl font-bold mb-6">{timeRemaining}s</div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Cycle {cycles + 1} of 3
            </div>
          </div>
        </Card>
      </div>

      <CoinsNotification
        amount={5}
        isVisible={showCoinsNotification}
        onHide={() => setShowCoinsNotification(false)}
      />
    </div>
  )
} 


