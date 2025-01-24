import Link from "next/link"
import { Home } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function HomeButton() {
  return (
    <Button variant="outline" size="icon" asChild className="mb-4">
      <Link href="/dashboard">
        <Home className="h-4 w-4" />
        <span className="sr-only">Go to Dashboard</span>
      </Link>
    </Button>
  )
}


