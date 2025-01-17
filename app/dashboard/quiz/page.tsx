"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { HomeButton } from "../components/home-button"

const questions = [
  {
    id: 1,
    question: "How often do you feel overwhelmed by work-related stress?",
    options: [
      { value: "1", label: "Rarely" },
      { value: "2", label: "Sometimes" },
      { value: "3", label: "Often" },
      { value: "4", label: "Almost always" },
    ],
  },
  {
    id: 2,
    question: "How would you rate your overall work-life balance?",
    options: [
      { value: "1", label: "Poor" },
      { value: "2", label: "Fair" },
      { value: "3", label: "Good" },
      { value: "4", label: "Excellent" },
    ],
  },
  {
    id: 3,
    question: "How often do you experience difficulty sleeping due to work-related thoughts?",
    options: [
      { value: "1", label: "Rarely" },
      { value: "2", label: "Sometimes" },
      { value: "3", label: "Often" },
      { value: "4", label: "Almost always" },
    ],
  },
  // Add more questions as needed
]

export default function MentalHealthQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0)
    const maxScore = questions.length * 4
    const percentage = (totalScore / maxScore) * 100

    return [
      { category: "Work Stress", score: percentage },
      { category: "Work-Life Balance", score: 100 - percentage },
    ]
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeButton />
      <h1 className="text-3xl font-bold mb-6">Mental Health Assessment</h1>
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>
                  {questions[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={handleAnswer}
                  value={answers[questions[currentQuestion].id]}
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
                  {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Mental Health Assessment Results</CardTitle>
                <CardDescription>
                  Based on your responses, here's an overview of your mental well-being:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={calculateResults()}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="score" fill="var(--color-score)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <p className="text-sm text-muted-foreground">
                  Remember, this assessment is a general indication and not a professional diagnosis. 
                  If you're concerned about your mental health, please consult with a healthcare professional.
                </p>
                <Button onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers({})
                  setShowResults(false)
                }}>
                  Retake Quiz
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

