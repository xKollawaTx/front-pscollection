import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import profileimg from "../asset/profileimg.png";
import { BiFilter } from "react-icons/bi";
import GameFeature from "../components/GameFeature";

const Userprofile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [collectionGames, setCollectionGames] = useState({});
  const [selectedCollection, setSelectedCollection] = useState(null);

  const loggedInUser = useSelector((state) => state.user);

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getuser/${username}`
      );
      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
        fetchCollections(userData._id); // Move this line here
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchCollections = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/collection/user/${userId}`
      );
      if (response.status === 200) {
        const collectionsData = response.data;
        setCollections(collectionsData);

        const gameDataPromises = collectionsData.map(async (collection) => {
          const gameIds = collection.gameIds;
          const gamePromises = gameIds.map(async (gameId) => {
            try {
              const gameResponse = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/game/${gameId}`
              );
              if (gameResponse.status === 200) {
                const gameData = gameResponse.data;
                return gameData;
              } else {
                console.error(`Error fetching game with ID ${gameId}`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching game with ID ${gameId}`, error);
              return null;
            }
          });

          const collectionGamesData = await Promise.all(gamePromises);
          return { collectionId: collection._id, games: collectionGamesData };
        });

        const collectionGamesData = await Promise.all(gameDataPromises);

        const collectionGamesObj = {};
        collectionGamesData.forEach((collectionData) => {
          collectionGamesObj[collectionData.collectionId] =
            collectionData.games;
        });

        setCollectionGames(collectionGamesObj);

        if (collectionsData.length > 0) {
          setSelectedCollection(collectionsData[0]._id);
        }
      } else {
        console.error("Failed to fetch collections:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleSelectCollection = (collectionId) => {
    setSelectedCollection(collectionId);
  };

  return (
    <div className="p-3 md:p-4 text-white">
      <div className="max-w-[450px] m-auto items-center flex flex-col md:flex-row p-4">
        <div className="w-40 h-40 overflow-hidden rounded-full">
          {userData && userData.image ? (
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
        <div className="md:w-2/3 p-4">
          <p className="text-sm">Username</p>
          <h1 className="text-3xl font-bold">
            {userData && userData.username}
          </h1>
          <p className="text-sm">Email</p>
          <p className="text-xl underline">{userData && userData.email}</p>
        </div>
      </div>
      <div>
        <button className="w-full mt-10 flex flex-row max-w-[150px] m-auto bg-sixth hover:bg-primary cursor-pointer text-black text-xl font-bold py-1 rounded-full">
          <p className="m-auto">Collection</p>
        </button>
      </div>
      <div>
        {collections.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="max-w-screen-lg overflow-x-auto">
              <div className="flex gap-4 text-black">
                {collections.map((collection) => (
                  <button
                    key={collection._id}
                    className={`px-4 py-2 rounded-full mt-3  ${
                      selectedCollection === collection._id
                        ? "bg-primary"
                        : "bg-sixth"
                    }`}
                    onClick={() => handleSelectCollection(collection._id)}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flexr">
        {selectedCollection && (
          <div>
            {collections.map((collection) => {
              if (collection._id === selectedCollection) {
                return (
                  <div key={collection._id} className="">
                    <div className="px-5 py-5 md:px-20 flex justify-between items-center">
                      <p className="text-2xl md:text-2xl font-bold ">
                        {collection.name}
                      </p>
                      <div className="flex gap-1">
                        <span>
                          {collectionGames[selectedCollection].length} games
                        </span>
                      </div>
                    </div>
                    {collectionGames[selectedCollection].length > 0 ? (
                      <div className="flex gap-1">
                        <div className="flex flex-wrap md:gap-5 justify-center">
                          {collectionGames[selectedCollection].map((game) => (
                            <Link to={`/game/${game._id}`} key={game._id}>
                              <GameFeature
                                image={game.image}
                                name={game.name}
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="px-5 py-5 md:px-20 flex justify-between items-center">
                        {username} doesn't have games in this collection
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
