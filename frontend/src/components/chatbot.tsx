"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Sahyogi, your personal health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I recommend taking your medication as prescribed by your doctor.",
        "Remember to stay hydrated and drink plenty of water throughout the day.",
        "Your vital signs look good based on your recent readings.",
        "Would you like me to set a reminder for your upcoming doctor's appointment?",
        "Is there anything specific about your health you'd like to discuss today?",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <Card className="card-hover h-full flex flex-col overflow-hidden" id="dr-sahyogi">
      <div className="card-header-secondary">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Dr. Sahyogi
          </div>
        </CardTitle>
        <p className="text-sm mt-1 text-white/80">Your personal health assistant</p>
      </div>
      <CardContent className="flex flex-1 flex-col p-0">
      <ScrollArea className="h-[400px] overflow-y-auto p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-primary to-primary/80 text-white"
                    : "bg-gradient-to-r from-secondary to-secondary/80 text-white"
                }`}
              >
                {message.sender === "bot" && <Bot className="mt-1 h-5 w-5" />}
                <div className="flex-1">
                  <p>{message.text}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && <User className="mt-1 h-5 w-5" />}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="border-t border-border p-3 bg-muted">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend()
                }
              }}
              className="text-base border-border focus-visible:ring-secondary bg-card"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-10 w-10 rounded-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

