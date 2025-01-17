import { Compass, Brain, Calendar, BookOpen, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoodSelector } from "./components/mood-selector"
import { DashboardHeader } from "./components/dashboard-header"
import { DashboardNav } from "./components/dashboard-nav"
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <DashboardNav />
        
        {/* Quick Mood Check */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">How are you feeling today?</h2>
          <MoodSelector />
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/ai-support" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  AI Support Chat
                </CardTitle>
                <CardDescription>Chat with our empathetic AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get immediate support and guidance through our AI-powered chat system
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/quiz" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Mental Health Quiz
                </CardTitle>
                <CardDescription>Assess your mental well-being</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Take our comprehensive mental health assessment
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/journal" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-500" />
                  Mood Journal
                </CardTitle>
                <CardDescription>Track your emotional journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Record and analyze your daily moods and reflections
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/mindfulness" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-teal-500" />
                  Mindfulness Zone
                </CardTitle>
                <CardDescription>Practice mindfulness exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access guided breathing exercises and meditation techniques
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/resources" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Educational Resources
                </CardTitle>
                <CardDescription>Learn and grow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore articles on workplace wellness and personal development
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

