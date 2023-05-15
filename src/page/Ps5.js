import React from 'react'
import { Link } from 'react-router-dom';
import { BiFilter } from 'react-icons/bi';

export const Ps5 = () => {
  return (
    <div className='px-8 py-5 md:px-5 md:py-5 flex justify-between items-center'>
        <p className='text-2xl md:text-2xl font-bold'>PS5 Games<br></br></p>
          <BiFilter size={50} className=''/>
    </div>
  )
}
export default Ps5;