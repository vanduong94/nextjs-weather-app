import React from 'react'
import { SingleWeatherDetailProps } from './types'

const SingleWeatherDetail = (props: SingleWeatherDetailProps) => {
  const {information, icon, value} = props

  return (
    <div className="flex flex-col justify-between gap-2 items-center text xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
)}

export default SingleWeatherDetail