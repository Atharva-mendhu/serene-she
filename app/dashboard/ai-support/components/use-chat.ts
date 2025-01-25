"use client"

import { useState } from "react"

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Namaste! 🙏 I'm Serena, your wellness companion. I blend modern guidance with the timeless wisdom of Indian traditions. How may I support you today? ✨",
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])

  const addMessage = (content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([INITIAL_MESSAGE])
  }

  return {
    messages,
    addMessage,
    clearMessages,
  }
} 
