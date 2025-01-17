import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  // Function to format message with line breaks
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  // Check if message contains crisis hotline information
  const isCrisisMessage = message.includes("National Crisis Hotline")

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <Avatar>
        {isUser ? (
          <>
            <AvatarImage src="/avatars/user.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/avatars/ai.png" alt="AI Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[85%] text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : isCrisisMessage
            ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
            : "bg-muted"
        )}
      >
        {formatMessage(message)}
      </div>
    </div>
  )
} 