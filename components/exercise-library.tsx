"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Dumbbell, Filter, Play, Search, Star, ThumbsUp } from "lucide-react"

type Exercise = {
  id: string
  name: string
  bodyPart: string
  equipment: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  injuryCompatible: boolean
  description: string
  imageUrl: string
}

export function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [injuryCompatibleOnly, setInjuryCompatibleOnly] = useState(true)

  // Sample exercise data
  const exercises: Exercise[] = [
    {
      id: "1",
      name: "Seated Dumbbell Press",
      bodyPart: "Shoulders",
      equipment: "Dumbbells",
      difficulty: "Intermediate",
      injuryCompatible: true,
      description: "A shoulder press performed while seated, reducing strain on the lower body.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "2",
      name: "Lat Pulldown",
      bodyPart: "Back",
      equipment: "Cable Machine",
      difficulty: "Beginner",
      injuryCompatible: true,
      description: "A seated exercise that targets the latissimus dorsi muscles.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "3",
      name: "Seated Leg Extension",
      bodyPart: "Legs",
      equipment: "Machine",
      difficulty: "Beginner",
      injuryCompatible: true,
      description: "Isolates the quadriceps without putting pressure on the ankle.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "4",
      name: "Bench Press",
      bodyPart: "Chest",
      equipment: "Barbell",
      difficulty: "Intermediate",
      injuryCompatible: true,
      description: "A horizontal press that targets the chest, shoulders, and triceps.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "5",
      name: "Box Jump",
      bodyPart: "Legs",
      equipment: "Box",
      difficulty: "Advanced",
      injuryCompatible: false,
      description: "A plyometric exercise that involves jumping onto a raised platform.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "6",
      name: "Bicep Curl",
      bodyPart: "Arms",
      equipment: "Dumbbells",
      difficulty: "Beginner",
      injuryCompatible: true,
      description: "An isolation exercise that targets the biceps.",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
  ]

  // Filter exercises based on search and filters
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBodyPart = selectedBodyPart === "all" || exercise.bodyPart === selectedBodyPart

    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty

    const matchesInjuryCompatible = !injuryCompatibleOnly || exercise.injuryCompatible

    return matchesSearch && matchesBodyPart && matchesDifficulty && matchesInjuryCompatible
  })

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Exercise Library</h1>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedBodyPart} onValueChange={setSelectedBodyPart}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Body Part" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Body Parts</SelectItem>
              <SelectItem value="Chest">Chest</SelectItem>
              <SelectItem value="Back">Back</SelectItem>
              <SelectItem value="Shoulders">Shoulders</SelectItem>
              <SelectItem value="Arms">Arms</SelectItem>
              <SelectItem value="Legs">Legs</SelectItem>
              <SelectItem value="Core">Core</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2">
            <Checkbox
              id="injury-compatible"
              checked={injuryCompatibleOnly}
              onCheckedChange={(checked) => setInjuryCompatibleOnly(checked as boolean)}
            />
            <label
              htmlFor="injury-compatible"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Injury Compatible
            </label>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="adapted">Adapted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>

            {filteredExercises.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No exercises found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedBodyPart("all")
                    setSelectedDifficulty("all")
                    setInjuryCompatibleOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Your favorite exercises will appear here.</p>
              <Button variant="outline" className="mt-2">
                Browse Exercises
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Recently viewed exercises will appear here.</p>
              <Button variant="outline" className="mt-2">
                Browse Exercises
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="adapted" className="mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Exercises adapted for your injuries will appear here.</p>
              <Button variant="outline" className="mt-2">
                Browse Exercises
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-start">
          <div className="flex items-center">
            <Dumbbell className="h-5 w-5 mr-2 text-teal-600" />
            {exercise.name}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex">
          <div className="w-1/3 flex-shrink-0">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md h-[120px] flex items-center justify-center">
              <img
                src={exercise.imageUrl || "/placeholder.svg"}
                alt={exercise.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <div className="w-2/3 pl-3 space-y-2">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {exercise.bodyPart}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {exercise.equipment}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  exercise.difficulty === "Beginner"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : exercise.difficulty === "Intermediate"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {exercise.difficulty}
              </Badge>
              {exercise.injuryCompatible && (
                <Badge className="bg-teal-100 text-teal-800 border-teal-200 text-xs">
                  <Check className="h-3 w-3 mr-1" /> Injury Compatible
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{exercise.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Watch Demo
        </Button>
        <Button variant="outline" size="sm">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Add to Workout
        </Button>
      </CardFooter>
    </Card>
  )
}
