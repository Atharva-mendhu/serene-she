"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  MessageCircle,
  BookOpen,
  Brain,
  Briefcase,
  ClipboardList,
  Library
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";

const features = [
  {
    title: "Chat with Serena",
    description: "Get emotional support and guidance",
    icon: MessageCircle,
    path: "/dashboard/ai-support",
    color: "bg-pink-500",
    textColor: "text-pink-500",
  },
  {
    title: "Journal",
    description: "Document your thoughts and feelings",
    icon: BookOpen,
    path: "/dashboard/journal",
    color: "bg-purple-500",
    textColor: "text-purple-500",
  },
  {
    title: "Mindfulness",
    description: "Practice meditation and breathing",
    icon: Brain,
    path: "/dashboard/mindfulness",
    color: "bg-blue-500",
    textColor: "text-blue-500",
  },
  {
    title: "Career Coaching",
    description: "Get guidance for your career",
    icon: Briefcase,
    path: "/dashboard/career",
    color: "bg-green-500",
    textColor: "text-green-500",
  },
  {
    title: "Wellness Quiz",
    description: "Assess your mental wellbeing",
    icon: ClipboardList,
    path: "/dashboard/quiz",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  {
    title: "Resources",
    description: "Access helpful articles and tools",
    icon: Library,
    path: "/dashboard/resources",
    color: "bg-red-500",
    textColor: "text-red-500",
  },
];

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="grid gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.path} href={feature.path}>
              <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}


