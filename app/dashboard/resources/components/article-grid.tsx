"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Heart, Share2, Bookmark } from "lucide-react"

interface ArticleGridProps {
  category: string
  searchQuery: string
  sortBy: "date" | "popular"
}

const ARTICLES = {
  workplace: [
    {
      id: 1,
      title: "Navigating Workplace Harassment: Know Your Rights",
      summary: "Learn how to identify, document, and report workplace harassment while protecting your rights and well-being.",
      readTime: "10 min read",
      date: "2024-01-15",
      likes: 245,
      tags: ["workplace-rights", "harassment", "legal"],
    },
    {
      id: 2,
      title: "Effective Communication in Professional Settings",
      summary: "Master the art of clear, confident communication in various workplace scenarios.",
      readTime: "7 min read",
      date: "2024-01-14",
      likes: 189,
      tags: ["communication", "professional-development"],
    },
    // Add more workplace articles
  ],
  stress: [
    {
      id: 1,
      title: "Understanding and Managing Work-Related Anxiety",
      summary: "Practical strategies to identify anxiety triggers and develop healthy coping mechanisms.",
      readTime: "8 min read",
      date: "2024-01-16",
      likes: 312,
      tags: ["anxiety", "mental-health", "workplace"],
    },
    {
      id: 2,
      title: "Creating a Stress-Free Morning Routine",
      summary: "Design a morning routine that sets you up for a productive, low-stress day.",
      readTime: "6 min read",
      date: "2024-01-13",
      likes: 278,
      tags: ["routine", "productivity", "wellness"],
    },
    // Add more stress management articles
  ],
  finance: [
    {
      id: 1,
      title: "Salary Negotiation: A Woman's Guide",
      summary: "Expert tips and strategies for negotiating your worth in the workplace.",
      readTime: "9 min read",
      date: "2024-01-17",
      likes: 423,
      tags: ["salary", "negotiation", "career"],
    },
    {
      id: 2,
      title: "Smart Investment Strategies for Beginners",
      summary: "A beginner's guide to building a diverse investment portfolio with minimal risk.",
      readTime: "12 min read",
      date: "2024-01-12",
      likes: 356,
      tags: ["investing", "finance-basics", "planning"],
    },
    // Add more financial articles
  ],
  wellness: [
    {
      id: 1,
      title: "Building Mental Resilience at Work",
      summary: "Develop strategies to maintain emotional well-being in challenging work environments.",
      readTime: "8 min read",
      date: "2024-01-18",
      likes: 289,
      tags: ["mental-health", "resilience", "workplace"],
    },
    {
      id: 2,
      title: "The Power of Work-Life Integration",
      summary: "Learn how to create harmony between your professional and personal life.",
      readTime: "7 min read",
      date: "2024-01-11",
      likes: 267,
      tags: ["work-life-balance", "wellness", "productivity"],
    },
    // Add more wellness articles
  ],
}

export function ArticleGrid({ category, searchQuery, sortBy }: ArticleGridProps) {
  const articles = ARTICLES[category as keyof typeof ARTICLES] || []
  
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return b.likes - a.likes
  })

  if (sortedArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sortedArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
              <Heart className="h-4 w-4 ml-2" />
              <span>{article.likes}</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {article.summary}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" className="flex-1">
                Read More
              </Button>
              <div className="flex gap-2 ml-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 
