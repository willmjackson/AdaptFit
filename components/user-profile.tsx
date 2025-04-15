"use client"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  Heart,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Share2,
  Shield,
  Smartphone,
  User,
} from "lucide-react"

export function UserProfile() {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback className="text-xl">AJ</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">Alex Johnson</h1>
              <p className="text-muted-foreground">Recovering from sprained ankle</p>
              <div className="flex mt-2 space-x-2">
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  Day 12 of Recovery
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Intermediate
                </Badge>
              </div>
              <Button variant="outline" className="mt-4">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="injuries">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="injuries">Injuries</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="injuries" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-teal-600" />
                  Current Injuries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border border-amber-200 bg-amber-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-amber-800">Sprained Ankle</h3>
                      <p className="text-xs text-amber-700">Started: April 3, 2025</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">Recovering</Badge>
                  </div>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>Grade 2 sprain of right ankle</p>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>Recovery Progress: 68%</span>
                      <span>Est. Recovery: 9 days left</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-green-800">Shoulder Tendonitis</h3>
                      <p className="text-xs text-green-700">Started: January 15, 2025</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Recovered</Badge>
                  </div>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Mild tendonitis in left shoulder</p>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>Recovery Progress: 100%</span>
                      <span>Recovered: March 20, 2025</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Log New Injury</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-teal-600" />
                  Injury Prevention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Based on your history, we recommend focusing on these areas to prevent future injuries:
                  </p>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center p-2 rounded-md bg-gray-50">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-teal-700">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Ankle Stability Exercises</h4>
                        <p className="text-xs text-muted-foreground">3x weekly</p>
                      </div>
                    </div>

                    <div className="flex items-center p-2 rounded-md bg-gray-50">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-teal-700">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Shoulder Mobility Routine</h4>
                        <p className="text-xs text-muted-foreground">2x weekly</p>
                      </div>
                    </div>

                    <div className="flex items-center p-2 rounded-md bg-gray-50">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-teal-700">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Proper Warm-up Protocol</h4>
                        <p className="text-xs text-muted-foreground">Before every workout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                    Fitness Goals
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-50">
                  <h3 className="font-medium">Short-term Goals</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-teal-600 mr-2 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                      </div>
                      Recover fully from ankle sprain
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-teal-600 mr-2 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                      </div>
                      Maintain upper body strength during recovery
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-2"></div>
                      Return to regular workout routine in 3 weeks
                    </li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-gray-50">
                  <h3 className="font-medium">Long-term Goals</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-teal-600 mr-2 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                      </div>
                      Increase overall strength by 15%
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-2"></div>
                      Complete a 10k run by end of year
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-2"></div>
                      Develop better injury prevention habits
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-teal-600" />
                  Workout Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Preferred Workout Days</h4>
                      <p className="text-sm text-muted-foreground">Monday, Wednesday, Friday, Saturday</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Workout Duration</h4>
                      <p className="text-sm text-muted-foreground">45-60 minutes</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Focus Areas</h4>
                      <p className="text-sm text-muted-foreground">Upper body strength, Core stability</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-teal-600" />
                  App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="notifications">Notifications</Label>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                  <Switch id="dark-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="voice-commands">Voice Commands</Label>
                  </div>
                  <Switch id="voice-commands" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="health-sync">Sync with Health Apps</Label>
                  </div>
                  <Switch id="health-sync" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-teal-600" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  AdaptFit v1.0.0 • Terms of Service • Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
