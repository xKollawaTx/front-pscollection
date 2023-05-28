import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";
import profileimg from "../asset/profileimg.png";
import AddtoCollection from "../components/AddtoCollection";

const Gamedetail = () => {
  const { id: gameID } = useParams();
  const [gameData, setGameData] = useState({});
  const userData = useSelector((state) => state.user);

  const[isAddtoCollection, setIsAddtoCollection] = useState(false);
  const handleAddtoCollection = () => {
    setIsAddtoCollection(false)
  }

  
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
          <p className="text-xl py-2 mt-3 md:mt-0 md:text-4xl mr-auto md:ml-[720px] font-bold text-center md:text-left">
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
        <button className="w-full mt-5 flex flex-row max-w-[240px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold py-1 rounded-full"
        onClick={() => setIsAddtoCollection(true)}
        >
          <BiPlusCircle size={30} className="ml-5" />
          <p className="ml-1 mr-1 mt-0.5">Add to collection</p>
        </button>
        {isAddtoCollection && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <AddtoCollection 
              onClose={() => setIsAddtoCollection(false)}
              onCreate={handleAddtoCollection}
            />
          </div>
        )}
      </div>
      <div>
        <hr className="mt-5 mr-10 ml-10"></hr>
        <p className="mt-4 ml-10 md:ml-16 text-left text-sm md:text-2xl font-bold">
          User have this game in their collection
        </p>
      </div>
      <div className="flex items-center justify-between py-2 ml-8 mr-8 md:ml-14 md:mr-14">
        <div className="bg-tenth w-full rounded-lg border-solid border-4 border-eleventh">
          <div className="flex px-6 h-24">
            <div className=" mt-2 w-20 h-20 overflow-hidden rounded-full cursor-pointer">
              {userData.image ? (
                <img
                  className="w-full h-full"
                  src={userData.image}
                  alt={userData.username}
                />
              ) : (
                <img
                  src={profileimg}
                  alt="Default Profile"
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="ml-4 mt-4">
              <p className="text-2xl font-bold">{userData.username}</p>
              <p className="text-2sm">Add to collection date: {formatDate(gameData.dateAdded)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetail;
