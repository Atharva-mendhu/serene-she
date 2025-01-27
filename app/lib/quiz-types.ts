export interface QuizQuestion {
  id: number;
  section: number;
  text: string;
  options: {
  id: string;
    text: string;
    score: number;
  }[];
}

export interface QuizSection {
  id: number;
  title: string;
  description: string;
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: 1,
    title: "Work-Life Balance",
    description: "Let's assess how well you manage your professional and personal life."
  },
  {
    id: 2,
    title: "Emotional Well-being",
    description: "Understanding your emotional state and stress management."
  },
  {
    id: 3,
    title: "Physical Health",
    description: "Evaluating your physical health habits and their impact on your well-being."
  },
  {
    id: 4,
    title: "Support Systems",
    description: "Assessing your social connections and support networks."
  },
  {
    id: 5,
    title: "Career Growth",
    description: "Exploring your professional development and satisfaction."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Work-Life Balance Section
  {
    id: 1,
    section: 1,
    text: "How often do you work beyond your regular hours?",
    options: [
      { id: "a", text: "Almost every day", score: 1 },
      { id: "b", text: "2-3 times a week", score: 2 },
      { id: "c", text: "Rarely", score: 3 },
      { id: "d", text: "Never", score: 4 }
    ]
  },
  {
    id: 2,
    section: 1,
    text: "Do you feel you have enough time for personal activities?",
    options: [
      { id: "a", text: "Never enough time", score: 1 },
      { id: "b", text: "Occasionally have time", score: 2 },
      { id: "c", text: "Usually have time", score: 3 },
      { id: "d", text: "Always make time", score: 4 }
    ]
  },
  {
    id: 3,
    section: 1,
    text: "How often do you think about work during personal time?",
    options: [
      { id: "a", text: "Constantly", score: 1 },
      { id: "b", text: "Often", score: 2 },
      { id: "c", text: "Sometimes", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ]
  },
  {
    id: 4,
    section: 1,
    text: "How satisfied are you with your work-life balance?",
    options: [
      { id: "a", text: "Very dissatisfied", score: 1 },
      { id: "b", text: "Somewhat dissatisfied", score: 2 },
      { id: "c", text: "Somewhat satisfied", score: 3 },
      { id: "d", text: "Very satisfied", score: 4 }
    ]
  },

  // Emotional Well-being Section
  {
    id: 5,
    section: 2,
    text: "How often do you feel overwhelmed by work-related stress?",
    options: [
      { id: "a", text: "Daily", score: 1 },
      { id: "b", text: "Several times a week", score: 2 },
      { id: "c", text: "Occasionally", score: 3 },
      { id: "d", text: "Rarely", score: 4 }
    ]
  },
  {
    id: 6,
    section: 2,
    text: "How would you rate your ability to manage stress?",
    options: [
      { id: "a", text: "Poor", score: 1 },
      { id: "b", text: "Fair", score: 2 },
      { id: "c", text: "Good", score: 3 },
      { id: "d", text: "Excellent", score: 4 }
    ]
  },
  {
    id: 7,
    section: 2,
    text: "How often do you practice self-care or relaxation techniques?",
    options: [
      { id: "a", text: "Never", score: 1 },
      { id: "b", text: "Rarely", score: 2 },
      { id: "c", text: "Sometimes", score: 3 },
      { id: "d", text: "Regularly", score: 4 }
    ]
  },

  // Physical Health Section
  {
    id: 8,
    section: 3,
    text: "How would you rate your sleep quality?",
    options: [
      { id: "a", text: "Poor", score: 1 },
      { id: "b", text: "Fair", score: 2 },
      { id: "c", text: "Good", score: 3 },
      { id: "d", text: "Excellent", score: 4 }
    ]
  },
  {
    id: 9,
    section: 3,
    text: "How often do you exercise or engage in physical activity?",
    options: [
      { id: "a", text: "Never", score: 1 },
      { id: "b", text: "1-2 times a week", score: 2 },
      { id: "c", text: "3-4 times a week", score: 3 },
      { id: "d", text: "5+ times a week", score: 4 }
    ]
  },
  {
    id: 10,
    section: 3,
    text: "How would you rate your overall energy levels?",
    options: [
      { id: "a", text: "Very low", score: 1 },
      { id: "b", text: "Low", score: 2 },
      { id: "c", text: "Moderate", score: 3 },
      { id: "d", text: "High", score: 4 }
    ]
  },

  // Support Systems Section
  {
    id: 11,
    section: 4,
    text: "How comfortable are you discussing work challenges with colleagues?",
    options: [
      { id: "a", text: "Very uncomfortable", score: 1 },
      { id: "b", text: "Somewhat uncomfortable", score: 2 },
      { id: "c", text: "Somewhat comfortable", score: 3 },
      { id: "d", text: "Very comfortable", score: 4 }
    ]
  },
  {
    id: 12,
    section: 4,
    text: "Do you feel supported by your workplace management?",
    options: [
      { id: "a", text: "Not at all", score: 1 },
      { id: "b", text: "Slightly", score: 2 },
      { id: "c", text: "Moderately", score: 3 },
      { id: "d", text: "Very much", score: 4 }
    ]
  },
  {
    id: 13,
    section: 4,
    text: "How often do you connect with supportive friends or family?",
    options: [
      { id: "a", text: "Rarely", score: 1 },
      { id: "b", text: "Monthly", score: 2 },
      { id: "c", text: "Weekly", score: 3 },
      { id: "d", text: "Daily", score: 4 }
    ]
  },

  // Career Growth Section
  {
    id: 14,
    section: 5,
    text: "How satisfied are you with your current career progression?",
    options: [
      { id: "a", text: "Very dissatisfied", score: 1 },
      { id: "b", text: "Somewhat dissatisfied", score: 2 },
      { id: "c", text: "Somewhat satisfied", score: 3 },
      { id: "d", text: "Very satisfied", score: 4 }
    ]
  },
  {
    id: 15,
    section: 5,
    text: "Do you feel your work is meaningful and purposeful?",
    options: [
      { id: "a", text: "Not at all", score: 1 },
      { id: "b", text: "Somewhat", score: 2 },
      { id: "c", text: "Mostly", score: 3 },
      { id: "d", text: "Definitely", score: 4 }
    ]
  }
];

export interface QuizResult {
  score: number;
  message: string;
  recommendations: string[];
}

export function calculateQuizResult(answers: Record<number, string>): QuizResult {
  // Calculate total score
  let totalScore = 0;
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId));
    const option = question?.options.find(o => o.id === answerId);
    if (option) {
      totalScore += option.score;
    }
  });

  // Generate result message and recommendations
  if (totalScore >= 50) {
    return {
      score: totalScore,
      message: "Excellent! You're maintaining a healthy work-life balance and managing stress effectively.",
      recommendations: [
        "Continue your current wellness practices",
        "Share your successful strategies with colleagues",
        "Consider mentoring others in workplace wellness"
      ]
    };
  } else if (totalScore >= 40) {
    return {
      score: totalScore,
      message: "Good job! You're on the right track with your wellness journey.",
      recommendations: [
        "Identify areas where you can make small improvements",
        "Set specific wellness goals for the next month",
        "Try incorporating new stress management techniques"
      ]
    };
  } else if (totalScore >= 30) {
    return {
      score: totalScore,
      message: "You're making efforts, but there's room for improvement in your wellness routine.",
      recommendations: [
        "Focus on establishing better work-life boundaries",
        "Consider speaking with a wellness coach or counselor",
        "Start a daily self-care practice"
      ]
    };
  } else {
  return {
      score: totalScore,
      message: "Your well-being might need more attention. It's time to prioritize your health.",
      recommendations: [
        "Reach out to your HR department or supervisor for support",
        "Schedule a consultation with a mental health professional",
        "Begin with small, manageable changes to your daily routine",
        "Consider taking some time off to recharge"
      ]
    };
  }
} 

