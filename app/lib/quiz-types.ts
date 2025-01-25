export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
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
    id: "1",
    question: "How often do you feel overwhelmed by your work responsibilities?",
    options: ["Almost always", "Often", "Sometimes", "Rarely"],
    correctAnswer: 1
  },
  {
    id: "2",
    question: "Do you feel you have adequate time to relax or engage in activities you enjoy?",
    options: ["Never", "Rarely", "Occasionally", "Frequently"],
    correctAnswer: 3
  },
  {
    id: "3",
    question: "How often do you feel physically or mentally exhausted at the end of the day?",
    options: ["Daily", "Most days", "Some days", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "4",
    question: "How often do you feel guilty for spending time away from work or family commitments?",
    options: ["Almost always", "Often", "Sometimes", "Rarely"],
    correctAnswer: 1
  },
  {
    id: "5",
    question: "How frequently do you feel anxious, nervous, or on edge?",
    options: ["Daily", "Several times a week", "A few times a month", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "6",
    question: "How often do you feel sad or hopeless?",
    options: ["Almost every day", "Several times a week", "Occasionally", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "7",
    question: "How often do you find it difficult to control your emotions (e.g., anger, sadness, or frustration)?",
    options: ["Daily", "Often", "Occasionally", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "8",
    question: "Do you find it hard to focus or concentrate on tasks?",
    options: ["Always", "Often", "Sometimes", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "9",
    question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle tension?",
    options: ["Daily", "Often", "Occasionally", "Rarely"],
    correctAnswer: 2
  },
  {
    id: "10",
    question: "How is your sleep quality?",
    options: ["Poor – I rarely feel rested", "Inconsistent – Some nights are good, others are not", "Fair – I feel rested most nights", "Excellent – I sleep well consistently"],
    correctAnswer: 3
  },
  {
    id: "11",
    question: "Do you have a support system (e.g., friends, family, or colleagues) you can rely on?",
    options: ["No, I feel alone", "Yes, but I rarely reach out", "Yes, and I occasionally rely on them", "Yes, and I frequently lean on them for support"],
    correctAnswer: 3
  },
  {
    id: "12",
    question: "How do you cope with stress?",
    options: ["I turn to unhealthy habits (e.g., overeating, alcohol, etc.)", "I avoid or suppress my emotions", "I try to manage stress through hobbies or self-care, but it's inconsistent", "I actively practice healthy stress management techniques"],
    correctAnswer: 4
  },
  {
    id: "13",
    question: "How often do you make time to focus on self-care or hobbies?",
    options: ["Never", "Rarely", "Occasionally", "Frequently"],
    correctAnswer: 3
  },
  {
    id: "14",
    question: "How satisfied are you with your career progress and current role?",
    options: ["Very dissatisfied", "Somewhat dissatisfied", "Neutral", "Satisfied"],
    correctAnswer: 4
  },
  {
    id: "15",
    question: "Do you feel confident in your ability to handle your responsibilities?",
    options: ["Rarely", "Sometimes", "Most of the time", "Always"],
    correctAnswer: 3
  }
]

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  completedAt: string;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
  }[];
  startedAt: string;
}

export function calculateQuizResult(answers: Record<string, number>): QuizResult {
  const score = Object.entries(answers).reduce((total, [questionId, answerId]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId)
    const option = question?.options.find(o => o === answerId.toString())
    return total + (option ? 1 : 0)
  }, 0)

  const totalQuestions = QUIZ_QUESTIONS.length
  const completedAt = new Date().toISOString()

  return {
    score,
    totalQuestions,
    answers: Object.entries(answers).map(([questionId, answerId]) => ({
      questionId,
      selectedAnswer: answerId,
      isCorrect: QUIZ_QUESTIONS.find(q => q.id === questionId)?.correctAnswer === answerId
    })),
    completedAt
  }
} 

