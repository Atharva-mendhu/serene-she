"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

// Sample data - In production, this would come from your database
const moodData = [
  { date: "Mon", mood: 7, intensity: 8 },
  { date: "Tue", mood: 6, intensity: 5 },
  { date: "Wed", mood: 8, intensity: 7 },
  { date: "Thu", mood: 5, intensity: 9 },
  { date: "Fri", mood: 7, intensity: 6 },
  { date: "Sat", mood: 9, intensity: 4 },
  { date: "Sun", mood: 8, intensity: 5 },
]

const moodDistribution = [
  { mood: "Happy", count: 12 },
  { mood: "Calm", count: 8 },
  { mood: "Sad", count: 5 },
  { mood: "Stressed", count: 7 },
  { mood: "Anxious", count: 4 },
]

export function MoodAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          <TabsTrigger value="distribution">Mood Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Trends</CardTitle>
              <CardDescription>
                Track your mood and intensity levels over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  mood: {
                    label: "Mood Level",
                    color: "hsl(var(--chart-1))",
                  },
                  intensity: {
                    label: "Intensity",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="intensity"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
              <CardDescription>
                See how your moods are distributed over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  count: {
                    label: "Frequency",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodDistribution}>
                    <XAxis dataKey="mood" />
                    <YAxis />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}



