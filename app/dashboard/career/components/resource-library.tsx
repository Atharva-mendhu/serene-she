"use client";

import { Card } from "@/app/components/ui/card";
import {
  Book,
  Headphones,
  Play,
  BookOpen,
  Download,
  Search,
  Filter,
  BookmarkPlus,
} from "lucide-react";

const resourceCategories = [
  {
    title: "Career Development",
    count: 45,
    icon: Book,
  },
  {
    title: "Leadership Skills",
    count: 32,
    icon: BookOpen,
  },
  {
    title: "Work-Life Balance",
    count: 28,
    icon: Book,
  },
];

const featuredResources = [
  {
    id: "1",
    title: "The Art of Career Negotiation",
    type: "E-Book",
    author: "Dr. Emily Roberts",
    duration: "45 min read",
    icon: Book,
    category: "Career Development",
    downloads: 1234,
  },
  {
    id: "2",
    title: "Leading with Empathy",
    type: "Podcast",
    author: "Leadership Today",
    duration: "32 min",
    icon: Headphones,
    category: "Leadership",
    downloads: 856,
  },
  {
    id: "3",
    title: "Mastering Difficult Conversations",
    type: "Video Course",
    author: "Communication Academy",
    duration: "1.5 hours",
    icon: Play,
    category: "Professional Skills",
    downloads: 2156,
  },
];

const recommendedGuides = [
  {
    id: "1",
    title: "Complete Guide to Remote Work Success",
    description: "Master the art of working remotely and staying productive",
    readTime: "15 min read",
  },
  {
    id: "2",
    title: "Effective Time Management Strategies",
    description: "Optimize your workday and boost productivity",
    readTime: "10 min read",
  },
  {
    id: "3",
    title: "Building Your Personal Brand",
    description: "Stand out in your professional field",
    readTime: "12 min read",
  },
];

export default function ResourceLibrary() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-muted">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resourceCategories.map((category) => (
          <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.count} resources</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredResources.map((resource) => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <button className="p-2 hover:bg-muted rounded-full">
                    <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.author}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{resource.duration}</span>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span>{resource.downloads}</span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                  Access Resource
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recommended Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedGuides.map((guide) => (
            <Card key={guide.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <h3 className="font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                  <button className="text-primary hover:text-primary/80">Read More</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 