import React, { useState } from 'react'
import { MdWbSunny, MdMyLocation, MdLocationOn } from "react-icons/md";
import SearchBox from '../search-box';
import ErrorBox from '../error-box';

type Props = {}

const Navbar = (props: Props) => {
  const {error} = props

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h1 className="text-gray-500 text-3xl">Weather</h1>
          <MdWbSunny className='text-3xl mt-1 text-yellow-300'/>
        </div>
        <section className="flex gap-2 items-center">
          <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
          <MdLocationOn className='text-3xl'/>
          <p className="text-slate-900/80 text-sm capitalize">{props.location}</p>
          <div className='relative'>
            <SearchBox setLocation={props.setLocation}/>
            { error && <ErrorBox location={props.location}/>}
          </div>
        </section>
      </div>
    </nav>
  )
}

export default Navbar