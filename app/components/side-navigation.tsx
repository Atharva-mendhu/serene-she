"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Brain, 
  BookOpen, 
  ClipboardList,
  Coins,
  Flame,
  Settings,
  LogOut
} from "lucide-react"
import { Progress } from "@/app/components/ui/progress"
import { Button } from "@/app/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Mindfulness",
    icon: Brain,
    href: "/dashboard/mindfulness",
  },
  {
    title: "Resources",
    icon: BookOpen,
    href: "/dashboard/resources",
  },
  {
    title: "Quiz",
    icon: ClipboardList,
    href: "/dashboard/quiz",
  },
]

const sideVariants = {
  hidden: { x: -32, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export function SideNavigation() {
  const pathname = usePathname()
  const [coins, setCoins] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lastActive, setLastActive] = useState<string | null>(null)

  useEffect(() => {
    // Load coins and streak from localStorage
    const storedPoints = localStorage.getItem("userPoints")
    if (storedPoints) {
      const { coins: savedCoins, streak: savedStreak, lastActive: savedLastActive } = JSON.parse(storedPoints)
      setCoins(savedCoins || 0)
      setStreak(savedStreak || 0)
      setLastActive(savedLastActive || null)
    }
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sideVariants}
      className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r px-4 py-6 flex flex-col"
    >
      <div className="flex items-center space-x-3 px-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Coins className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold">{coins} Coins</div>
          <div className="text-sm text-muted-foreground">Keep earning!</div>
        </div>
      </div>

      <div className="px-2 mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">{streak} Day Streak</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {lastActive ? `Last active: ${new Date(lastActive).toLocaleDateString()}` : 'Start your streak!'}
          </span>
        </div>
        <Progress value={(streak % 7) * (100/7)} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {7 - (streak % 7)} days until next reward
        </p>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="border-t pt-4 space-y-1">
        <motion.div variants={itemVariants}>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
} 