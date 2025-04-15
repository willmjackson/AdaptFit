"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserData } from "@/hooks/use-user-data"
import { Loader2, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { adaptWorkoutPlan } from "@/lib/adapt-workout-plan"

type WorkoutPlan = {
  user_profile: {
    age: number
    injuries: string[]
    fitness_goals: string[]
    fitness_level: string
    available_equipment: string[]
  }
  workout_plan: {
    name: string
    duration_weeks: number
    weekly_schedule: {
      day: string
      focus: string
      exercises: {
        name: string
        sets: number
        reps: string
        rest_seconds: number
        injury_adaptations: string
        alternative_exercises: string[]
        notes: string
      }[]
      warm_up: string[]
      cool_down: string[]
    }[]
    progression_strategy: {
      week_1: string
      week_2: string
      week_3: string
      week_4: string
    }
  }
  recovery_protocols: {
    daily_recommendations: string[]
    injury_specific_protocols: {
      injury: string
      rehabilitation_exercises: string[]
      avoid: string[]
      recovery_timeline: string
    }[]
  }
  nutrition_guidance: {
    general_recommendations: string[]
    injury_recovery_support: string[]
  }
  weekly_adaptation_strategy: string
}

// Enhanced validation function with detailed logging
function isValidWorkoutPlan(data: any): data is WorkoutPlan {
  console.log("Validating workout plan data:", data)

  if (!data || typeof data !== "object") {
    console.error("Data is not an object:", data)
    return false
  }

  // Check workout_plan
  if (!data.workout_plan) {
    console.error("Missing workout_plan")
    return false
  }

  console.log("workout_plan keys:", Object.keys(data.workout_plan))

  // Check weekly_schedule
  if (!data.workout_plan.weekly_schedule) {
    console.error("Missing workout_plan.weekly_schedule")
    return false
  }

  if (!Array.isArray(data.workout_plan.weekly_schedule)) {
    console.error("workout_plan.weekly_schedule is not an array:", data.workout_plan.weekly_schedule)
    return false
  }

  console.log("weekly_schedule length:", data.workout_plan.weekly_schedule.length)

  // Check recovery_protocols
  if (!data.recovery_protocols) {
    console.error("Missing recovery_protocols")
    return false
  }

  console.log("recovery_protocols keys:", Object.keys(data.recovery_protocols))

  // Check nutrition_guidance
  if (!data.nutrition_guidance) {
    console.error("Missing nutrition_guidance")
    return false
  }

  console.log("nutrition_guidance keys:", Object.keys(data.nutrition_guidance))

  return true
}

export function WorkoutPlanGenerator() {
  const { userData } = useUserData()
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeWeek, setActiveWeek] = useState<string>("week_1")
  const [rawApiResponse, setRawApiResponse] = useState<any>(null)

  const generateWorkoutPlan = async () => {
    setIsLoading(true)
    setError(null)
    setRawApiResponse(null)

    try {
      console.log("Generating workout plan with user data:", userData)

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const responseData = await response.json()
      console.log("API response received:", responseData)
      setRawApiResponse(responseData)

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to generate workout plan")
      }

      // Try to adapt the response to our expected structure
      const adaptedData = adaptWorkoutPlan(responseData)

      // Validate that we received a proper workout plan
      if (!isValidWorkoutPlan(adaptedData)) {
        console.error("Invalid workout plan structure:", adaptedData)
        throw new Error("Received invalid workout plan data")
      }

      setWorkoutPlan(adaptedData)

      // Save the workout plan to localStorage
      localStorage.setItem("adaptfit_workout_plan", JSON.stringify(adaptedData))
    } catch (error) {
      console.error("Error generating workout plan:", error)
      setError(error instanceof Error ? error.message : "Failed to generate workout plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Load saved workout plan from localStorage on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem("adaptfit_workout_plan")
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan)
        console.log("Loaded saved workout plan:", parsedPlan)

        // Try to adapt the saved plan to our expected structure
        const adaptedPlan = adaptWorkoutPlan(parsedPlan)

        if (isValidWorkoutPlan(adaptedPlan)) {
          setWorkoutPlan(adaptedPlan)
        } else {
          console.error("Saved workout plan is invalid")
          localStorage.removeItem("adaptfit_workout_plan")
        }
      } catch (error) {
        console.error("Failed to parse saved workout plan:", error)
        localStorage.removeItem("adaptfit_workout_plan")
      }
    }
  }, [])

  if (!userData.name) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p>Please complete your profile to generate a workout plan.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {!workoutPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Generate Your Adaptive Workout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Your Profile</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{userData.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fitness Level:</span>
                    <span>{userData.fitnessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days per Week:</span>
                    <span>{userData.daysPerWeek}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Injuries</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.injuries.map((injury) => (
                    <Badge key={injury} variant="outline">
                      {injury}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Fitness Goals</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.fitnessGoals.map((goal) => (
                    <Badge key={goal} variant="outline">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Available Equipment</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.availableEquipment.map((equipment) => (
                    <Badge key={equipment} variant="outline">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={generateWorkoutPlan} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your plan...
                </>
              ) : (
                <>Generate Adaptive Workout Plan</>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {error && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-2">Check the browser console for more details.</p>
          </div>

          {rawApiResponse && (
            <Card>
              <CardHeader>
                <CardTitle>Raw API Response (Debug)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                  <pre className="text-xs">{JSON.stringify(rawApiResponse, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {workoutPlan && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{workoutPlan.workout_plan.name}</h2>
            <Button variant="outline" size="sm" onClick={generateWorkoutPlan} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          </div>

          <Tabs defaultValue="schedule">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="progression">Progression</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="flex space-x-2">
                      {["week_1", "week_2", "week_3", "week_4"].map((week, index) => (
                        <Button
                          key={week}
                          variant={activeWeek === week ? "default" : "outline"}
                          size="sm"
                          className={activeWeek === week ? "bg-teal-600" : ""}
                          onClick={() => setActiveWeek(week)}
                        >
                          Week {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workoutPlan.workout_plan.weekly_schedule.map((day, index) => (
                      <Accordion type="single" collapsible key={index}>
                        <AccordionItem value={`day-${index}`}>
                          <AccordionTrigger>
                            <div className="flex justify-between items-center w-full pr-4">
                              <div className="font-medium">{day.day}</div>
                              <Badge>{day.focus}</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              {day.warm_up && day.warm_up.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm text-teal-600">Warm-up</h4>
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {day.warm_up.map((exercise, i) => (
                                      <li key={i} className="text-sm">
                                        {typeof exercise === "string" ? exercise : JSON.stringify(exercise)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div>
                                <h4 className="font-medium text-sm text-teal-600">Exercises</h4>
                                <div className="space-y-3 mt-2">
                                  {day.exercises &&
                                    day.exercises.map((exercise, i) => (
                                      <div key={i} className="border rounded-md p-3">
                                        <div className="flex justify-between items-start">
                                          <h5 className="font-medium">{exercise.name}</h5>
                                          <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                            {exercise.sets} sets × {exercise.reps}
                                          </div>
                                        </div>
                                        {exercise.injury_adaptations && (
                                          <div className="mt-2">
                                            <span className="text-xs font-medium text-amber-600">Adaptation:</span>
                                            <p className="text-sm">{exercise.injury_adaptations}</p>
                                          </div>
                                        )}
                                        {exercise.notes && (
                                          <div className="mt-1 text-sm text-muted-foreground">{exercise.notes}</div>
                                        )}
                                        {exercise.alternative_exercises &&
                                          exercise.alternative_exercises.length > 0 && (
                                            <div className="mt-2">
                                              <span className="text-xs font-medium text-teal-600">Alternatives:</span>
                                              <ul className="list-disc pl-5 mt-1">
                                                {exercise.alternative_exercises.map((alt, j) => (
                                                  <li key={j} className="text-sm">
                                                    {typeof alt === "string" ? alt : JSON.stringify(alt)}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Rest: {exercise.rest_seconds} seconds
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {day.cool_down && day.cool_down.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm text-teal-600">Cool-down</h4>
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {day.cool_down.map((exercise, i) => (
                                      <li key={i} className="text-sm">
                                        {typeof exercise === "string" ? exercise : JSON.stringify(exercise)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progression" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>4-Week Progression Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Week 1</h4>
                      <p className="mt-1 text-sm">{workoutPlan.workout_plan.progression_strategy.week_1}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 2</h4>
                      <p className="mt-1 text-sm">{workoutPlan.workout_plan.progression_strategy.week_2}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 3</h4>
                      <p className="mt-1 text-sm">{workoutPlan.workout_plan.progression_strategy.week_3}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 4</h4>
                      <p className="mt-1 text-sm">{workoutPlan.workout_plan.progression_strategy.week_4}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Adaptation Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{workoutPlan.weekly_adaptation_strategy}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recovery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Recovery Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {workoutPlan.recovery_protocols.daily_recommendations &&
                      workoutPlan.recovery_protocols.daily_recommendations.map((rec, i) => (
                        <li key={i}>{typeof rec === "string" ? rec : JSON.stringify(rec)}</li>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              {workoutPlan.recovery_protocols.injury_specific_protocols &&
                workoutPlan.recovery_protocols.injury_specific_protocols.map((protocol, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Recovery Protocol: {protocol.injury}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium">Rehabilitation Exercises</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {protocol.rehabilitation_exercises &&
                            protocol.rehabilitation_exercises.map((exercise, i) => (
                              <li key={i}>{typeof exercise === "string" ? exercise : JSON.stringify(exercise)}</li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium">Exercises to Avoid</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {protocol.avoid &&
                            protocol.avoid.map((avoid, i) => (
                              <li key={i}>{typeof avoid === "string" ? avoid : JSON.stringify(avoid)}</li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium">Recovery Timeline</h4>
                        <p className="mt-1">{protocol.recovery_timeline}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Nutrition Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {workoutPlan.nutrition_guidance.general_recommendations &&
                      workoutPlan.nutrition_guidance.general_recommendations.map((rec, i) => (
                        <li key={i}>{typeof rec === "string" ? rec : JSON.stringify(rec)}</li>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Injury Recovery Nutrition Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {workoutPlan.nutrition_guidance.injury_recovery_support &&
                      workoutPlan.nutrition_guidance.injury_recovery_support.map((rec, i) => (
                        <li key={i}>{typeof rec === "string" ? rec : JSON.stringify(rec)}</li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
