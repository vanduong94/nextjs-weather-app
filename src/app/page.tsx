'use client'

import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

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
// const weatherData: WeatherData = {
//   coord: {
//     lon: -1.1505,
//     lat: 52.9536,
//   },
//   weather: [
//     {
//       id: 803,
//       main: "Clouds",
//       description: "broken clouds",
//       icon: "04n",
//     },
//   ],
//   base: "stations",
//   main: {
//     temp: 287.84,
//     feels_like: 287.48,
//     temp_min: 286.57,
//     temp_max: 289.73,
//     pressure: 1004,
//     humidity: 81,
//     sea_level: 1004,
//     grnd_level: 995,
//   },
//   visibility: 10000,
//   wind: {
//     speed: 6.69,
//     deg: 280,
//   },
//   clouds: {
//     all: 75,
//   },
//   dt: 1720039672,
//   sys: {
//     type: 2,
//     id: 2093695,
//     country: "GB",
//     sunrise: 1719978307,
//     sunset: 1720038740,
//   },
//   timezone: 3600,
//   id: 2641170,
//   name: "Nottingham",
//   cod: 200,
// };

// https://api.openweathermap.org/data/2.5/forecast?q=nottingham&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56

export default function Home() {
  const [isLoading, setIsloading] = useState(true)
  const [weatherData, setWeatherData] = useState({})

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=nottingham&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`;

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

  if (isLoading) return <Loading />

  const firstData = weatherData?.list[0]
  console.log(weatherData);
    
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            <div className="flex gap-1 text-2xl items-end space-y-2">
              <h2>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</h2>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
            </div>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{convertKelvinToCelsius(firstData?.main.feels_like)}°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>min: {convertKelvinToCelsius(firstData?.main.temp_min)}°⬇</span>
                  <span>max: {convertKelvinToCelsius(firstData?.main.temp_max)}°⬆</span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-15 overflow-x-auto justify-between pr-3">
                
              </div>
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
}
