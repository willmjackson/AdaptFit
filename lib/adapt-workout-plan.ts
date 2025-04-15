// This function attempts to adapt the API response to our expected structure
export function adaptWorkoutPlan(data: any) {
  console.log("Adapting workout plan data:", data)

  // If the data is already in the expected format, return it as is
  if (
    data &&
    data.workout_plan &&
    Array.isArray(data.workout_plan.weekly_schedule) &&
    data.recovery_protocols &&
    data.nutrition_guidance
  ) {
    console.log("Data already in expected format")
    return data
  }

  // If the data is wrapped in a content field (common with some API responses)
  if (data && data.content) {
    console.log("Data wrapped in content field, unwrapping")
    return adaptWorkoutPlan(data.content)
  }

  // If the data is in a different format, try to adapt it
  const adaptedData = {
    user_profile: {
      age: 0,
      injuries: [],
      fitness_goals: [],
      fitness_level: "",
      available_equipment: [],
    },
    workout_plan: {
      name: "Personalized Adaptive Workout Plan",
      duration_weeks: 4,
      weekly_schedule: [],
      progression_strategy: {
        week_1: "",
        week_2: "",
        week_3: "",
        week_4: "",
      },
    },
    recovery_protocols: {
      daily_recommendations: [],
      injury_specific_protocols: [],
    },
    nutrition_guidance: {
      general_recommendations: [],
      injury_recovery_support: [],
    },
    weekly_adaptation_strategy: "",
  }

  try {
    // Try to map fields from the response to our expected structure
    if (data.user_profile) {
      adaptedData.user_profile = data.user_profile
    }

    if (data.workout_plan) {
      adaptedData.workout_plan.name = data.workout_plan.name || adaptedData.workout_plan.name
      adaptedData.workout_plan.duration_weeks =
        data.workout_plan.duration_weeks || adaptedData.workout_plan.duration_weeks

      if (data.workout_plan.weekly_schedule && Array.isArray(data.workout_plan.weekly_schedule)) {
        adaptedData.workout_plan.weekly_schedule = data.workout_plan.weekly_schedule
      }

      if (data.workout_plan.progression_strategy) {
        adaptedData.workout_plan.progression_strategy = data.workout_plan.progression_strategy
      }
    }

    if (data.recovery_protocols) {
      if (
        data.recovery_protocols.daily_recommendations &&
        Array.isArray(data.recovery_protocols.daily_recommendations)
      ) {
        adaptedData.recovery_protocols.daily_recommendations = data.recovery_protocols.daily_recommendations
      }

      if (
        data.recovery_protocols.injury_specific_protocols &&
        Array.isArray(data.recovery_protocols.injury_specific_protocols)
      ) {
        adaptedData.recovery_protocols.injury_specific_protocols = data.recovery_protocols.injury_specific_protocols
      }
    }

    if (data.nutrition_guidance) {
      if (
        data.nutrition_guidance.general_recommendations &&
        Array.isArray(data.nutrition_guidance.general_recommendations)
      ) {
        adaptedData.nutrition_guidance.general_recommendations = data.nutrition_guidance.general_recommendations
      }

      if (
        data.nutrition_guidance.injury_recovery_support &&
        Array.isArray(data.nutrition_guidance.injury_recovery_support)
      ) {
        adaptedData.nutrition_guidance.injury_recovery_support = data.nutrition_guidance.injury_recovery_support
      }
    }

    if (data.weekly_adaptation_strategy) {
      adaptedData.weekly_adaptation_strategy = data.weekly_adaptation_strategy
    }

    console.log("Adapted data structure:", JSON.stringify(Object.keys(adaptedData)))
    return adaptedData
  } catch (error) {
    console.error("Error adapting workout plan:", error)
    return data // Return original data if adaptation fails
  }
}
