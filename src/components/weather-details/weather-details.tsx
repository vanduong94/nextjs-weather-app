import React from 'react'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { FiDroplet } from 'react-icons/fi'
import { MdAir } from 'react-icons/md'
import { ImMeter } from 'react-icons/im'
import { WeatherDetailsProps } from './types'
import SingleWeatherDetail from '../single-weather-detail'

import { metersToKilometers } from '@/utils/metersToKilometers'
import format from 'date-fns/format'
import { fromUnixTime } from 'date-fns'
import { convertWindSpeed } from '@/utils/convertWindSpeed'

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  visibility, 
  wind, 
  main, 
  city: {
    sunrise, 
    sunset
  }
}) => {

  const weatherDetails = [
    { icon: <LuEye />, information: "Visibility", value: metersToKilometers(visibility) },
    { icon: <FiDroplet />, information: "Humidity", value: `${main.humidity}%` },
    { icon: <MdAir />, information: "Wind Speed", value: `${convertWindSpeed(wind.speed)}` },
    { icon: <ImMeter />, information: "Air Pressure", value: `${main.pressure} hPa` },
    { icon: <LuSunrise />, information: "Sunrise", value: format(fromUnixTime(sunrise), 'H:mm') },
    { icon: <LuSunrise />, information: "Sunset", value: format(fromUnixTime(sunset), 'H:mm') },
  ];

  return (
    <>
      {weatherDetails.map((detail, index) => (
        <SingleWeatherDetail
          key={index}
          icon={detail.icon}
          information={detail.information}
          value={detail.value}
        />
      ))}
    </>
  )
}

export default WeatherDetails