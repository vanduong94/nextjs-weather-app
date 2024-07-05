import React from 'react'

type Props = {}

const Loading = ({}: Props) => {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )
}

export default Loading