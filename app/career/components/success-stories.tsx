"use client";

import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare, Share2, BookmarkPlus } from "lucide-react";

const successStories = [
  {
    id: "1",
    author: {
      name: "Michelle Zhang",
      role: "Senior Engineering Manager",
      company: "Tech Innovators Inc.",
      avatar: "MZ",
    },
    title: "From Developer to Engineering Manager: A Journey of Growth",
    content:
      "After 5 years as a software developer, I faced the challenge of transitioning into management. Through mentorship, leadership training, and pushing myself out of my comfort zone, I successfully made the leap. Here's how I navigated the challenges and what I learned along the way...",
    tags: ["Career Transition", "Leadership", "Tech"],
    likes: 234,
    comments: 45,
    shares: 89,
  },
  {
    id: "2",
    author: {
      name: "Sarah Chen",
      role: "Product Director",
      company: "Global Solutions",
      avatar: "SC",
    },
    title: "Building Confidence in High-Stakes Presentations",
    content:
      "Public speaking used to terrify me, especially in front of executives. Through practice, preparation, and embracing feedback, I've grown to lead product presentations confidently. Here are my top strategies for overcoming presentation anxiety...",
    tags: ["Public Speaking", "Professional Growth", "Leadership"],
    likes: 156,
    comments: 32,
    shares: 67,
  },
];

export default function SuccessStories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Success Stories</h2>
          <p className="text-muted-foreground">
            Real stories from professionals who've overcome career challenges
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Share Your Story
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {successStories.map((story) => (
          <Card key={story.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {story.author.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{story.author.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.author.role} at {story.author.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-muted rounded-full">
                    <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-full">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2">{story.title}</h4>
                <p className="text-muted-foreground">{story.content}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6 pt-4 border-t">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{story.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <MessageSquare className="h-5 w-5" />
                  <span>{story.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <Share2 className="h-5 w-5" />
                  <span>{story.shares}</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-primary/5">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Share Your Success Story</h3>
            <p className="text-sm text-muted-foreground">
              Inspire others by sharing your career journey and achievements
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Get Started
          </button>
        </div>
      </Card>
    </div>
  );
} 

