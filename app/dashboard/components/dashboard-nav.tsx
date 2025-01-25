"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Compass, Brain, Calendar, BookOpen, Sparkles } from 'lucide-react'

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Compass,
  },
  {
    title: "AI Support",
    href: "/dashboard/ai-support",
    icon: Sparkles,
  },
  {
    title: "Mental Health Quiz",
    href: "/dashboard/quiz",
    icon: Brain,
  },
  {
    title: "Mood Journal",
    href: "/dashboard/journal",
    icon: Calendar,
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    icon: BookOpen,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="mb-8">
      <div className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto pb-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}




