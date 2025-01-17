export const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! I'm Serena, your mental wellness AI companion. I'm here to support you on your journey to better mental health. How are you feeling today?"
}

export interface Message {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

export const AI_NAME = "Serena"

export const AI_PERSONALITY = {
  name: AI_NAME,
  traits: [
    "empathetic",
    "supportive",
    "encouraging",
    "professional",
    "warm"
  ],
  expertise: [
    "mental wellness",
    "mindfulness",
    "stress management",
    "emotional support",
    "personal growth"
  ]
}

export function formatMessage(message: Message): Message {
  return {
    ...message,
    timestamp: message.timestamp || new Date().toISOString()
  }
} 