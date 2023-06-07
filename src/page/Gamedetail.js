import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";
import profileimg from "../asset/profileimg.png";
import AddtoCollection from "../components/AddtoCollection";
import { toast } from "react-hot-toast";

const Gamedetail = () => {
  const { id: gameID } = useParams();
  const [gameData, setGameData] = useState({});
  const [userCollection, setUserCollection] = useState([]);
  const userData = useSelector((state) => state.user);

  const [isAddtoCollection, setIsAddtoCollection] = useState(false);
  const navigate = useNavigate();

  const handleAddtoCollection = () => {
    if (userData._id) {
      setIsAddtoCollection(true);
    } else {
      // Show toast notification for sign-in
      toast("Please sign in first!");
      // Redirect to the sign-in page
      navigate("/signin");
    }
  };

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

    const fetchUserCollection = async () => {
      try {
        // Fetch user collection data based on the gameID
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/collection/game/${gameID}`
        );
        const data = await response.json();

        const mappedDataUser = data.map((item) => item.user);
        setUserCollection(mappedDataUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameData();
    fetchUserCollection();
  }, [gameID], [userCollection]);

  const uniqueUsernames = [
    ...new Set(userCollection.map((user) => user.username)),
  ];
  console.log(uniqueUsernames);
  console.log(userCollection);

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
              alt={gameData.name}
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
            Genre: {gameData.genre ? gameData.genre.join(", ") : ""}
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
        <button
          className="w-full mt-5 flex flex-row max-w-[240px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold py-1 rounded-full"
          onClick={handleAddtoCollection}
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
          Users who have this game in their collection
        </p>
      </div>
      <div className="flex-col items-center justify-between py-2 ml-5 mr-5 md:ml-14 md:mr-14">
        {uniqueUsernames.map((username) => {
          const user = userCollection.find(
            (user) => user.username === username
          );
          const isCurrentUser = userData.username === user.username;
          const profileLink = isCurrentUser ? "/profile" : `/user/${user.username}`;
          return (
            <div
              key={user._id}
              className="bg-tenth w-full mb-3 rounded-lg border-solid border-4 border-eleventh"
            >
              <div className="flex px-6 md:px-8 h-24">
                <Link to={profileLink}>
                  <div className="mr-2 md:mr-0 mt-3 md:mt-2 w-[70px] h-[70px] md:w-20 md:h-20 overflow-hidden rounded-full cursor-pointer">
                    {user.image ? (
                      <img
                        className="w-full h-full"
                        src={user.image}
                        alt={user.username}
                      />
                    ) : (
                      <img
                        src={profileimg}
                        alt="Default Profile"
                        className="w-full"
                      />
                    )}
                  </div>
                </Link>
                <div className="ml-4 mt-2 md:mt-4">
                  <p className="text-xl font-bold">{user.username}</p>
                  <p className="text-sm md:text-base">
                    {isCurrentUser
                      ? "have this game in your collection"
                      : "have this game in their collection"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gamedetail;
