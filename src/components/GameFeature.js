import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const GameFeature = ({ image, name }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full min-w-[150px] max-w-[250px] md:min-w-[250px] md:max-w-[320px] hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      <div className="h-40 sm:h-60 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-2">
        <p className="text-bold font-bold text-lg md:text-xl lg:text-2xl">
          {name}
        </p>
      </div>
    </div>
  );
};

export default GameFeature;
