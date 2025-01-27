"use client"

import { motion } from "framer-motion"
import { ArrowRight, Heart, Brain, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const features = [
    {
      icon: Heart,
      title: "Mental Wellness",
      description: "Nurture your mental health with personalized support and guidance",
    },
    {
      icon: Brain,
      title: "Career Growth",
      description: "Achieve your professional goals with expert career coaching",
    },
    {
      icon: Shield,
      title: "Safe Space",
      description: "A supportive community where you can be yourself",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-16"
      >
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Welcome to SereneShe
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Your Personal Space for{" "}
            <span className="text-primary">Growth & Wellness</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-xl text-muted-foreground"
          >
            Empowering women to thrive in their careers while maintaining mental wellness
            through AI-powered support and a nurturing community.
          </motion.p>
        </div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-card border shadow-sm"
            >
              <div className="absolute -top-4 left-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
} 