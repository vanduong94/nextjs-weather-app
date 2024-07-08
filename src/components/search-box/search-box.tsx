import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { cn } from '@/utils/cn';
import { Props } from './types';



const SearchBox = (props: Props) => {
  const {setLocation} = props
  
  const [newCity, setNewCity] = useState('')

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setLocation(newCity)
  }

  return (
    <form onSubmit={formSubmitHandler} className={cn("flex relative items-center justify-center h-10", props.className)}>
      <input value={newCity} onChange={(event) => setNewCity(event.target.value)} type="text" name="" id="" placeholder='Search location...' className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full'/>
      <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full'>
        <IoSearch />
      </button>
    </form>
  )
}

export default SearchBox