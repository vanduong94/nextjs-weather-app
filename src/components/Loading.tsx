import React from 'react'

type Props = {}

export default function Loading({}: Props) {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )
}