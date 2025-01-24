"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import Link from "next/link";
import {
  MessageCircle,
  Brain,
  PenTool,
  BookOpen,
  Library,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Career Coaching",
    description: "Explore career growth opportunities and get expert guidance",
    icon: Briefcase,
    path: "/dashboard/career",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Chat with Serena",
    description: "Get personalized AI support for your wellness journey",
    icon: MessageCircle,
    path: "/dashboard/ai-support",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Journal",
    description: "Express your thoughts and track your emotional well-being",
    icon: PenTool,
    path: "/dashboard/journal",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Mindfulness",
    description: "Practice meditation and mindfulness exercises",
    icon: Brain,
    path: "/dashboard/mindfulness",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Quiz",
    description: "Assess your wellness and track your progress",
    icon: BookOpen,
    path: "/dashboard/quiz",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "Resources",
    description: "Access helpful articles, guides, and tools",
    icon: Library,
    path: "/dashboard/resources",
    color: "bg-red-500/10 text-red-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to SereneShe</h1>
          <p className="text-muted-foreground">
            Your personal space for wellness, growth, and empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.path}>
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="space-y-4">
                    <div className={`p-3 w-fit rounded-full ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{feature.title}</h2>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

