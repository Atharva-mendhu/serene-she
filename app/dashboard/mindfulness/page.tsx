"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { HomeButton } from "../components/home-button"

const exercises = [
  {
    id: 1,
    title: "Deep Breathing",
    description: "Focus on your breath to calm your mind and reduce stress.",
    duration: 300, // 5 minutes in seconds
  },
  {
    id: 2,
    title: "Body Scan",
    description: "Gradually focus your attention on different parts of your body to release tension.",
    duration: 600, // 10 minutes in seconds
  },
  {
    id: 3,
    title: "Loving-Kindness Meditation",
    description: "Cultivate feelings of love and compassion for yourself and others.",
    duration: 900, // 15 minutes in seconds
  },
]

export default function MindfulnessPage() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(selectedExercise.duration)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsPlaying(true)
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setTimeRemaining(selectedExercise.duration)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6">Mindfulness Exercises</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`cursor-pointer transition-shadow hover:shadow-lg ${
                selectedExercise.id === exercise.id ? "border-purple-500 border-2" : ""
              }`}
              onClick={() => {
                setSelectedExercise(exercise)
                setTimeRemaining(exercise.duration)
                setIsPlaying(false)
              }}
            >
              <CardHeader>
                <CardTitle>{exercise.title}</CardTitle>
                <CardDescription>{formatTime(exercise.duration)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{selectedExercise.title}</CardTitle>
          <CardDescription>{selectedExercise.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center text-4xl font-bold mb-4">
            {formatTime(timeRemaining)}
          </div>
          <Slider
            value={[timeRemaining]}
            max={selectedExercise.duration}
            step={1}
            className="mb-4"
            onValueChange={(value) => setTimeRemaining(value[0])}
            disabled={isPlaying}
          />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={isPlaying ? handlePause : handleStart}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

