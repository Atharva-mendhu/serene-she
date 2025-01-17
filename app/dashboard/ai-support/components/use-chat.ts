"use client"

import { useState } from "react"
import { getAIResponse } from "@/lib/ai-config"

interface Message {
  content: string
  role: "user" | "assistant"
}

interface UseChatProps {
  initialMessage: Message
}

export function useChat({ initialMessage }: UseChatProps) {
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    setIsLoading(true)
    
    // Add user message
    const userMessage: Message = { role: "user", content }
    setMessages(prev => [...prev, userMessage])

    try {
      // Get AI response using our configured model
      const response = await getAIResponse(content)
      
      const aiMessage: Message = { role: "assistant", content: response }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Failed to get AI response:", error)
      // Add a friendly error message
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Could you try rephrasing your message?"
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    sendMessage,
    isLoading,
  }
} 