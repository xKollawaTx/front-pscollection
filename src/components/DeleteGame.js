import React, { useDebugValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import { BiCloudUpload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setDataGame } from "../redux/gameSlide";
import GenreSelect from "./GenreSelect";

const DeleteGame = () => {
  const dispatch = useDispatch();
  const gameeditedGame = useSelector((state) => state.game.gameList);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [editedGame, setEditedGame] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  //fetch all games from the database
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/games`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`);
    const resData = await res.json();
    dispatch(setDataGame(resData));

    const searchedGames = resData.filter((game) =>
      game.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(searchedGames);
  };

  const handleEdit = (gameId) => {
    // Find the game by ID
    const gameToEdit = gameeditedGame.find((game) => game._id === gameId);

    // Set the selected game and open the edit modal
    setSelectedGame(gameToEdit);
    setEditedGame({ ...gameToEdit }); // Copy the selected game to editedGame state
    setSelectedGenres(gameToEdit.genre); // Set selected genres
    setEditModalOpen(true); // Add this line to open the edit modal
    console.log("Edit game:", gameId);
  };

  const handleDelete = (event, gameId) => {
    event.preventDefault();
    // Delete game using the gameId to delete the game from the database
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deletegame/${gameId}`)
      .then((res) => {
        toast.success(res.data.message); // Display success message in toast
        // Update search results by filtering out the deleted game
        setSearchResults((prevResults) =>
          prevResults.filter((game) => game._id !== gameId)
        );
        handleSearch(); // Trigger search again
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete game"); // Display error message in toast
      });
    console.log("Delete game:", gameId);
  };

  const handleSave = (event) => {
    event.preventDefault();
    
    // Update the genres of the edited game
    const updatedGame = { ...editedGame, genre: selectedGenres };
    
    // Perform the logic to save the edited game
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/editgame/${updatedGame._id}`, updatedGame)
      .then((res) => {
        toast.success(res.data.message);
        setEditModalOpen(false); // Close the edit modal
        handleSearch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`);
      const resData = await res.json();
      dispatch(setDataGame(resData));
    })();
  }, [editedGame, dispatch]);

  useEffect(() => {
    if (!editModalOpen) {
      setEditedGame(null);
      setSelectedGame(null);
    }
  }, [editModalOpen]);

  const editGameImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await ImagetoBase64(file);
      setEditedGame({ ...editedGame, image: base64Image });
    }
  };

  return (
    <div className="z-999 p-4 text-white max-w-[500px] m-auto">
      <div className="rounded text-white m-auto flex items-center flex-col p-4 border-solid border-2 border-black bg-eighth">
        <h1 className="text-center text-2xl font-bold mb-5">
          Edit/Delete game
        </h1>
        <div className="flex flex-col">
          <label className="text-xl font-bold">Search game</label>
          <input
            type="text"
            className="p-2 rounded border-solid border-2 border-black bg-eighth"
            placeholder="Enter game name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="p-2 mt-2 bg-blue-500 text-white rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3 text-center">
            Game editedGame:
          </h2>
          {searchResults.length > 0 ? (
            searchResults.map((game) => (
              <div key={game.id} className="mb-4">
                <div className="h-40 w-[300px] bg-slate-200 rounded flex items-center justify-center cursor-pointer">
                  <img className="h-full" src={game.image} alt={game.name} />
                </div>
                <p>id:{game._id}</p>
                <p>Name: {game.name}</p>
                Genre: {game.genre.join(",")}
                <p>Platform: {game.platform}</p>
                <p>Publisher: {game.publisher}</p>
                <p>Date Added: {game.dateAdded}</p>
                <div className="flex justify-center mt-2">
                  <button
                    className="p-2 bg-green-500 text-white rounded mr-2"
                    onClick={() => handleEdit(game._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded"
                    onClick={(event) => handleDelete(event, game._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No games found.</p>
          )}
          {editModalOpen && selectedGame && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-eighth p-4 min-w-[350px] min-h-[400px] md:min-w-[500px] md:h-[510px] rounded-lg">
                <h2 className="text-xl text-center font-bold mb-2">
                  Edit Game
                </h2>
                <label htmlFor="gameimage">Game Image</label>
                <div
                  className="h-40 min-w-[350px] md:min-w-[400px] bg-slate-200 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById("gameimage").click()}
                >
                  {editedGame.image ? (
                    <img
                      className="h-full"
                      src={editedGame.image}
                      alt={editedGame.name}
                    />
                  ) : (
                    <span className="text-6xl text-black">
                      <BiCloudUpload />
                    </span>
                  )}
                </div>
                <div className="flex justify-center mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={editGameImage}
                    id="gameimage"
                    className="hidden"
                  />
                  <div
                    className="absolute bottom-2 right-2 p-1 bg-white text-black rounded cursor-pointer"
                    onClick={() => document.getElementById("gameimage").click()}
                  >
                    Change Image
                  </div>
                </div>
                <form onSubmit={handleSave} className="">
                  {/* Render edit form fields */}
                  <label htmlFor="gamename">Game name</label>
                  <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                      type={"text"}
                      id="name"
                      name="name"
                      placeholder="Enter game name"
                      className=" bg-fourth text-black w-full border-none outline-none"
                      onChange={(e) =>
                        setEditedGame({ ...editedGame, name: e.target.value })
                      }
                      value={editedGame.name}
                    />
                  </div>
                  <label htmlFor="platform">Platform</label>
                  <div className="w-full mb-2 px-1 py-1 bg-fourth text-black rounded focus-within:outline focus-within:outline-primary">
                    <select
                      className="bg-fourth text-black w-full rounded"
                      name="platform"
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          platform: e.target.value,
                        })
                      }
                      value={editedGame.platform}
                    >
                      <option selected>{editedGame.platform}</option>
                      {editedGame.platform === "ps5" ? (
                        <option value="ps4">PS4</option>
                      ) : (
                        <option value="ps5">PS5</option>
                      )}
                    </select>
                  </div>
                  <label htmlFor="genre">Genre</label>
                  <div className="w-full mb-2 px-1 py-1 bg-fourth text-black rounded focus-within:outline focus-within:outline-primary">
                    <GenreSelect
                      selectedGenres={selectedGenres}
                      setSelectedGenres={setSelectedGenres}
                    />
                  </div>
                  <label htmlFor="rating">Rating</label>
                  <div className="w-full flex px-1 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <select
                      className="bg-fourth text-black w-full rounded"
                      name="rating"
                      onChange={(e) =>
                        setEditedGame({ ...editedGame, rating: e.target.value })
                      }
                      value={editedGame.rating}
                    >
                      <option selected>Choose Rating</option>
                      <option value="EVERYONE">EVERYONE</option>
                      <option value="EVERYONE 10+">EVERYONE 10+</option>
                      <option value="TEEN">TEEN</option>
                      <option value="MATURE">MATURE</option>
                      <option value="ADULTS ONLY">ADULTS ONLY</option>
                      <option value="RATING PENDING">RATING PENDING</option>
                      <option value="RATING PENDING-Likely Mature">
                        RP17+
                      </option>
                      <option value="NOT RATED">NOT RATED</option>
                    </select>
                  </div>

                  <label htmlFor="publisher">Publisher</label>
                  <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                      type={"text"}
                      id="publisher"
                      name="publisher"
                      placeholder="Enter publisher"
                      className=" bg-fourth text-black w-full border-none outline-none"
                      onChange={(e) =>
                        setEditedGame({
                          ...editedGame,
                          publisher: e.target.value,
                        })
                      }
                      value={editedGame.publisher}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteGame;
