"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Coins } from "lucide-react"
import { Progress } from "@/app/components/ui/progress"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [coins, setCoins] = useState(0)
  const [streak, setStreak] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Load coins and streak from localStorage
    const storedPoints = localStorage.getItem("userPoints")
    if (storedPoints) {
      const { coins: savedCoins, streak: savedStreak } = JSON.parse(storedPoints)
      setCoins(savedCoins || 0)
      setStreak(savedStreak || 0)
    }
  }, [])

  const navItems = [
    { href: "/journal", label: "Journal" },
    { href: "/mindfulness", label: "Mindfulness" },
    { href: "/resources", label: "Resources" },
    { href: "/quiz", label: "Quiz" },
    { href: "/ai-support", label: "AI Support" },
    { href: "/career", label: "Career" },
  ]

  return (
    <header className="border-b bg-white dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="shrink-0">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="font-bold text-xl text-black dark:text-white"
          >
            SereneShe
          </motion.span>
        </Link>

        <nav className="flex-1 flex items-center justify-center space-x-8 text-sm font-medium">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-black/80 dark:hover:text-white/80 ${
                  isActive ? "text-black dark:text-white font-semibold" : "text-black/60 dark:text-white/60"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center space-x-6 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="flex items-center space-x-1 text-orange-500">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-medium">{streak}</span>
            </div>
            <Progress value={(streak % 7) * (100/7)} className="w-12 h-1" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-1 text-black dark:text-white"
          >
            <Coins className="h-4 w-4" />
            <span className="text-sm font-medium">{coins}</span>
          </motion.div>
        </div>
      </div>
    </header>
  )
} 