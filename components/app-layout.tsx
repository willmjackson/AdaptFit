"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Dumbbell, Home, MessageCircle, Search, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserData } from "@/hooks/use-user-data"
import { useRouter } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState("home")
  const { hasCompletedOnboarding, isLoaded } = useUserData()
  const router = useRouter()

  // Check if user has completed onboarding
  useEffect(() => {
    if (isLoaded && !hasCompletedOnboarding()) {
      router.push("/")
    }
  }, [isLoaded, hasCompletedOnboarding, router])

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "exercises", icon: Dumbbell, label: "Exercises" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Top header */}
      <header className="border-b px-4 py-3 flex items-center justify-between bg-white dark:bg-gray-950">
        <div className="flex items-center">
          <span className="font-bold text-xl text-teal-600">AdaptFit</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Bottom navigation */}
      <div className="border-t bg-white dark:bg-gray-950">
        <nav className="flex justify-around">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.id === "home" ? "/dashboard" : `/${tab.id}`}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs",
                activeTab === tab.id ? "text-teal-600" : "text-muted-foreground",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-5 w-5 mb-1" />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Floating AI chat button */}
      <Link href="/chat">
        <Button
          className="absolute bottom-20 right-4 rounded-full h-12 w-12 bg-teal-600 hover:bg-teal-700 shadow-lg flex items-center justify-center"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
