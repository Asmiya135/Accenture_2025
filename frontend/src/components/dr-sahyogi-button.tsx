"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot, X, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function DrSahyogiButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Sahyogi, your personal health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
  
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
  
    setMessages((prev) => [...prev, userMessage])
    setInput("")
  
    try {
      const response = await fetch("https://elderlycare-3sok.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })
  
      const data = await response.json()
  
      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      }
  
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
  
      setMessages((prev) => [...prev, errorMessage])
      console.error("Fetch error:", error)
    }
  }  

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary/10 hover:from-secondary/90 hover:to-secondary/70 shadow-lg z-50"
        size="icon"
      >
        <Stethoscope className="h-8 w-8" />
      </Button>

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 z-50">
          <Card className="flex flex-col h-[500px] shadow-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-6 w-6" />
                <h3 className="text-xl font-bold">Dr. Sahyogi</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 rounded-full text-white hover:bg-secondary/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-full overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white"
                        : "bg-gradient-to-r from-secondary to-secondary/80 text-white"
                    }`}
                  >
                    {message.sender === "bot" && <Bot className="mt-1 h-6 w-6" />}
                    <div className="flex-1">
                      <p className="text-lg">{message.text}</p>
                      <p className="mt-1 text-sm opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && <User className="mt-1 h-6 w-6" />}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-4 bg-muted">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend()
                    }
                  }}
                  className="text-lg border-border focus-visible:ring-secondary bg-card h-12"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

