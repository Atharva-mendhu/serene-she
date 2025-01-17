import { ChatInterface } from "./components/chat-interface"

export default function AISupportPage() {
  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Support Chat</h1>
          <p className="text-muted-foreground">
            Chat with our empathetic AI assistant for support and guidance. Everything you share is confidential.
          </p>
        </div>
        
        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}

