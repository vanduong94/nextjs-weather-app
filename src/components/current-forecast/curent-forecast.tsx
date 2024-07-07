import React from 'react'
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius'
import { WeatherData } from './types'

const CurentForecast = (props: WeatherData)  => {
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

export default CurentForecast