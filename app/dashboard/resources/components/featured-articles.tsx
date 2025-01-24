"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"

const FEATURED_ARTICLES = [
  {
    id: 1,
    title: "Understanding Your Workplace Rights: A Comprehensive Guide",
    summary: "Learn about essential workplace rights, from equal pay to harassment prevention. This guide covers key laws and practical steps for protecting your rights.",
    category: "workplace",
    readTime: "8 min read",
    image: "/images/workplace-rights.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "5-Minute Stress Relief Techniques for Busy Professionals",
    summary: "Discover quick and effective stress management techniques you can practice right at your desk. Perfect for maintaining calm during hectic workdays.",
    category: "stress",
    readTime: "5 min read",
    image: "/images/stress-relief.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Building Your Emergency Fund: A Step-by-Step Guide",
    summary: "Learn how to create and maintain an emergency fund that provides financial security and peace of mind. Includes practical saving strategies.",
    category: "finance",
    readTime: "6 min read",
    image: "/images/emergency-fund.jpg",
    featured: true,
  },
]

export function FeaturedArticles() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {FEATURED_ARTICLES.map((article) => (
        <Card key={article.id} className="overflow-hidden group">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20" />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                Featured
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
              <Star className="h-4 w-4 ml-2" />
              <span>Editor's Pick</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {article.summary}
            </p>
            
            <Button variant="outline" className="w-full">
              Read Article
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 
