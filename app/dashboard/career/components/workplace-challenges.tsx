"use client";

import { Card } from "@/app/components/ui/card";
import { Search, BookOpen, MessageSquare, Award, ArrowRight } from "lucide-react";

const challengeCategories = [
  {
    title: "Career Growth",
    description: "Strategies for promotions and advancement",
    icon: Award,
    resources: [
      "Negotiating Your Next Promotion",
      "Building a Strong Career Portfolio",
      "Setting Career Milestones",
    ],
  },
  {
    title: "Workplace Communication",
    description: "Effective communication strategies",
    icon: MessageSquare,
    resources: [
      "Handling Difficult Conversations",
      "Giving and Receiving Feedback",
      "Building Professional Relationships",
    ],
  },
  {
    title: "Leadership Development",
    description: "Essential leadership skills and practices",
    icon: BookOpen,
    resources: [
      "Leading Through Change",
      "Building High-Performance Teams",
      "Developing Executive Presence",
    ],
  },
];

const featuredArticles = [
  {
    title: "Navigating Office Politics with Grace",
    category: "Professional Development",
    readTime: "5 min read",
  },
  {
    title: "Setting Boundaries at Work",
    category: "Work-Life Balance",
    readTime: "7 min read",
  },
  {
    title: "Building Your Personal Brand",
    category: "Career Growth",
    readTime: "6 min read",
  },
];

export default function WorkplaceChallenges() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search for workplace challenges or advice..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {challengeCategories.map((category) => (
          <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <ul className="space-y-2">
                {category.resources.map((resource) => (
                  <li key={resource} className="text-sm flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredArticles.map((article) => (
            <Card key={article.title} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">{article.category}</div>
                <h3 className="font-semibold">{article.title}</h3>
                <div className="text-sm text-muted-foreground">{article.readTime}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Need Personalized Advice?</h3>
            <p className="text-sm text-muted-foreground">
              Connect with our AI career coach for tailored guidance on your specific challenges.
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Start Chat
          </button>
        </div>
      </Card>
    </div>
  );
} 