"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { BreathingExercises } from "./components/breathing-exercises"
import { DeskYoga } from "./components/desk-yoga"
import { MoodTracker } from "./components/mood-tracker"
import { Card } from "@/app/components/ui/card"
import { Bot } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function MindfulnessPage() {
  const [preMoodScore, setPreMoodScore] = useState<number | null>(null)
  const [postMoodScore, setPostMoodScore] = useState<number | null>(null)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 pb-24 bg-[#0f172a] min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4 mb-8"
        >
          <div className="p-2 bg-white/10 rounded-full">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Mindfulness Practice
            </h1>
            <p className="text-white/70">Take a moment to center yourself and find peace</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 mb-8 bg-[#0f172a] border border-white/10">
            <MoodTracker 
              preMoodScore={preMoodScore}
              postMoodScore={postMoodScore}
              onPreMoodChange={setPreMoodScore}
              onPostMoodChange={setPostMoodScore}
            />
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="breathing" className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full bg-[#1e293b]">
              <TabsTrigger 
                value="breathing"
                className="data-[state=active]:bg-[#0f172a] text-white/70 data-[state=active]:text-white"
              >
                Breathing Exercises
              </TabsTrigger>
              <TabsTrigger 
                value="yoga"
                className="data-[state=active]:bg-[#0f172a] text-white/70 data-[state=active]:text-white"
              >
                Desk Yoga
              </TabsTrigger>
            </TabsList>
            <TabsContent value="breathing" className="bg-[#0f172a] border border-white/10 rounded-lg p-4">
              <BreathingExercises />
            </TabsContent>
            <TabsContent value="yoga" className="bg-[#0f172a] border border-white/10 rounded-lg p-4">
              <DeskYoga />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}




