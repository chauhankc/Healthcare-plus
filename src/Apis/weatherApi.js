// src/Apis/weatherApi.js

const BASE_URL = import.meta.env.VITE_APP_WEATHER_API_URL;

export const getWeatherData = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
