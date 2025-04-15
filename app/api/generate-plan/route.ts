import { type NextRequest, NextResponse } from "next/server"
import type { UserData } from "@/hooks/use-user-data"
import { adaptWorkoutPlan } from "@/lib/adapt-workout-plan"

export async function POST(req: NextRequest) {
  try {
    const userData: UserData = await req.json()

    // Format the prompt with user data
    const prompt = `
You are an expert fitness trainer and physical therapist with extensive experience creating adaptive workout plans. I need you to create a personalized workout plan based on the following user information:

- Age: ${userData.age}
- Current injuries: ${userData.injuries.join(", ")}
- Fitness goals: ${userData.fitnessGoals.join(", ")}
- Fitness level: ${userData.fitnessLevel}
- Available equipment: ${userData.availableEquipment.join(", ")}
- Days per week available to workout: ${userData.daysPerWeek}

## Important Guidelines:

1. The workout plan must carefully work around the user's injuries while still helping them progress toward their fitness goals
2. Include appropriate warm-up and mobility exercises specifically targeting the injured areas
3. Suggest recovery protocols and injury rehabilitation exercises
4. Adjust workout intensity, volume, and exercise selection based on fitness level and age
5. Structure the plan to progressively increase difficulty over 4 weeks

## Response Format:

Respond ONLY with a JSON object following this exact structure:

\`\`\`json
{
  "user_profile": {
    "age": 0,
    "injuries": [],
    "fitness_goals": [],
    "fitness_level": "",
    "available_equipment": []
  },
  "workout_plan": {
    "name": "Personalized Adaptive Workout Plan",
    "duration_weeks": 4,
    "weekly_schedule": [
      {
        "day": "Monday",
        "focus": "",
        "exercises": [
          {
            "name": "",
            "sets": 0,
            "reps": "",
            "rest_seconds": 0,
            "injury_adaptations": "",
            "alternative_exercises": [],
            "notes": ""
          }
        ],
        "warm_up": [],
        "cool_down": []
      }
    ],
    "progression_strategy": {
      "week_1": "",
      "week_2": "",
      "week_3": "",
      "week_4": ""
    }
  },
  "recovery_protocols": {
    "daily_recommendations": [],
    "injury_specific_protocols": [
      {
        "injury": "",
        "rehabilitation_exercises": [],
        "avoid": [],
        "recovery_timeline": ""
      }
    ]
  },
  "nutrition_guidance": {
    "general_recommendations": [],
    "injury_recovery_support": []
  },
  "weekly_adaptation_strategy": "Description of how to adapt the plan if pain increases or decreases"
}
\`\`\`

Important: Return ONLY the valid JSON object with no additional explanation or text. The JSON must be properly formatted and valid.
`

    console.log("Sending request to Groq API with user data:", userData)

    // Make request to Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an expert fitness trainer and physical therapist specializing in adaptive workout plans.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 0.7,
        max_completion_tokens: 2048,
        top_p: 1,
        stream: false,
        response_format: {
          type: "json_object",
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
      console.error("Groq API error:", errorData)
      return NextResponse.json({ error: "Failed to generate workout plan" }, { status: 500 })
    }

    const data = await response.json()
    console.log("Raw Groq API response:", JSON.stringify(data))

    // Extract the content from the response
    const content = data.choices[0].message.content
    console.log("Extracted content:", content)

    try {
      // Since we're using response_format: { type: "json_object" },
      // the content should already be valid JSON
      const parsedContent = typeof content === "string" ? JSON.parse(content) : content
      console.log("Parsed content structure:", JSON.stringify(Object.keys(parsedContent)))

      // Adapt the workout plan to our expected structure
      const workoutPlan = adaptWorkoutPlan(parsedContent)

      return NextResponse.json(workoutPlan)
    } catch (error) {
      console.error("Failed to parse JSON from Groq response:", error)
      console.error("Raw content:", content)
      return NextResponse.json({ error: "Failed to parse workout plan" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error generating workout plan:", error)
    return NextResponse.json({ error: "Failed to generate workout plan" }, { status: 500 })
  }
}
