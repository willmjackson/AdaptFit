"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Activity,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Heart,
  Medal,
  Save,
  Smile,
  ThumbsUp,
  Trophy,
  Check,
} from "lucide-react"

export function RecoveryTracking() {
  const [painLevel, setPainLevel] = useState([3])
  const [mobilityLevel, setMobilityLevel] = useState([6])
  const [currentDay, setCurrentDay] = useState(12)
  const totalDays = 21
  const progress = Math.round((currentDay / totalDays) * 100)

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Recovery Tracking</h1>
            <p className="text-muted-foreground">Sprained Ankle</p>
          </div>
          <Badge className="bg-teal-600">
            Day {currentDay} of {totalDays}
          </Badge>
        </div>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Recovery Progress</h3>
              <div className="text-2xl font-bold">{progress}%</div>
            </div>
            <Progress value={progress} className="h-2 mt-2 bg-white/20" />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xs opacity-80">Pain Level</div>
                <div className="font-bold">3/10</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xs opacity-80">Mobility</div>
                <div className="font-bold">60%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-xs opacity-80">Swelling</div>
                <div className="font-bold">Mild</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {progress >= 50 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
            <Trophy className="h-8 w-8 text-amber-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Recovery Milestone!</h3>
              <p className="text-sm text-amber-700">You've reached 50% recovery. Keep up the great work!</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="log">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="log">Daily Log</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Edit className="h-5 w-5 mr-2 text-teal-600" />
                    Today's Recovery Log
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Pain Level (1-10)</Label>
                  <Slider value={painLevel} min={1} max={10} step={1} onValueChange={setPainLevel} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>No Pain</span>
                    <span>Severe Pain</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mobility Level (%)</Label>
                  <Slider value={mobilityLevel} min={0} max={10} step={1} onValueChange={setMobilityLevel} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Limited</span>
                    <span>Full Range</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Swelling</Label>
                  <div className="flex space-x-2">
                    {["None", "Mild", "Moderate", "Severe"].map((level) => (
                      <Button
                        key={level}
                        variant={level === "Mild" ? "default" : "outline"}
                        size="sm"
                        className={level === "Mild" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="How does your ankle feel today? Any improvements or setbacks?"
                    className="min-h-[80px]"
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Add Photo to Track Visual Progress
                </Button>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Today's Log
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                  Recovery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-200" />

                  <div className="space-y-6">
                    <TimelineItem
                      day={1}
                      date="Apr 3, 2025"
                      title="Injury Occurred"
                      description="Initial injury recorded. Severe pain and swelling."
                      painLevel={9}
                      mobilityLevel={2}
                    />

                    <TimelineItem
                      day={5}
                      date="Apr 7, 2025"
                      title="Started RICE Protocol"
                      description="Rest, ice, compression, and elevation begun."
                      painLevel={7}
                      mobilityLevel={3}
                    />

                    <TimelineItem
                      day={10}
                      date="Apr 12, 2025"
                      title="First Adapted Workout"
                      description="Completed first upper body workout with ankle protection."
                      painLevel={5}
                      mobilityLevel={4}
                      milestone
                    />

                    <TimelineItem
                      day={12}
                      date="Apr 14, 2025"
                      title="Today"
                      description="Continued improvement. Swelling reduced to mild."
                      painLevel={3}
                      mobilityLevel={6}
                      current
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-teal-600" />
                  Recovery Exercises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RecoveryExercise
                  title="Ankle Alphabet"
                  description="Trace the alphabet with your toe while seated"
                  duration="5 minutes"
                  frequency="3x daily"
                  completed={true}
                />

                <RecoveryExercise
                  title="Gentle Ankle Rotations"
                  description="Slowly rotate ankle in clockwise and counterclockwise directions"
                  duration="2 minutes each direction"
                  frequency="4x daily"
                  completed={true}
                />

                <RecoveryExercise
                  title="Towel Stretch"
                  description="Seated towel stretch for calf and Achilles"
                  duration="30 seconds hold, 5 reps"
                  frequency="2x daily"
                  completed={false}
                />

                <RecoveryExercise
                  title="Resistance Band Dorsiflexion"
                  description="Strengthen anterior tibialis with light resistance"
                  duration="10 reps, 3 sets"
                  frequency="1x daily"
                  completed={false}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Mark All Complete
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

interface TimelineItemProps {
  day: number
  date: string
  title: string
  description: string
  painLevel: number
  mobilityLevel: number
  milestone?: boolean
  current?: boolean
}

function TimelineItem({
  day,
  date,
  title,
  description,
  painLevel,
  mobilityLevel,
  milestone = false,
  current = false,
}: TimelineItemProps) {
  return (
    <div className="relative pl-10">
      <div
        className={`absolute left-0 flex items-center justify-center w-7 h-7 rounded-full border-2 ${
          current
            ? "bg-teal-600 border-teal-600 text-white"
            : milestone
              ? "bg-amber-100 border-amber-400 text-amber-700"
              : "bg-white border-gray-300"
        }`}
      >
        {milestone && <Medal className="h-3 w-3" />}
        {!milestone && <span className="text-xs font-medium">{day}</span>}
      </div>

      <div className={`p-3 rounded-lg border ${current ? "border-teal-200 bg-teal-50" : "border-gray-200 bg-gray-50"}`}>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          {current && (
            <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200">
              Today
            </Badge>
          )}
          {milestone && !current && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Milestone
            </Badge>
          )}
        </div>

        <p className="text-sm mt-1">{description}</p>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex items-center text-xs">
            <Activity className="h-3 w-3 mr-1 text-red-500" />
            <span className="text-muted-foreground mr-1">Pain:</span>
            <span className="font-medium">{painLevel}/10</span>
          </div>
          <div className="flex items-center text-xs">
            <Smile className="h-3 w-3 mr-1 text-green-500" />
            <span className="text-muted-foreground mr-1">Mobility:</span>
            <span className="font-medium">{mobilityLevel * 10}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RecoveryExerciseProps {
  title: string
  description: string
  duration: string
  frequency: string
  completed: boolean
}

function RecoveryExercise({ title, description, duration, frequency, completed }: RecoveryExerciseProps) {
  return (
    <div
      className={`p-3 rounded-lg border ${completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div
            className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 mt-0.5 ${
              completed ? "bg-green-600 text-white" : "border-2 border-gray-300"
            }`}
          >
            {completed && <Check className="h-3 w-3" />}
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 ml-8">
        <div className="flex items-center text-xs">
          <Clock className="h-3 w-3 mr-1 text-teal-600" />
          <span className="text-muted-foreground mr-1">Duration:</span>
          <span>{duration}</span>
        </div>
        <div className="flex items-center text-xs">
          <Calendar className="h-3 w-3 mr-1 text-teal-600" />
          <span className="text-muted-foreground mr-1">Frequency:</span>
          <span>{frequency}</span>
        </div>
      </div>
    </div>
  )
}
