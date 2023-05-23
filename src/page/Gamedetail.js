import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";

const Gamedetail = () => {
  const { id: gameID } = useParams();
  const [gameData, setGameData] = useState({});
  console.log(gameID);
  console.log(gameData);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (gameID) {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/game/${gameID}`
          );
          const data = await response.json();
          setGameData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameData();
  }, [gameID]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="p-2 md:p-4 text-white">
      <div className="md:flex">
        <div className="w-full">
          <div className="w-full md:h-[500px] h-[300px] rounded flex bg-ninth overflow-visible justify-center md:justify-between">
            <img
              className="px-0 md:px-52 md:mt-12 md:h-full rounded"
              src={gameData.image}
            />
          </div>
        </div>
      </div>
      <div className="justify-center">
        <div className="">
          <p className="text-xl py-2 md:text-4xl mr-auto md:ml-[720px] font-bold text-center md:text-left">
            {gameData.name}
          </p>
        </div>

        <div className="px-10 md:px-[350px]">
          <p className="text-sm py-2 mt-4 md:text-xl md:mr-auto font-bold text-left">
            Gener: {gameData.gener}
          </p>
          <p className="text-sm py-2 md:text-xl md:mr-auto font-bold text-left">
            Rating: {gameData.rating}
          </p>
          <p className="text-sm py-2 md:text-xl md:mr-auto font-bold text-left">
            Platform:
            <button className="bg-fifth text-white rounded px-2 py-1 ml-2">
              {gameData.platform === "ps5" ? "Playstation5" : "Playstation4"}
            </button>
          </p>
          <p className="text-sm py-2 md:text-xl md:mr-auto font-bold text-left">
            Add to website date: {formatDate(gameData.dateAdded)}
          </p>
          <p className="text-sm py-2 md:text-xl md:mr-auto font-bold text-left">
            Publisher: {gameData.publisher}
          </p>
        </div>
      </div>
      <div>
        <button className="w-full mt-5 flex flex-row max-w-[240px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold py-1 rounded-full">
          <BiPlusCircle size={30} className="ml-5" />
          <p className="ml-1 mr-1 mt-0.5">Add to collection</p>
        </button>
      </div>
      <div>
        <hr className="mt-5 mr-10 ml-10"></hr>
        <p className="mt-4 ml-10 md:ml-16 text-left text-sm md:text-2xl font-bold">
        User have this game in their collection
        </p>
      </div>
    </div>
  );
};

export default Gamedetail;
