import React from 'react'
import { Link } from 'react-router-dom';
import { BiFilter } from 'react-icons/bi';

export const Whatsnew = () => {
  return (
    <div className='px-8 py-5 flex justify-between items-center'>
        <p className='text-2xl md:text-2xl font-bold'>What's new<br></br></p>
        <Link to={"Whatsnew"} className='flex'>
          <BiFilter size={50} className=''/>
        </Link> 
    </div>
  )
}
export default Whatsnew;