"use client"

import { useState } from "react"
import { Search, BookOpen, Briefcase, DollarSign, Brain, Library } from "lucide-react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ArticleGrid } from "./components/article-grid"
import { FeaturedArticles } from "./components/featured-articles"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const CATEGORIES = [
  {
    id: "workplace",
    name: "Workplace Ethics & Rights",
    icon: Briefcase,
    color: "text-purple-500",
  },
  {
    id: "stress",
    name: "Stress Management",
    icon: Brain,
    color: "text-teal-500",
  },
  {
    id: "finance",
    name: "Financial Tips",
    icon: DollarSign,
    color: "text-emerald-500",
  },
  {
    id: "wellness",
    name: "Mental Health & Wellness",
    icon: BookOpen,
    color: "text-pink-500",
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("workplace")
  const [sortBy, setSortBy] = useState<"date" | "popular">("date")

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 pb-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4 mb-8"
        >
          <div className="p-2 bg-primary/10 rounded-full">
            <Library className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
              Educational Resources
            </h1>
            <p className="text-muted-foreground">
              Explore our curated collection of articles and resources designed to empower and support you.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <FeaturedArticles />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              onClick={() => setSortBy("date")}
              className="transition-all duration-200 hover:scale-105"
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy("popular")}
              className="transition-all duration-200 hover:scale-105"
            >
              Most Popular
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {CATEGORIES.map(({ id, name, icon: Icon, color }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="flex items-center gap-2 py-4 transition-all duration-200 hover:scale-105"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="hidden md:inline">{name}</span>
                  <span className="md:hidden">{name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {CATEGORIES.map(({ id, name }) => (
                <TabsContent key={id} value={id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
                      <p className="text-muted-foreground">
                        Explore our curated articles and resources about {name.toLowerCase()}.
                      </p>
                    </div>
                    <ArticleGrid
                      category={id}
                      searchQuery={searchQuery}
                      sortBy={sortBy}
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}




