"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Battery,
  Calendar,
  Brain,
  Coffee,
  Bell,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  duration: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export default function WorkLifeBalance() {
  const [wellnessScore, setWellnessScore] = useState(75);
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Team Meeting",
      duration: 60,
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Lunch Break",
      duration: 30,
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Mindfulness Session",
      duration: 15,
      priority: "medium",
      completed: false,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Battery className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold">Wellness Score</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Balance</span>
                <span>{wellnessScore}%</span>
              </div>
              <Progress value={wellnessScore} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold">Time Tracking</h3>
            </div>
            <div className="text-2xl font-bold">6.5 hrs</div>
            <div className="text-sm text-muted-foreground">Productive time today</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold">Focus Sessions</h3>
            </div>
            <div className="text-2xl font-bold">3/4</div>
            <div className="text-sm text-muted-foreground">Completed today</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Today's Schedule</h3>
              </div>
              <button className="text-sm text-primary hover:text-primary/80">Add Task</button>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.duration} mins</div>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Coffee className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Wellness Reminders</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Take a Break</div>
                    <div className="text-sm text-muted-foreground">Every 2 hours</div>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">Edit</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Mindfulness Break</div>
                    <div className="text-sm text-muted-foreground">Daily at 2:00 PM</div>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">Edit</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 

