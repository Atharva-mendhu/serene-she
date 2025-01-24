"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeButton() {
  return (
    <Link href="/dashboard">
      <Button variant="ghost" size="icon" className="absolute top-4 left-4">
        <Home className="h-5 w-5" />
        <span className="sr-only">Go to Dashboard</span>
      </Button>
    </Link>
  )
} 
