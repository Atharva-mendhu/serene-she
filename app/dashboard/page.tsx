import { DashboardHeader } from "./components/dashboard-header"
import { NavigationBar } from "@/components/navigation-bar"
import Link from "next/link"
import { MessageCircle, BookOpen, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Serene She</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* AI Chat Section */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">Chat with Serena</h2>
            <p className="text-muted-foreground mb-4">
              Share your thoughts and feelings with our empathetic AI companion.
            </p>
            <Link href="/dashboard/ai-support" className="inline-block">
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </Link>
          </div>

          {/* Journal Section */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">Journal</h2>
            <p className="text-muted-foreground mb-4">
              Record your thoughts, track your moods, and reflect on your journey.
            </p>
            <Link href="/dashboard/journal" className="inline-block">
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Open Journal
              </Button>
            </Link>
          </div>

          {/* Mindfulness Section */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">Mindfulness</h2>
            <p className="text-muted-foreground mb-4">
              Practice meditation and mindfulness exercises for inner peace.
            </p>
            <Link href="/dashboard/mindfulness" className="inline-block">
              <Button className="w-full">
                <Brain className="mr-2 h-4 w-4" />
                Start Practice
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}



