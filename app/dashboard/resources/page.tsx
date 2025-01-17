"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeButton } from "../components/home-button"

const resources = [
  {
    id: 1,
    title: "Understanding Workplace Stress",
    description: "Learn about the causes and effects of workplace stress, and strategies to manage it effectively.",
    category: "Stress Management",
    link: "#",
  },
  {
    id: 2,
    title: "Effective Time Management Techniques",
    description: "Discover proven methods to improve your productivity and reduce stress through better time management.",
    category: "Productivity",
    link: "#",
  },
  {
    id: 3,
    title: "Mindfulness in the Workplace",
    description: "Explore how mindfulness practices can improve your focus, reduce stress, and enhance overall well-being at work.",
    category: "Mindfulness",
    link: "#",
  },
  {
    id: 4,
    title: "Navigating Workplace Relationships",
    description: "Learn strategies for building positive relationships with colleagues and managing conflicts professionally.",
    category: "Workplace Relationships",
    link: "#",
  },
  {
    id: 5,
    title: "Financial Wellness for Professionals",
    description: "Understand the basics of personal finance and learn how to manage your money effectively for long-term success.",
    category: "Financial Wellness",
    link: "#",
  },
  // Add more resources as needed
]

export default function EducationalResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === "all" || resource.category.toLowerCase() === activeTab)
  )

  const categories = ["all", ...new Set(resources.map((r) => r.category.toLowerCase()))]

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredResources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <Button asChild>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {filteredResources.length === 0 && (
        <p className="text-center text-muted-foreground">No resources found matching your search criteria.</p>
      )}
    </div>
  )
}

