"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUserData } from "@/hooks/use-user-data"
import { Checkbox } from "@/components/ui/checkbox"

export function OnboardingFlow() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const totalSteps = 5
  const { userData, updateUserData, isLoaded } = useUserData()

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    injuries: [] as string[],
    fitnessGoals: [] as string[],
    fitnessLevel: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    availableEquipment: [] as string[],
    daysPerWeek: "3",
  })

  // Initialize form data from userData once loaded
  useEffect(() => {
    if (isLoaded) {
      setFormData({
        name: userData.name || "",
        age: userData.age ? String(userData.age) : "",
        injuries: userData.injuries || [],
        fitnessGoals: userData.fitnessGoals || [],
        fitnessLevel: userData.fitnessLevel || "Beginner",
        availableEquipment: userData.availableEquipment || [],
        daysPerWeek: userData.daysPerWeek ? String(userData.daysPerWeek) : "3",
      })
    }
  }, [isLoaded, userData])

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save all data to localStorage before navigating
      updateUserData({
        name: formData.name,
        age: Number.parseInt(formData.age) || 30,
        injuries: formData.injuries,
        fitnessGoals: formData.fitnessGoals,
        fitnessLevel: formData.fitnessLevel,
        availableEquipment: formData.availableEquipment,
        daysPerWeek: Number.parseInt(formData.daysPerWeek) || 3,
      })
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleInjuryChange = (injury: string) => {
    setFormData((prev) => {
      const updatedInjuries = prev.injuries.includes(injury)
        ? prev.injuries.filter((i) => i !== injury)
        : [...prev.injuries, injury]
      return { ...prev, injuries: updatedInjuries }
    })
  }

  const handleGoalChange = (goal: string) => {
    setFormData((prev) => {
      const updatedGoals = prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter((g) => g !== goal)
        : [...prev.fitnessGoals, goal]
      return { ...prev, fitnessGoals: updatedGoals }
    })
  }

  const handleEquipmentChange = (equipment: string) => {
    setFormData((prev) => {
      const updatedEquipment = prev.availableEquipment.includes(equipment)
        ? prev.availableEquipment.filter((e) => e !== equipment)
        : [...prev.availableEquipment, equipment]
      return { ...prev, availableEquipment: updatedEquipment }
    })
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== "" && formData.age !== ""
      case 2:
        return formData.fitnessLevel !== ""
      case 3:
        return formData.injuries.length > 0
      case 4:
        return formData.fitnessGoals.length > 0
      case 5:
        return formData.availableEquipment.length > 0 && formData.daysPerWeek !== ""
      default:
        return true
    }
  }

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-teal-600">Welcome to AdaptFit</CardTitle>
        <div className="flex justify-center mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 w-16 mx-1 rounded-full ${i + 1 <= step ? "bg-teal-500" : "bg-gray-200"}`} />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tell us about yourself</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your fitness level</h2>
            <RadioGroup
              value={formData.fitnessLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, fitnessLevel: value as "Beginner" | "Intermediate" | "Advanced" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Current injuries or limitations</h2>
            <div className="space-y-2">
              <Label>Select any current injuries</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "Sprained ankle",
                  "Knee pain",
                  "Lower back pain",
                  "Shoulder injury",
                  "Wrist pain",
                  "Hip pain",
                  "Neck strain",
                  "Elbow pain",
                ].map((injury) => (
                  <div key={injury} className="flex items-center space-x-2">
                    <Checkbox
                      id={`injury-${injury}`}
                      checked={formData.injuries.includes(injury)}
                      onCheckedChange={() => handleInjuryChange(injury)}
                    />
                    <Label htmlFor={`injury-${injury}`}>{injury}</Label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Label htmlFor="other-injury">Other injuries</Label>
                <Textarea
                  id="other-injury"
                  placeholder="Describe any other injuries or limitations"
                  className="mt-1"
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      const otherInjuries = e.target.value.split(",").map((i) => i.trim())
                      const existingCommonInjuries = formData.injuries.filter((i) =>
                        [
                          "Sprained ankle",
                          "Knee pain",
                          "Lower back pain",
                          "Shoulder injury",
                          "Wrist pain",
                          "Hip pain",
                          "Neck strain",
                          "Elbow pain",
                        ].includes(i),
                      )
                      setFormData({ ...formData, injuries: [...existingCommonInjuries, ...otherInjuries] })
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your fitness goals</h2>
            <div className="space-y-2">
              <Label>Select your fitness goals</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "Build strength",
                  "Lose weight",
                  "Improve endurance",
                  "Increase flexibility",
                  "Maintain fitness",
                  "Rehabilitation",
                  "Sports performance",
                  "General health",
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={`goal-${goal}`}
                      checked={formData.fitnessGoals.includes(goal)}
                      onCheckedChange={() => handleGoalChange(goal)}
                    />
                    <Label htmlFor={`goal-${goal}`}>{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Equipment & Availability</h2>
            <div className="space-y-2">
              <Label>Available equipment</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "Dumbbells",
                  "Resistance bands",
                  "Kettlebells",
                  "Barbell",
                  "Pull-up bar",
                  "Bench",
                  "Gym access",
                  "No equipment",
                ].map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${equipment}`}
                      checked={formData.availableEquipment.includes(equipment)}
                      onCheckedChange={() => handleEquipmentChange(equipment)}
                    />
                    <Label htmlFor={`equipment-${equipment}`}>{equipment}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="days-per-week">Days per week available to workout</Label>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={formData.daysPerWeek === String(day) ? "default" : "outline"}
                    className={formData.daysPerWeek === String(day) ? "bg-teal-600" : ""}
                    onClick={() => setFormData({ ...formData, daysPerWeek: String(day) })}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1} className="w-24">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="w-24 bg-teal-600 hover:bg-teal-700" disabled={!isStepValid()}>
          {step === totalSteps ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
