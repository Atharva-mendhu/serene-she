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
  Library,
  Briefcase
} from "lucide-react"

const navItems = [
  {
    path: "/dashboard",
    label: "Home",
    icon: Home
  },
  {
    path: "/dashboard/career",
    label: "Career",
    icon: Briefcase
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-lg shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="font-bold text-xl text-primary"
            >
              SereneShe
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                >
                  <motion.div
                    className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`hidden md:inline-block text-sm ${
                        isActive
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 

