import React from 'react'

const gameDetails = ({image, name, platform, gener, publisher}) => {
  return (
    <div className="w-full min-w-[150px] max-w-[150px]  md:min-w-[300px] md:max-w-[320px] hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      <div className="h-40 sm:h-60 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold md:text-bold">{name}</p>
        <p className="text-sm font-bold md:text-bold">{platform}</p>
        <p className="text-sm font-bold md:text-bold">{gener}</p>
        <p className="text-sm font-bold md:text-bold">{publisher}</p>
      </div>

    </div>

  )
}

export default gameDetails