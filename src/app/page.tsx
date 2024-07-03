'use client'

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Example usage:
const weatherData: WeatherData = {
  coord: {
    lon: -1.1505,
    lat: 52.9536,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 287.84,
    feels_like: 287.48,
    temp_min: 286.57,
    temp_max: 289.73,
    pressure: 1004,
    humidity: 81,
    sea_level: 1004,
    grnd_level: 995,
  },
  visibility: 10000,
  wind: {
    speed: 6.69,
    deg: 280,
  },
  clouds: {
    all: 75,
  },
  dt: 1720039672,
  sys: {
    type: 2,
    id: 2093695,
    country: "GB",
    sunrise: 1719978307,
    sunset: 1720038740,
  },
  timezone: 3600,
  id: 2641170,
  name: "Nottingham",
  cod: 200,
};

const url = `https://api.openweathermap.org/data/2.5/weather?q=nottingham&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`;

export default function Home() {
  const [isLoading, setIsloading] = useState(true)
  const [weatherData, setWeatherData] = useState()

  const fetchWeather = async() => {
    try {
      const response =  await fetch(url)
      const data = await response.json()
      setIsloading(false)
      setWeatherData(data)
    } catch (error) {
      console.log(error);
      setIsloading(true)
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  console.log(weatherData);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
