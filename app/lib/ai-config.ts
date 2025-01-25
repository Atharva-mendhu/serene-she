export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

export const INITIAL_MESSAGE: Message = {
  id: "welcome",
  content: "Hi! I'm Serena, your mental wellness AI companion. How are you feeling today?",
  role: "assistant",
  timestamp: new Date().toISOString()
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
