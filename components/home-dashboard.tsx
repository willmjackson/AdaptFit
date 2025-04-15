"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AppLayout } from "@/components/app-layout"
import { Dumbbell, MessageCircle, Plus, Target, TrendingUp } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { WorkoutPlanGenerator } from "@/components/workout-plan-generator"

export function HomeDashboard() {
  const [progress, setProgress] = useState(68)
  const { userData } = useUserData()

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Hi, {userData.name || "there"}</h1>
            <p className="text-muted-foreground">Let's adapt your workout today</p>
          </div>
          <Button size="sm" variant="outline" className="rounded-full" onClick={() => (window.location.href = "/chat")}>
            <MessageCircle className="h-4 w-4 mr-2" />
            AI Coach
          </Button>
        </div>

        {userData.injuries && userData.injuries.length > 0 && (
          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Recovery Progress</h3>
                  <p className="text-sm opacity-90">{userData.injuries[0]}</p>
                </div>
                <Badge variant="outline" className="border-white text-white">
                  Day 12 of 21
                </Badge>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="plan">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plan">Workout Plan</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-4">
            <WorkoutPlanGenerator />
          </TabsContent>

          <TabsContent value="today" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2 text-teal-600" />
                  Adapted Workout Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <WorkoutItem title="Upper Body Focus" duration="45 min" intensity="Moderate" adapted={true} />
                  <WorkoutItem title="Gentle Stretching" duration="15 min" intensity="Low" adapted={false} />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Workout
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-teal-600" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <GoalItem title="Complete upper body workout" completed={false} />
                  <GoalItem title="10 minutes of ankle mobility exercises" completed={true} />
                  <GoalItem title="Log pain levels after activity" completed={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                  Progress Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Workout Consistency</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Pain Reduction</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Upper Body Strength</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

function WorkoutItem({
  title,
  duration,
  intensity,
  adapted,
}: {
  title: string
  duration: string
  intensity: string
  adapted: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center">
        <div className="mr-3 bg-teal-100 p-2 rounded-md">
          <Dumbbell className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex text-xs text-muted-foreground">
            <span className="mr-2">{duration}</span>
            <span>•</span>
            <span className="ml-2">{intensity}</span>
          </div>
        </div>
      </div>
      {adapted && (
        <Badge variant="outline" className="text-teal-600 border-teal-600">
          Adapted
        </Badge>
      )}
    </div>
  )
}

function GoalItem({
  title,
  completed,
}: {
  title: string
  completed: boolean
}) {
  return (
    <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
      <div
        className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
          completed ? "bg-teal-600 border-teal-600" : "border-gray-300"
        }`}
      >
        {completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <span className={completed ? "line-through text-muted-foreground" : ""}>{title}</span>
    </div>
  )
}
