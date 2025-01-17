"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Home,
  MessageCircle,
  BookOpen,
  Brain,
  PenTool,
  Library
} from "lucide-react"

const navItems = [
  {
    path: "/dashboard",
    label: "Home",
    icon: Home
  },
  {
    path: "/dashboard/ai-support",
    label: "Chat with Serena",
    icon: MessageCircle
  },
  {
    path: "/dashboard/journal",
    label: "Journal",
    icon: PenTool
  },
  {
    path: "/dashboard/mindfulness",
    label: "Mindfulness",
    icon: Brain
  },
  {
    path: "/dashboard/quiz",
    label: "Quiz",
    icon: BookOpen
  },
  {
    path: "/dashboard/resources",
    label: "Resources",
    icon: Library
  }
]

export function NavigationBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative px-3 py-2"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="relative">
                    <item.icon
                      className={`h-5 w-5 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-4 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </span>
                  <span
                    className={`text-xs transition-colors ${
                      isActive
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 