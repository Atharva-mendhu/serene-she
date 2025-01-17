"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { useChat } from "./use-chat"
import { addPoints } from "@/lib/points-system"

const INITIAL_MESSAGE = {
  content: "Hi! I'm Serena, your mental wellness AI companion. I'm here to listen and support you. How are you feeling today?",
  role: "assistant"
}

export function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat({
    initialMessage: INITIAL_MESSAGE
  })
  const [input, setInput] = useState("")

  // Load points from localStorage
  const loadPoints = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_points')
      return saved ? JSON.parse(saved) : null
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    
    // Add points for chatting with Serena
    const currentPoints = loadPoints()
    if (currentPoints) {
      const updatedPoints = addPoints(currentPoints, "CHAT_WITH_SERENA")
      localStorage.setItem('user_points', JSON.stringify(updatedPoints))
    }

    await sendMessage(userMessage)
  }

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg shadow-sm">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.role === "user"}
            />
          ))}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t flex items-center gap-4"
      >
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
} 