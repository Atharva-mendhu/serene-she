"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/app/components/page-transition";
import { MessageCircle, Bot, Sparkles, X } from "lucide-react";
import { ChatInterface } from "./components/chat-interface";

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export default function AiSupportPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <PageTransition>
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Chat with Serena</h1>
                <p className="text-muted-foreground">Your AI wellness companion is here to help</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl border bg-card shadow-sm"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 w-fit rounded-full">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Start a Conversation</h2>
                  <p className="text-muted-foreground">
                    Share your thoughts and feelings with Serena in a safe, judgment-free space.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 mt-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => setShowChat(true)}
                  >
                    Begin Chat
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl border bg-card shadow-sm"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 w-fit rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">AI-Powered Support</h2>
          <p className="text-muted-foreground">
                    Get personalized guidance, emotional support, and practical advice tailored to your needs.
                  </p>
                  <ul className="space-y-2">
                    {["Mental wellness check-ins", "Career guidance", "Personal growth support"].map(
                      (feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center space-x-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-lg bg-muted/50"
            >
              <p className="text-sm text-muted-foreground text-center">
                Your conversations are private and secure. Serena is here to support, not to judge.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container mx-auto px-4 h-[calc(100vh-8rem)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bot className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Chat with Serena</h2>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
        </div>
            <div className="h-full border rounded-lg overflow-hidden bg-card">
          <ChatInterface />
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

