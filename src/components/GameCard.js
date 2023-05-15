import React from 'react'

const GameCard = ({ image, name }) => {
  return (
    <div className="px-5 w-full min-w-[325px] shadow-lg drop-shadow-lg p-1 cursor-pointer">
      <div className="h-40 sm:h-60 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-2">
        <p className="text-bold font-bold">{name}</p>
      </div>
    </div>
  );
}

export default GameCard;
