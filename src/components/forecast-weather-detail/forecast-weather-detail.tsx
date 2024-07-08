import React from 'react'
import ForecastWeatherDetailProps from './types'

import Container from '../container'
import WeatherIcon from '../weather-icon/weather-icon'
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius'
import format from 'date-fns/format'
import { parseISO } from 'date-fns'
import WeatherDetails from '../weather-details'

const ForecastWeatherDetail: React.FC<ForecastWeatherDetailProps> = ({
  weather: [
    {
      description,
      icon
    }
  ],
  dt_txt,
  main: {
    feels_like,
    temp,
  },
  city,
  main,
  wind,
  visibility
}) => {

  return (
    <Container className='gap-4'>
      <section className="flex gap-4 items-center px-4">
        <div>
          <WeatherIcon iconName={icon}/>
          <p>{format(parseISO(dt_txt), "dd.MM")}</p>
          <p className="text-sm">{format(parseISO(dt_txt), "EEEE")}</p>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-5xl">
            {convertKelvinToCelsius(temp)}°
          </span>
          <p className="text-xs space-x-1">
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like)}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails visibility={visibility} main={main} city={city} wind={wind}/>
      </section>
    </Container>
  )
}

export default ForecastWeatherDetail