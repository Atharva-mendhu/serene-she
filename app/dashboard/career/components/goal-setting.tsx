"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target, Trophy, BookOpen } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  tasks: { id: string; title: string; completed: boolean }[];
}

export default function GoalSettingSection() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Develop Leadership Skills",
      description: "Complete leadership training and take on team lead responsibilities",
      deadline: "2024-12-31",
      progress: 35,
      tasks: [
        { id: "t1", title: "Complete Leadership Fundamentals Course", completed: true },
        { id: "t2", title: "Lead Team Project", completed: false },
        { id: "t3", title: "Mentor Junior Team Member", completed: false },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Active Goals</h3>
              <p className="text-sm text-muted-foreground">{goals.length} in progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-500/10 rounded-full">
              <Trophy className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold">Achievements</h3>
              <p className="text-sm text-muted-foreground">3 completed goals</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">Learning Path</h3>
              <p className="text-sm text-muted-foreground">5 skills in focus</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Career Goals</h2>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
            <PlusCircle className="h-5 w-5" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  {goal.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
