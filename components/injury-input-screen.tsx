"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, ArrowRight, Calendar, Camera, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function InjuryInputScreen() {
  const [loading, setLoading] = useState(false)
  const [painLevel, setPainLevel] = useState([5])
  const router = useRouter()

  const handleSubmit = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/alternatives")
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Log New Injury</h1>
        <p className="text-muted-foreground">Tell us about your injury so we can adapt your workouts</p>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Injury Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="injury-type">What type of injury do you have?</Label>
              <Input id="injury-type" placeholder="e.g., Sprained ankle, shoulder pain" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="injury-date">When did it occur?</Label>
              <div className="relative">
                <Input id="injury-date" type="date" />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>How severe is your pain?</Label>
              <div className="pt-2">
                <Slider value={painLevel} min={1} max={10} step={1} onValueChange={setPainLevel} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Mild (1)</span>
                  <span>Moderate (5)</span>
                  <span>Severe (10)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Have you seen a medical professional?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medical-yes" />
                  <Label htmlFor="medical-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medical-no" />
                  <Label htmlFor="medical-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="injury-description">Describe your injury</Label>
              <Textarea
                id="injury-description"
                placeholder="Provide details about how it happened, symptoms, and any limitations"
                className="min-h-[100px]"
              />
            </div>

            <Button variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Add Photo of Injury
            </Button>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <div className="flex items-center p-2 rounded-lg bg-amber-50 text-amber-800 w-full">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                For serious injuries, please consult a healthcare professional before continuing exercise.
              </p>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing your injury...
                </>
              ) : (
                <>
                  Get Adapted Workout Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  )
}
