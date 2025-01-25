"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QUIZ_SECTIONS, QUIZ_QUESTIONS, QuizProgress } from "@/lib/quiz-types"
import { PentagonGraph } from "./components/pentagon-graph"

export default function QuizPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const questionsRef = useRef<(HTMLDivElement | null)[]>([])

  const currentQuestions = QUIZ_QUESTIONS.filter(q => q.section === currentSection)
  const currentSectionData = QUIZ_SECTIONS.find(s => s.id === currentSection)
  const progress = (Object.keys(answers).length / QUIZ_QUESTIONS.length) * 100

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))
    
    // Find the next unanswered question in the current section
    const currentQuestionIndex = currentQuestions.findIndex(q => q.id === questionId)
    const nextQuestion = currentQuestions[currentQuestionIndex + 1]
    
    if (nextQuestion) {
      // Scroll to the next question with animation
      const nextQuestionElement = questionsRef.current[currentQuestionIndex + 1]
      if (nextQuestionElement) {
        nextQuestionElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }

  const canProceed = currentQuestions.every(q => answers[q.id])

  const handleNext = () => {
    if (currentSection < 5) {
      setCurrentSection(prev => prev + 1)
      // Reset refs array for new section
      questionsRef.current = []
      // Scroll to top of new section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (Object.keys(answers).length === QUIZ_QUESTIONS.length) {
      const result = calculateQuizResult(answers)
      setQuizResult(result)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1)
      questionsRef.current = []
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setQuizResult(null)
    setCurrentSection(1)
    questionsRef.current = []
  }

  // Calculate section scores for the pentagon graph
  const calculateSectionScores = () => {
    const sectionScores = {
      workLife: 0,
      emotional: 0,
      physical: 0,
      support: 0,
      career: 0
    }

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId))
      const option = question?.options.find(o => o.id === answerId)
      const score = option?.score || 0

      switch (question?.section) {
        case 1:
          sectionScores.workLife += score
          break
        case 2:
          sectionScores.emotional += score
          break
        case 3:
          sectionScores.physical += score
          break
        case 4:
          sectionScores.support += score
          break
        case 5:
          sectionScores.career += score
          break
      }
    })

    // Convert to percentages
    return {
      workLife: (sectionScores.workLife / 16) * 100,
      emotional: (sectionScores.emotional / 12) * 100,
      physical: (sectionScores.physical / 12) * 100,
      support: (sectionScores.support / 12) * 100,
      career: (sectionScores.career / 8) * 100
    }
  }

  if (quizResult) {
    const sectionScores = calculateSectionScores()
    
    return (
      <div className="container mx-auto px-4 py-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Mental Wellness Assessment</h2>
            
            <div className="mb-6">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                  {quizResult.score} / 60
                </span>
              </div>
              
              <div className="aspect-square w-full max-w-md mx-auto mb-8">
                <PentagonGraph
                  scores={{
                    "Work-Life": sectionScores.workLife,
                    "Emotional": sectionScores.emotional,
                    "Physical": sectionScores.physical,
                    "Support": sectionScores.support,
                    "Career": sectionScores.career
                  }}
                />
              </div>
              
              <p className="text-center text-lg mb-6">{quizResult.message}</p>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Recommendations:</h3>
                <ul className="space-y-2">
                  {quizResult.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-primary">•</span>
                      <span>{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Your mental health matters. Small steps can lead to big changes—take care of yourself every day!
              </p>
              <Button onClick={handleRestart}>Take Quiz Again</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{currentSectionData?.title}</h2>
              <p className="text-muted-foreground">{currentSectionData?.description}</p>
            </div>

            <div className="space-y-6">
              {currentQuestions.map((question, index) => (
                <motion.div
                  ref={el => questionsRef.current[index] = el}
                  key={question.id}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-medium">{question.text}</p>
                  <div className="grid gap-2">
                    {question.options.map((option) => (
                      <Button
                        key={option.id}
                        variant={answers[question.id] === option.id ? "default" : "outline"}
                        className="justify-start h-auto py-3 px-4 transition-all duration-200 hover:scale-[1.02]"
                        onClick={() => handleAnswer(question.id, option.id)}
                      >
                        <span className="mr-2">{option.id.toUpperCase()}.</span>
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 1}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
              >
                {currentSection === 5 ? "View Results" : "Next"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}




