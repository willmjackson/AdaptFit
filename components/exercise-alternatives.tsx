"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Dumbbell, Info, Play, ThumbsUp, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function ExerciseAlternatives() {
  const router = useRouter()

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Exercise Alternatives</h1>
            <p className="text-muted-foreground">Based on your sprained ankle</p>
          </div>
          <Badge variant="outline" className="text-teal-600 border-teal-600">
            AI Adapted
          </Badge>
        </div>

        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex">
              <Info className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-teal-800">
                We've adapted your workout to avoid putting pressure on your ankle while still helping you reach your
                fitness goals.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="lower">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lower">Lower Body</TabsTrigger>
            <TabsTrigger value="upper">Upper Body</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
          </TabsList>

          <TabsContent value="lower" className="space-y-4 mt-4">
            <ExerciseCard
              title="Squats"
              unsuitable={true}
              reason="Puts pressure on ankle joint"
              alternatives={[
                {
                  name: "Seated Leg Extensions",
                  description: "Targets quadriceps without ankle pressure",
                  difficulty: "Moderate",
                },
                {
                  name: "Lying Hamstring Curls",
                  description: "Works hamstrings while lying down",
                  difficulty: "Easy",
                },
              ]}
            />

            <ExerciseCard
              title="Lunges"
              unsuitable={true}
              reason="Requires ankle stability and balance"
              alternatives={[
                {
                  name: "Seated Hip Adductions",
                  description: "Works inner thighs without standing",
                  difficulty: "Easy",
                },
                {
                  name: "Glute Bridges",
                  description: "Targets glutes and hamstrings",
                  difficulty: "Moderate",
                },
              ]}
            />

            <ExerciseCard
              title="Calf Raises"
              unsuitable={true}
              reason="Direct pressure on injured ankle"
              alternatives={[
                {
                  name: "Seated Calf Stretch",
                  description: "Gentle stretching without weight bearing",
                  difficulty: "Easy",
                },
                {
                  name: "Resistance Band Dorsiflexion",
                  description: "Strengthens anterior tibialis",
                  difficulty: "Easy",
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="upper" className="space-y-4 mt-4">
            <ExerciseCard
              title="Push-ups"
              unsuitable={false}
              alternatives={[
                {
                  name: "Bench Press",
                  description: "Lying chest exercise with no ankle pressure",
                  difficulty: "Moderate",
                },
                {
                  name: "Incline Dumbbell Press",
                  description: "Upper chest focus while seated",
                  difficulty: "Moderate",
                },
              ]}
            />

            <ExerciseCard
              title="Pull-ups"
              unsuitable={false}
              alternatives={[
                {
                  name: "Seated Row",
                  description: "Back exercise while seated",
                  difficulty: "Moderate",
                },
                {
                  name: "Lat Pulldown",
                  description: "Similar muscle engagement to pull-ups",
                  difficulty: "Moderate",
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="cardio" className="space-y-4 mt-4">
            <ExerciseCard
              title="Running"
              unsuitable={true}
              reason="High impact on ankle joint"
              alternatives={[
                {
                  name: "Swimming",
                  description: "Zero impact cardiovascular exercise",
                  difficulty: "Moderate",
                },
                {
                  name: "Seated Arm Ergometer",
                  description: "Upper body cardio with no leg involvement",
                  difficulty: "Moderate",
                },
                {
                  name: "Recumbent Bike",
                  description: "Low impact with minimal ankle flexion",
                  difficulty: "Easy",
                },
              ]}
            />
          </TabsContent>
        </Tabs>

        <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-6" onClick={() => router.push("/recovery")}>
          Save Adapted Workout Plan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </AppLayout>
  )
}

interface ExerciseCardProps {
  title: string
  unsuitable?: boolean
  reason?: string
  alternatives: {
    name: string
    description: string
    difficulty: string
  }[]
}

function ExerciseCard({ title, unsuitable = false, reason, alternatives }: ExerciseCardProps) {
  const [selectedAlt, setSelectedAlt] = useState(0)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Dumbbell className="h-5 w-5 mr-2 text-teal-600" />
            {title}
          </div>
          {unsuitable ? (
            <Badge variant="destructive" className="ml-2">
              <X className="h-3 w-3 mr-1" /> Not Suitable
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Check className="h-3 w-3 mr-1" /> Suitable
            </Badge>
          )}
        </CardTitle>
        {unsuitable && reason && <p className="text-sm text-red-500 mt-1">Reason: {reason}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recommended Alternatives:</h4>
          {alternatives.map((alt, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAlt === index
                  ? "border-teal-600 bg-teal-50"
                  : "border-transparent bg-gray-50 hover:border-gray-200"
              }`}
              onClick={() => setSelectedAlt(index)}
            >
              <div className="flex justify-between">
                <h5 className="font-medium">{alt.name}</h5>
                <Badge variant="outline" className="text-xs">
                  {alt.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{alt.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Watch Demo
        </Button>
        <Button variant="outline" size="sm">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Add to Favorites
        </Button>
      </CardFooter>
    </Card>
  )
}
