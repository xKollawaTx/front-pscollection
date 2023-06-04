import React from "react";
import profileimg from "../asset/profileimg.png";
import { BiFilter } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import GameFeature from "../components/GameFeature";
import { useSelector, useDispatch } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";
import CreateCollection from "../components/CreateCollection";
import Editprofile from "../components/Editprofile";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loginRedux } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionGames, setCollectionGames] = useState({});
  const [showDeleteGamePopup, setShowDeleteGamePopup] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGames, setSelectedGames] = useState([]);
  const handleDeleteGamePopup = () => {
    setShowDeleteGamePopup(true);
  };

  const handleEditAccount = () => {
    setIsEditing(false);
  };

  const handleCreateCollection = (collectionName) => {
    // Perform the necessary actions to create the collection
    // For example, make an API request to the backend

    // Close the pop-up
    setIsCreatingCollection(false);
  };
  const handleCreateCollectionClick = () => {
    setIsCreatingCollection(true);
  };
  //fetch UserData after editing account
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/${userData._id}`
      );
      if (response.ok) {
        const userData = await response.json();
        dispatch(loginRedux(userData));
        console.log(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
   
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    fetchUserData();
  }, [userData._id]);
  console.log(userData);
  useEffect(() => {
    fetchCollections();
  }, [isCreatingCollection]);

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

        // Set the default collection to the first collection in the array
        if (collectionsData.length > 0) {
          setSelectedCollection(collectionsData[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  //showselectedcollectionid
  console.log(selectedCollection);
  console.log(selectedGame);
  const handleSelectCollection = (collectionId) => {
    setSelectedCollection(collectionId);
  };
  const handleCheckboxChange = (gameId) => {
    // Check if the game ID is already in the selected games array
    const isSelected = selectedGames.includes(gameId);

    if (isSelected) {
      // If the game is already selected, remove it from the array
      setSelectedGames((prevSelectedGames) =>
        prevSelectedGames.filter((id) => id !== gameId)
      );
    } else {
      // If the game is not selected, add it to the array
      setSelectedGames((prevSelectedGames) => [...prevSelectedGames, gameId]);
    }
  };
  const handleDeleteGame = () => {
    selectedGames.forEach((gameId) => {
      axios
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/collection/${selectedCollection}/deletegame/${gameId}`
        )
        .then((res) => {
          toast.success(res.data.message);
          fetchCollections();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
    setSelectedGames([]); // Clear the selected games array after deletion
  };
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
        onClick={() => setIsEditing(true)}
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
      <div>
        {/* Button to select collection */}
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
        {/* show selected collection */}
        {selectedCollection && (
          <div>
            {collections.map((collection) => {
              if (collection._id === selectedCollection) {
                return (
                  <div key={collection._id} className="">
                    <div className="px-5 py-5 md:px-20 flex justify-between items-center">
                      <p className=" text-2xl md:text-2xl font-bold ">
                        {collection.name}
                      </p>
                      <div className="flex gap-1">
                        <BiFilter size={50} className="" />
                        <MdOutlineDeleteForever
                          size={50}
                          className=""
                          onClick={handleDeleteGamePopup}
                        />
                      </div>
                    </div>
                    {collectionGames[collection._id] &&
                    collectionGames[collection._id].length > 0 ? (
                      <div className="flex gap-1">
                        <div className="flex flex-wrap md:gap-5 justify-center">
                          {collectionGames[collection._id].map((game) => (
                            <Link to={`/game/${game._id}`}>
                              <GameFeature
                                key={game._id}
                                image={game.image}
                                name={game.name}
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="px-5 py-5 md:px-20 flex justify-between items-center">
                        You don't have games in this collection
                      </p>
                    )}
                    {/* show games in collection */}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
      {showDeleteGamePopup && (
        <div className="fixed z-999 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-eighth border-solid border-4 border-black p-4 rounded w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              Delete game from your collection
            </h2>
            <div className="mt-4">
              {collectionGames[selectedCollection] &&
              collectionGames[selectedCollection].length > 0 ? (
                collectionGames[selectedCollection].map((game) => (
                  <div
                    key={game._id}
                    className="flex items-center p-2 gap-3 border-b"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game._id)}
                      onChange={() => handleCheckboxChange(game._id)}
                    />
                    <p>{game.name}</p>
                  </div>
                ))
              ) : (
                <p>No games in this collection</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-primary underline rounded-md mr-2"
                onClick={() => setShowDeleteGamePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteGame}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <Editprofile className="z-10" onClose={() => setIsEditing(false)} />
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
