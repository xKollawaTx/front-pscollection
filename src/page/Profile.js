import React from "react";
import profileimg from "../asset/profileimg.png";
import GameProfile from "../components/GameProfile";
import { useSelector, useDispatch } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";
import CreateCollection from "../components/CreateCollection";
import Editprofile from "../components/Editprofile";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userData = useSelector((state) => state.user);
  const handleEditAccount = () => {
    setIsEditing((prev) => !prev);
  };
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const handleCreateCollection = (collectionName) => {
    // Perform the necessary actions to create the collection
    // For example, make an API request to the backend

    // Close the pop-up
    setIsCreatingCollection(false);
  };
  const handleCreateCollectionClick = () => {
    setIsCreatingCollection(true);
  };

  const [collections, setCollections] = useState([]);
  const [collectionGames, setCollectionGames] = useState({});

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/collection/user/${userData._id}`
      );
      if (response.ok) {
        const collectionsData = await response.json();
        setCollections(collectionsData);
        console.log(collectionsData);

        // Fetch game data for each collection
        const gameDataPromises = collectionsData.map(async (collection) => {
          const gameIds = collection.gameIds;
          const gamePromises = gameIds.map(async (gameId) => {
            const gameResponse = await fetch(
              `${process.env.REACT_APP_SERVER_URL}/game/${gameId}`
            );
            if (gameResponse.ok) {
              const gameData = await gameResponse.json();
              return gameData;
            } else {
              console.error(`Error fetching game with ID ${gameId}`);
              return null;
            }
          });
          // Wait for all game fetch requests for this collection to complete
          const collectionGamesData = await Promise.all(gamePromises);
          return { collectionId: collection._id, games: collectionGamesData };
        });

        // Wait for all game fetch requests for all collections to complete
        const collectionGamesData = await Promise.all(gameDataPromises);

        // Build an object to store the game data for each collection
        const collectionGamesObj = {};
        collectionGamesData.forEach((collectionData) => {
          collectionGamesObj[collectionData.collectionId] =
            collectionData.games;
        });

        console.log(collectionGamesObj);
        setCollectionGames(collectionGamesObj);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  console.log(collectionGames);

  return (
    <div className="p-3 md:p-4 text-white">
      <div className="max-w-[450px] m-auto items-center flex flex-col md:flex-row p-4">
        <div className="w-40 h-40 overflow-hidden rounded-full">
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
        <div className="md:w-2/3 p-4">
          <p className="text-sm">username</p>
          <h1 className="text-3xl font-bold">{userData.username}</h1>
          <p className="text-sm">Email</p>
          <p className="text-xl underline">{userData.email}</p>
        </div>
      </div>
      <div
        className="m-auto mt-1 flex flex-col items-center"
        onClick={handleEditAccount}
      >
        <p className="text-primary underline">Edit Account</p>
      </div>

      <div>
        <button
          className="w-full mt-10 flex flex-row max-w-[200px] m-auto  bg-sixth hover:bg-primary cursor-pointer text-black text-xl font-bold py-1 rounded-full"
          onClick={() => setIsCreatingCollection(true)}
        >
          <p className="ml-5 mr-1">My Collection</p>
          <MdEditNote size={30} />
        </button>
      </div>
      <div className="flex justify-between items-center">
        {/* show collection */}
        {collections.length > 0 ? (
          <div>
            {collections.map((collection) => (
              <div key={collection._id} className="">
                <p className="px-4 py-3 text-xl font-bold">{collection.name}</p>
                <div className="flex gap-3">
                  <div className="gap-1 flex overflow-x-auto">
                    {collectionGames[collection._id] &&
                      collectionGames[collection._id].map((game) => (
                        <Link to={`/game/${game._id}`}>
                          <div className="w-40 relative">
                            <GameProfile
                              key={game._id}
                              image={game.image}
                              name={game.name}
                              className="relative z-0"
                            />
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                {/* show game in collection */}
              </div>
            ))}
          </div>
        ) : (
          <p>No collections found</p>
        )}
      </div>
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <Editprofile className="z-10" />
        </div>
      )}
      {isCreatingCollection && (
        <div className="fixed z-999 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <CreateCollection
            className="z-999" // Increase z-index value to make the popup appear above other elements
            onClose={() => setIsCreatingCollection(false)}
            onCreate={handleCreateCollection}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
