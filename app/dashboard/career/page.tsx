"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoalSettingSection from "./components/goal-setting";
import WorkplaceChallenges from "./components/workplace-challenges";
import WorkLifeBalance from "./components/work-life-balance";
import NetworkingSection from "./components/networking";
import ResourceLibrary from "./components/resource-library";
import SuccessStories from "./components/success-stories";
import CareerHealth from "./components/career-health";

export default function CareerCoachingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 space-y-6"
    >
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Career Coaching Zone</h1>
        <p className="text-muted-foreground">
          Your personalized space for career growth, professional development, and work-life harmony.
        </p>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="balance">Work-Life</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="health">Health Check</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <GoalSettingSection />
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <WorkplaceChallenges />
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <WorkLifeBalance />
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <NetworkingSection />
        </TabsContent>

        <TabsContent value="stories" className="space-y-4">
          <SuccessStories />
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <ResourceLibrary />
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <CareerHealth />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
} 
