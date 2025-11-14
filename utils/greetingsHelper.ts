export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface GreetingData {
  greeting: string;
  message: string;
  timeOfDay: TimeOfDay;
}

/**
 * Get the current time of day based on hour
 */
export const getTimeOfDay = (hour: number): TimeOfDay => {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

/**
 * Get greeting message based on time of day
 */
export const getGreeting = (): GreetingData => {
  const now = new Date();
  const hour = now.getHours();
  const timeOfDay = getTimeOfDay(hour);

  const greetings: Record<TimeOfDay, GreetingData> = {
    morning: {
      greeting: "Good Morning!",
      message: "Ready to fuel up? Breakfast is calling!",
      timeOfDay: "morning",
    },
    afternoon: {
      greeting: "Hey There!",
      message: "Hungry? Let's find something tasty!",
      timeOfDay: "afternoon",
    },
    evening: {
      greeting: "Good Evening!",
      message: "Dinner time! What sounds good tonight?",
      timeOfDay: "evening",
    },
    night: {
      greeting: "Hey Night Owl!",
      message: "Craving something? Let's satisfy that hunger!",
      timeOfDay: "night",
    },
  };

  return greetings[timeOfDay];
};
