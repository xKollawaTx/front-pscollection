import React from "react";
import { Link } from "react-router-dom";
import { BiFilter } from "react-icons/bi";
import { useSelector } from "react-redux";
import GameFeature from "../components/GameFeature";

export const Ps5 = () => {
  const gameData = useSelector((state) => state.game.gameList);
  const ps5GameList = gameData.filter((game) => game.platform === "ps5");

  return (
    <div className="p-2 md:p-4 text-white">
      <div className="px-5 py-5 md:px-20 flex justify-between items-center">
        <p className="text-2xl md:text-2xl font-bold">
          PS5 Games<br></br>
        </p>
        <BiFilter size={50} className="" />
      </div>
      <div className="flex flex-wrap md:gap-5 justify-center">
        {ps5GameList.map((game) => {
          return (
            <Link to={`/game/${game._id}`}>
              <GameFeature key={game._id} image={game.image} name={game.name} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Ps5;
