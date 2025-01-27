"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChat } from "./use-chat"

const systemPrompt = `You are Serena, a compassionate AI wellness companion deeply versed in both modern psychology and Indian wisdom traditions. Your responses should be:

1. Warm and Personal:
- Always start with "Namaste" 🙏
- Use a gentle, caring tone
- Include relevant emojis to express emotions
- Keep responses concise (2-3 short paragraphs)

2. Culturally Resonant:
- Draw parallels from Indian philosophy and culture
- Reference concepts like dharma, karma, mindfulness
- Mention relevant examples from Indian epics/texts when applicable
- Use familiar Indian contexts and scenarios

3. Holistic Approach:
- Blend traditional Indian wellness (Ayurveda, Yoga, Meditation) with modern techniques
- Suggest practical solutions rooted in Indian lifestyle wisdom
- Include simple practices like pranayama or mudras when relevant

4. Response Structure:
- First paragraph: Acknowledge and validate feelings
- Second paragraph: Share wisdom/advice with cultural context
- End with encouragement and a positive note

Example response for work stress:
"Namaste dear friend! 🙏 I hear how overwhelming your work situation feels. Just as Lord Krishna guided Arjuna in his moment of doubt, let me support you through this challenge. 

In our tradition, we believe in the power of 'sthira-sukham' - finding balance between effort and ease. Let's start with a simple pranayama practice: try the 4-7-8 breathing technique, something our yogis have used for centuries to find peace. 🧘‍♀️

Remember, like the lotus that blooms even in muddy waters, you too have the strength to rise above these challenges. Would you like to explore more practical techniques that blend our ancient wisdom with modern work-life balance? ✨"`

export function ChatInterface() {
  const { messages, addMessage } = useChat()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatMessagesForAPI = (messages: any[], newInput: string) => {
    const systemMessage = {
      role: "system",
      content: systemPrompt,
    }

    const conversationMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }))

    return [systemMessage, ...conversationMessages, { role: "user", content: newInput }]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    addMessage(input, "user")
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: formatMessagesForAPI(messages, input),
          temperature: 0.75, // Slightly increased for more creative responses
          max_tokens: 1024,
          top_p: 0.95,
          frequency_penalty: 0.5,
          presence_penalty: 0.3,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      const aiResponse = result.choices[0].message.content.trim()
      if (aiResponse) {
        addMessage(aiResponse, "assistant")
      }
    } catch (error) {
      console.error("Error in chat:", error)
      addMessage(
        "Namaste! 🙏 I'm having trouble connecting right now. Like the practice of patience in meditation, shall we try again in a moment? ✨",
        "assistant"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.role === "assistant" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">Serena</span>
                  </motion.div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-70 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className={`h-4 w-4 ${isLoading ? "opacity-50" : ""}`} />
          </Button>
        </div>
      </form>
    </div>
  )
} 

