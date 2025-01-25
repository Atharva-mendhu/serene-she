"use client"

import { cn } from "@/lib/utils"
import { Message } from "@/lib/ai-config"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-start space-x-2 max-w-[80%]",
          isUser && "flex-row-reverse space-x-reverse"
        )}
      >
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary/10" : "bg-muted"
        )}>
          {isUser ? (
            <User className="w-5 h-5 text-primary" />
          ) : (
            <Bot className="w-5 h-5 text-primary" />
          )}
        </div>
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="text-sm">{message.content}</p>
          <time className="text-xs opacity-50">
            {new Date(message.timestamp).toLocaleTimeString()}
          </time>
        </div>
      </div>
    </div>
  )
} 

