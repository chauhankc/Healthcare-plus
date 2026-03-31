import { useEffect, useState } from "react";
import { getWeatherData } from "../Apis/weatherApi";

const Weather = ({ compact = false }) => {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch weather data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading weather...</p>;
  if (error) return <p className="text-red-500 text-sm">Error: {error}</p>;

  const sortedWeather = [...weather].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Generate summary interpretation
  const generateOverview = () => {
    const tempsC = sortedWeather.map((w) => w.temperatureC);
    const min = Math.min(...tempsC);
    const max = Math.max(...tempsC);

    return `
This forecast period shows unusually wide temperature variation ranging from ${min}°C to ${max}°C.
Conditions fluctuate rapidly without a stable seasonal trend, including freezing lows and extreme heat spikes.
`;
  };

  const generateTrends = () => {
    return `
Temperature volatility is high and descriptive summaries do not always match actual temperature readings.
This dataset is suitable for demonstrating dashboard behavior under contradictory or unexpected weather states.
`;
  };

  // COMPACT DASHBOARD CARD
  if (compact) {
    return (
      <div className="space-y-2 text-sm">
        {sortedWeather.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b dark:border-gray-700 pb-1 last:border-b-0"
          >
            <span className="dark:text-gray-200">{item.date}</span>
            <span className="dark:text-gray-200">{item.temperatureC}°C</span>
            <span className="text-gray-500 dark:text-gray-400">{item.summary}</span>
          </div>
        ))}

        <button
          onClick={() => (window.location.href = "/weather")}
          className="mt-2 text-blue-600 text-xs underline hover:text-blue-700"
        >
          View Details
        </button>
      </div>
    );
  }

  // FULL PAGE WEATHER + INTERPRETATION
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <h2 className="text-2xl font-bold">Weather Forecast Overview</h2>

      {/* Overview */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-4 space-y-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">
        <h3 className="font-semibold text-lg">Summary</h3>
        <p>{generateOverview()}</p>
      </div>

      {/* Trends */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-4 space-y-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">
        <h3 className="font-semibold text-lg">Observed Trends</h3>
        <p>{generateTrends()}</p>
      </div>

      {/* Day-by-Day Breakdown */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-4 text-gray-700 dark:text-gray-200 space-y-4">
        <h3 className="font-semibold text-lg mb-2">Daily Breakdown</h3>
        {sortedWeather.map((item, index) => (
          <div key={index} className="border-b dark:border-gray-700 pb-3 last:border-none last:pb-0">
            <p className="font-medium">{formatDate(item.date)}</p>
            <p>Temperature: {item.temperatureC}°C / {item.temperatureF}°F</p>
            <p>Summary: {item.summary}</p>
          </div>
        ))}
      </div>

      {/* Raw Data Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Forecast Data</h3>
        {sortedWeather.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-200"
          >
            <p className="font-medium">{formatDate(item.date)}</p>
            <p>Temperature (C): {item.temperatureC}</p>
            <p>Temperature (F): {item.temperatureF}</p>
            <p>Summary: {item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;