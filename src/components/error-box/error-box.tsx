import React from 'react'

type Props = {}

const ErrorBox = (props: Props) => {
  const {location} = props

  return (
    <div className='mb-4 bg-white absolute border top[40px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py2 px-2'>
      <p className='text-red-500 p-1'>Invalid search "{location}"</p>
    </div>
  )
}

export default ErrorBox