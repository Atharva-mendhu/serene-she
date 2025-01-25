"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreathingExercises } from "./components/breathing-exercises"
import { DeskYoga } from "./components/desk-yoga"
import { MoodTracker } from "./components/mood-tracker"
import { Card } from "@/components/ui/card"

export default function MindfulnessPage() {
  const [preMoodScore, setPreMoodScore] = useState<number | null>(null)
  const [postMoodScore, setPostMoodScore] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
          Mindfulness Practice
        </h1>

        <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-teal-50">
          <MoodTracker 
            preMoodScore={preMoodScore}
            postMoodScore={postMoodScore}
            onPreMoodChange={setPreMoodScore}
            onPostMoodChange={setPostMoodScore}
          />
        </Card>

        <Tabs defaultValue="breathing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breathing">Breathing Exercises</TabsTrigger>
            <TabsTrigger value="yoga">Desk Yoga</TabsTrigger>
          </TabsList>

          <TabsContent value="breathing">
            <BreathingExercises onComplete={() => setPostMoodScore(null)} />
          </TabsContent>

          <TabsContent value="yoga">
            <DeskYoga onComplete={() => setPostMoodScore(null)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}




