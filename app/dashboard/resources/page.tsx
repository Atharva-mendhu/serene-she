"use client"

import { useState } from "react"
import { Search, BookOpen, Briefcase, DollarSign, Brain } from "lucide-react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ArticleGrid } from "./components/article-grid"
import { FeaturedArticles } from "./components/featured-articles"

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
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
            Educational Resources
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of articles and resources designed to empower and support you in your personal and professional journey.
          </p>
        </div>

        <div className="mb-8">
          <FeaturedArticles />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy("popular")}
            >
              Most Popular
            </Button>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {CATEGORIES.map(({ id, name, icon: Icon, color }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex items-center gap-2 py-4"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="hidden md:inline">{name}</span>
                <span className="md:hidden">{name.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map(({ id, name }) => (
            <TabsContent key={id} value={id}>
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

