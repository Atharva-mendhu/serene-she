"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addActivityPoints } from "@/lib/points-system"
import { CoinsNotification } from "@/components/coins-notification"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DeskYogaProps {
  onComplete: () => void
}

const YOGA_POSES = [
  {
    id: "neck",
    name: "Neck Stretches",
    description: "Gently stretch and release tension in your neck",
    steps: [
      "Sit up straight with your shoulders relaxed",
      "Slowly tilt your head to the right, bringing your ear toward your shoulder",
      "Hold for 15-30 seconds",
      "Return to center and repeat on the left side",
      "Gently roll your head in clockwise circles, then counter-clockwise",
    ],
    duration: 60,
    benefits: ["Reduces neck tension", "Improves flexibility", "Relieves headaches"],
  },
  {
    id: "shoulders",
    name: "Shoulder Rolls",
    description: "Release tension from your shoulders and upper back",
    steps: [
      "Sit tall with your feet flat on the ground",
      "Roll your shoulders forward 5 times in large circles",
      "Roll your shoulders backward 5 times",
      "Squeeze your shoulders up to your ears, hold, then release",
      "Repeat the sequence 3 times",
    ],
    duration: 45,
    benefits: ["Improves posture", "Reduces shoulder stiffness", "Releases upper body tension"],
  },
  {
    id: "wrists",
    name: "Wrist and Finger Stretches",
    description: "Prevent carpal tunnel and relieve typing strain",
    steps: [
      "Extend your arms forward with palms facing down",
      "Gently bend your wrists up and down",
      "Make fists and rotate your wrists in circles",
      "Spread your fingers wide, then make fists",
      "Massage each finger gently",
    ],
    duration: 30,
    benefits: ["Prevents repetitive strain injury", "Improves circulation", "Reduces wrist pain"],
  },
  {
    id: "twist",
    name: "Seated Spinal Twist",
    description: "Increase spine mobility and reduce back tension",
    steps: [
      "Sit sideways in your chair",
      "Place both feet flat on the ground",
      "Twist your torso toward the back of the chair",
      "Hold the twist for 15-30 seconds",
      "Return to center and repeat on the other side",
    ],
    duration: 60,
    benefits: ["Improves spine flexibility", "Aids digestion", "Reduces back pain"],
  },
  {
    id: "eyes",
    name: "Eye Exercises",
    description: "Reduce eye strain from screen time",
    steps: [
      "Rub your palms together to warm them",
      "Cup your palms over your closed eyes",
      "Hold for 30 seconds, breathing deeply",
      "Look at a distant object for 20 seconds",
      "Repeat every 20 minutes of screen time",
    ],
    duration: 40,
    benefits: ["Reduces eye fatigue", "Improves focus", "Prevents dry eyes"],
  },
]

export function DeskYoga({ onComplete }: DeskYogaProps) {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(YOGA_POSES[0].duration)
  const [showCoinsNotification, setShowCoinsNotification] = useState(false)

  const currentPose = YOGA_POSES[currentPoseIndex]
  const totalPoses = YOGA_POSES.length
  const totalSteps = currentPose.steps.length

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else if (currentPoseIndex < totalPoses - 1) {
      setCurrentPoseIndex(currentPoseIndex + 1)
      setCurrentStepIndex(0)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    } else if (currentPoseIndex > 0) {
      setCurrentPoseIndex(currentPoseIndex - 1)
      setCurrentStepIndex(YOGA_POSES[currentPoseIndex - 1].steps.length - 1)
    }
  }

  const handleComplete = () => {
    const storedPoints = localStorage.getItem("userPoints")
    if (storedPoints) {
      const userPoints = JSON.parse(storedPoints)
      const { updatedPoints, coinsEarned } = addActivityPoints(userPoints, "DESK_YOGA")
      localStorage.setItem("userPoints", JSON.stringify(updatedPoints))
      setShowCoinsNotification(true)
    }
    onComplete?.()
  }

  return (
    <div className="relative">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <motion.div
              key={`${currentPose.id}-${currentStepIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">{currentPose.name}</h2>
              <p className="text-muted-foreground mb-6">{currentPose.description}</p>
              
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-lg font-medium mb-2">Step {currentStepIndex + 1} of {totalSteps}</p>
                <p>{currentPose.steps[currentStepIndex]}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {currentPose.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentPoseIndex === 0 && currentStepIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-sm text-muted-foreground">
                Pose {currentPoseIndex + 1} of {totalPoses}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <CoinsNotification
        amount={5}
        isVisible={showCoinsNotification}
        onHide={() => setShowCoinsNotification(false)}
      />
    </div>
  )
} 

