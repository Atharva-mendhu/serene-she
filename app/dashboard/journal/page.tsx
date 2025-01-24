"use client"

import { useState, useEffect } from "react"
import { JournalForm } from "./components/journal-form"
import { JournalAnalytics } from "./components/journal-analytics"
import { JournalCalendar } from "./components/journal-calendar"
import { JournalEntry } from "@/lib/journal-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { PageTransition } from "@/app/components/page-transition"
import { PenTool, Calendar, Book, Sparkles } from "lucide-react"

const STORAGE_KEY = "journal_entries"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem(STORAGE_KEY)
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries))
      } catch (error) {
        console.error("Error loading journal entries:", error)
        setEntries([])
      }
    }
  }, [])

  const handleNewEntry = (entry: JournalEntry) => {
    const updatedEntries = [entry, ...entries]
    setEntries(updatedEntries)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries))
    } catch (error) {
      console.error("Error saving journal entries:", error)
    }
  }

  const recentEntries = [
    { title: "Morning Reflection", date: "Today, 9:30 AM", mood: "Peaceful" },
    { title: "Midday Thoughts", date: "Yesterday, 2:15 PM", mood: "Energetic" },
    { title: "Evening Review", date: "Yesterday, 8:45 PM", mood: "Grateful" },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <div className="p-2 bg-primary/10 rounded-full">
            <Book className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Your Journal</h1>
            <p className="text-muted-foreground">Reflect, express, and track your journey</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border bg-card shadow-sm"
          >
            <div className="space-y-4">
              <div className="p-3 bg-primary/10 w-fit rounded-full">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">New Entry</h2>
              <p className="text-muted-foreground">
                Write down your thoughts, feelings, and experiences.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 mt-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Writing
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border bg-card shadow-sm"
          >
            <div className="space-y-4">
              <div className="p-3 bg-primary/10 w-fit rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Recent Entries</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {recentEntries.map((entry, index) => (
                  <motion.div
                    key={entry.title}
                    variants={itemVariants}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                    <span className="text-sm text-primary">{entry.mood}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {["Mood Tracking", "Guided Prompts", "AI Insights"].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">{feature}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}

