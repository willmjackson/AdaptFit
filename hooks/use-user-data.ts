"use client"

import { useState, useEffect } from "react"

export type UserData = {
  name: string
  age: number
  injuries: string[]
  fitnessGoals: string[]
  fitnessLevel: "Beginner" | "Intermediate" | "Advanced"
  availableEquipment: string[]
  daysPerWeek: number
}

const defaultUserData: UserData = {
  name: "",
  age: 30,
  injuries: [],
  fitnessGoals: [],
  fitnessLevel: "Beginner",
  availableEquipment: [],
  daysPerWeek: 3,
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("adaptfit_user_data")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setUserData(parsedData)
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Update user data in localStorage whenever it changes
  const updateUserData = (newData: Partial<UserData>) => {
    const updatedData = { ...userData, ...newData }
    setUserData(updatedData)
    localStorage.setItem("adaptfit_user_data", JSON.stringify(updatedData))
    return updatedData
  }

  // Check if user has completed onboarding
  const hasCompletedOnboarding = () => {
    return userData.name !== "" && userData.injuries.length > 0
  }

  // Clear user data
  const clearUserData = () => {
    localStorage.removeItem("adaptfit_user_data")
    setUserData(defaultUserData)
  }

  return {
    userData,
    updateUserData,
    hasCompletedOnboarding,
    clearUserData,
    isLoaded,
  }
}
