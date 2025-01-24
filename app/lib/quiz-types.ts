export interface QuizQuestion {
  id: number
  text: string
  options: {
    id: string
    text: string
    score: number
  }[]
  section: number
}

export interface QuizSection {
  id: number
  title: string
  description: string
  illustration: string
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: 1,
    title: "Stress and Work-Life Balance",
    description: "Let's explore how you manage your work responsibilities and personal time.",
    illustration: "/images/quiz/work-life-balance.svg"
  },
  {
    id: 2,
    title: "Emotional Well-being",
    description: "Understanding your emotional state and patterns.",
    illustration: "/images/quiz/emotional-wellbeing.svg"
  },
  {
    id: 3,
    title: "Cognitive and Physical Symptoms",
    description: "Assessing how stress affects your mind and body.",
    illustration: "/images/quiz/physical-symptoms.svg"
  },
  {
    id: 4,
    title: "Support and Coping Mechanisms",
    description: "Evaluating your support system and stress management strategies.",
    illustration: "/images/quiz/support-system.svg"
  },
  {
    id: 5,
    title: "Self-Perception and Career Satisfaction",
    description: "Understanding your relationship with your career and self-confidence.",
    illustration: "/images/quiz/career-satisfaction.svg"
  }
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "How often do you feel overwhelmed by your work responsibilities?",
    options: [
      { id: "a", text: "Almost always", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Sometimes", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 1
  },
  {
    id: 2,
    text: "Do you feel you have adequate time to relax or engage in activities you enjoy?",
    options: [
      { id: "a", text: "Never", score: 1 },
      { id: "b", text: "Rarely", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Frequently", score: 4 }
    ],
    section: 1
  },
  {
    id: 3,
    text: "How often do you feel physically or mentally exhausted at the end of the day?",
    options: [
      { id: "a", text: "Daily", score: 1 },
      { id: "b", text: "Most days", score: 2 },
      { id: "c", text: "Some days", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 1
  },
  {
    id: 4,
    text: "How often do you feel guilty for spending time away from work or family commitments?",
    options: [
      { id: "a", text: "Almost always", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Sometimes", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 1
  },
  {
    id: 5,
    text: "How frequently do you feel anxious, nervous, or on edge?",
    options: [
      { id: "a", text: "Daily", score: 1 },
      { id: "b", text: "Several times a week", score: 2 },
      { id: "c", text: "A few times a month", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 2
  },
  {
    id: 6,
    text: "How often do you feel sad or hopeless?",
    options: [
      { id: "a", text: "Almost every day", score: 1 },
      { id: "b", text: "Several times a week", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 2
  },
  {
    id: 7,
    text: "How often do you find it difficult to control your emotions (e.g., anger, sadness, or frustration)?",
    options: [
      { id: "a", text: "Daily", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 2
  },
  {
    id: 8,
    text: "Do you find it hard to focus or concentrate on tasks?",
    options: [
      { id: "a", text: "Always", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Sometimes", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 3
  },
  {
    id: 9,
    text: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle tension?",
    options: [
      { id: "a", text: "Daily", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ],
    section: 3
  },
  {
    id: 10,
    text: "How is your sleep quality?",
    options: [
      { id: "a", text: "Poor – I rarely feel rested", score: 1 },
      { id: "b", text: "Inconsistent – Some nights are good, others are not", score: 2 },
      { id: "c", text: "Fair – I feel rested most nights", score: 3 },
      { id: "d", text: "Excellent – I sleep well consistently", score: 4 }
    ],
    section: 3
  },
  {
    id: 11,
    text: "Do you have a support system (e.g., friends, family, or colleagues) you can rely on?",
    options: [
      { id: "a", text: "No, I feel alone", score: 1 },
      { id: "b", text: "Yes, but I rarely reach out", score: 2 },
      { id: "c", text: "Yes, and I occasionally rely on them", score: 3 },
      { id: "d", text: "Yes, and I frequently lean on them for support", score: 4 }
    ],
    section: 4
  },
  {
    id: 12,
    text: "How do you cope with stress?",
    options: [
      { id: "a", text: "I turn to unhealthy habits (e.g., overeating, alcohol, etc.)", score: 1 },
      { id: "b", text: "I avoid or suppress my emotions", score: 2 },
      { id: "c", text: "I try to manage stress through hobbies or self-care, but it's inconsistent", score: 3 },
      { id: "d", text: "I actively practice healthy stress management techniques", score: 4 }
    ],
    section: 4
  },
  {
    id: 13,
    text: "How often do you make time to focus on self-care or hobbies?",
    options: [
      { id: "a", text: "Never", score: 1 },
      { id: "b", text: "Rarely", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Frequently", score: 4 }
    ],
    section: 4
  },
  {
    id: 14,
    text: "How satisfied are you with your career progress and current role?",
    options: [
      { id: "a", text: "Very dissatisfied", score: 1 },
      { id: "b", text: "Somewhat dissatisfied", score: 2 },
      { id: "c", text: "Neutral", score: 3 },
      { id: "d", text: "Satisfied", score: 4 }
    ],
    section: 5
  },
  {
    id: 15,
    text: "Do you feel confident in your ability to handle your responsibilities?",
    options: [
      { id: "a", text: "Rarely", score: 1 },
      { id: "b", text: "Sometimes", score: 2 },
      { id: "c", text: "Most of the time", score: 3 },
      { id: "d", text: "Always", score: 4 }
    ],
    section: 5
  }
]

export interface QuizResult {
  score: number
  category: "high" | "moderate" | "low"
  message: string
  recommendations: string[]
}

export function calculateQuizResult(answers: Record<number, string>): QuizResult {
  const score = Object.entries(answers).reduce((total, [questionId, answerId]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId))
    const option = question?.options.find(o => o.id === answerId)
    return total + (option?.score || 0)
  }, 0)

  if (score <= 30) {
    return {
      score,
      category: "high",
      message: "Your responses indicate high levels of stress and possible mental health concerns.",
      recommendations: [
        "Consider consulting with a mental health professional for personalized support",
        "Establish a daily self-care routine focusing on rest and relaxation",
        "Practice stress-reduction techniques like deep breathing or meditation",
        "Set boundaries at work and communicate your needs to your support system"
      ]
    }
  } else if (score <= 45) {
    return {
      score,
      category: "moderate",
      message: "Your responses suggest moderate stress levels and emotional strain.",
      recommendations: [
        "Focus on creating better work-life boundaries",
        "Incorporate regular relaxation practices into your routine",
        "Build stronger connections with your support network",
        "Consider stress management workshops or counseling for preventive care"
      ]
    }
  } else {
    return {
      score,
      category: "low",
      message: "Your responses indicate good emotional well-being and stress management.",
      recommendations: [
        "Continue maintaining your healthy habits and self-care practices",
        "Share your successful strategies with others who might benefit",
        "Stay proactive about your mental health through regular check-ins",
        "Consider mentoring others in stress management and work-life balance"
      ]
    }
  }
} 