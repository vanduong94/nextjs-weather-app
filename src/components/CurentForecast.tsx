import React from 'react'
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius'

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

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number,
  deg: number,
  gust: number
}

interface Rain {
  "3h": number;
}

interface Sys {
  pod: string
}

interface ForecastData {
  clouds: Clouds;
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  rain: Rain;
  sys: Sys;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export default function CurentForecast(props: ForecastData) {
  const {main} = props

  return (
    <div className="flex flex-col px4">
      <span className="text-5xl">
        {convertKelvinToCelsius(main.temp)}°
      </span>
      <p className="text-xs space-x-1 whitespace-nowrap">
        <span>Feels like</span>
        <span>{convertKelvinToCelsius(main.feels_like)}°</span>
      </p>
      <p className="text-xs space-x-2">
        <span>{convertKelvinToCelsius(main.temp_min)}°⬇</span>
        <span>{convertKelvinToCelsius(main.temp_max)}°⬆</span>
      </p>
    </div>
  )
}