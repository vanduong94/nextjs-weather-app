'use client'

import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import Container from "@/components/container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/weather-icon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import CurentForecast from "@/components/current-forecast";
import WeatherDetails from "@/components/weather-details";
import ForecastWeatherDetail from "@/components/forecast-weather-detail";

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

interface Rain {
  "3h": number;
}

interface ForecastData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
  list: [];
  city: {};
}

// https://api.openweathermap.org/data/2.5/weather?q=nottingham&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<ForecastData | null>(null)

  const [location, setLocation] = useState('nottingham')

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`;

  const fetchWeather = async() => {
    try {
      const response =  await fetch(url)
      const data = await response.json()
      setIsLoading(false)
      setWeatherData(data)
    } catch (error) {
      console.log(error);
      setIsLoading(true)
    }
  }

  useEffect(() => {
    fetchWeather();
  }, [location]);

  if (isLoading) return <Loading />

  const firstData = weatherData?.list[0]
  const currentCityForecast = weatherData.city

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(entry => new Date(entry.dt * 1000).toISOString().split("T")[0])
    )
  ]

  const firstDataForEachDate = uniqueDates.map(date => {
    return weatherData?.list.find(entry => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0]
      const entryTime = new Date(entry.dt * 1000).getHours()
      return entryDate === date && entryTime >= 6
    })
  })

  // console.log("foobar 2");
  // console.log(currentCityForecast);
    
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar setLocation={setLocation} location={location}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-1 text-2xl items-end space-y-2">
              <h2>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</h2>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
            </div>
            <Container className="gap-10 px-6 items-center">
              <CurentForecast {...firstData}/>
              <div className="flex gap-10 sm:gap-15 overflow-x-auto justify-between pr-3">
                {weatherData?.list.map((data: ForecastData, index: number) => {
                  return (
                    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold" key={index}>
                      <p className="whitespace-nowrap">{format(parseISO(data.dt_txt), "h:mm a")}</p>
                      <WeatherIcon iconName={getDayOrNightIcon(data?.weather[0].icon, data.dt_txt)}/>
                      <p>{convertKelvinToCelsius(data?.main.temp ?? 0)}°</p>
                    </div>
                  )
                })}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon, firstData.dt_txt)}/>
            </Container>

            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between oveflow-x-auto">
                <WeatherDetails {...firstData} city={currentCityForecast}/>
            </Container>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
          {firstDataForEachDate.map((data, index) => (
            <ForecastWeatherDetail key={index} {...data} city={weatherData.city}/>
          ))}
        </section>
      </main>
    </div>
  );
}
