"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  TrendingUp,
  Heart,
  Target,
  BarChart,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";

interface HealthMetric {
  name: string;
  score: number;
  icon: any;
  color: string;
  description: string;
}

const healthMetrics: HealthMetric[] = [
  {
    name: "Job Satisfaction",
    score: 75,
    icon: Heart,
    color: "text-red-500",
    description: "Overall happiness and fulfillment in current role",
  },
  {
    name: "Career Growth",
    score: 82,
    icon: TrendingUp,
    color: "text-green-500",
    description: "Progress towards career goals and skill development",
  },
  {
    name: "Work-Life Balance",
    score: 68,
    icon: Activity,
    color: "text-blue-500",
    description: "Balance between professional and personal life",
  },
  {
    name: "Goal Achievement",
    score: 90,
    icon: Target,
    color: "text-purple-500",
    description: "Progress on set career objectives",
  },
];

const recommendations = [
  {
    title: "Enhance Leadership Skills",
    description: "Consider taking an advanced management course",
    priority: "high",
  },
  {
    title: "Network Expansion",
    description: "Join 2 industry-specific networking events this month",
    priority: "medium",
  },
  {
    title: "Skill Development",
    description: "Focus on developing public speaking abilities",
    priority: "medium",
  },
];

export default function CareerHealth() {
  const [lastAssessment] = useState("2024-02-15");
  const overallScore = Math.round(
    healthMetrics.reduce((acc, metric) => acc + metric.score, 0) / healthMetrics.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Career Health Check</h2>
          <p className="text-muted-foreground">Last assessment: {lastAssessment}</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <RefreshCcw className="h-4 w-4" />
          <span>Take New Assessment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Overall Career Health</h3>
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{overallScore}%</span>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary/10"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary"
                    strokeDasharray={`${(overallScore / 100) * 377} 377`}
                  />
                </svg>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Your career health is in good standing
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <h3 className="font-semibold">Key Metrics</h3>
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <span className="text-sm font-medium">{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Recommended Actions</h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.title}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      rec.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {rec.priority}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Schedule Career Counseling</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized advice from our career experts
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Book Session
          </button>
        </div>
      </Card>
    </div>
  );
} 
