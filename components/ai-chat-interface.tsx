"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Loader2, Mic, Plus, Send } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function AiChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AdaptFit AI coach. How can I help with your workout today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Based on your sprained ankle, I recommend focusing on upper body exercises today. How about trying seated dumbbell presses and lat pulldowns?",
        "For your ankle recovery, remember to continue with the gentle mobility exercises we discussed. The ankle alphabet exercise is particularly effective at this stage.",
        "Your recovery is progressing well! I notice you've been consistent with your adapted workouts. Would you like me to suggest some new exercises to keep things interesting?",
        "It's important to listen to your body. If you're experiencing increased pain today, let's modify your workout to focus on stretching and recovery instead.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="border-b px-4 py-3 flex items-center bg-white dark:bg-gray-950">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Coach" />
              <AvatarFallback className="bg-teal-100 text-teal-800">AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">AI Coach</h2>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-muted-foreground"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">AI Coach is typing...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-white dark:bg-gray-950">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Ask about exercises, modifications, or recovery..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 rounded-full"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full rounded-full"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                {inputValue.trim() ? <Send className="h-5 w-5 text-teal-600" /> : <Mic className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setInputValue("How can I modify squats with my ankle injury?")}
              >
                How can I modify squats with my ankle injury?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setInputValue("When can I start running again?")}
              >
                When can I start running again?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setInputValue("Recommend exercises for today")}
              >
                Recommend exercises for today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
