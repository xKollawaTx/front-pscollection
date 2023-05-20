import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

const DeleteGame = () => {
  const gameData = useSelector((state) => state.game.gameList);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [editedGame, setEditedGame] = useState(null);
  const handleSearch = () => {
    const searchedGames = gameData.filter((game) =>
      game.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(searchedGames);
  };

  const handleEdit = (gameId) => {
    // Find the game by ID
    const gameToEdit = gameData.find((game) => game._id === gameId);

    // Set the selected game and open the edit modal
    setSelectedGame(gameToEdit);
    setEditedGame({ ...gameToEdit }); // Copy the selected game to editedGame state
    setEditModalOpen(true);
  };

  const handleDelete = (gameId) => {
    //delete game uses the gameId to delete the game from the database
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deletegame/${gameId}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Delete game:", gameId);
  };

  const handleSave = () => {
    // Perform the logic to save the edited game
    // Update the backend or update local state, etc.
    console.log('Saving edited game:', editedGame);
    setEditModalOpen(false); // Close the edit modal
  };
  return (
    <div className="p-4 text-white max-w-[500px] m-auto">
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
          <h2 className="text-xl font-bold mb-3 text-center">Game Data:</h2>
          {searchResults.length > 0 ? (
            searchResults.map((game) => (
              <div key={game.id} className="mb-4">
                <div className="h-40 w-[300px] bg-slate-200 rounded flex items-center justify-center cursor-pointer">
                  <img className="h-full" src={game.image} alt={game.name} />
                </div>
                <p>id:{game._id}</p>
                <p>Name: {game.name}</p>
                <p>Genre: {game.gener}</p>
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
                    <Modal
                        isOpen={editModalOpen}
                        onRequestClose={() => setEditModalOpen(false)}
                        contentLabel="Edit Game"
                    >
                        <h2>Edit Game</h2>
                        <form onSubmit={handleSave}>
                            <input
                                type="text"
                                value={editedGame.name}
                                onChange={(e) => setEditedGame({ ...editedGame, name: e.target.value })}
                            />
                            <button type="submit">Save</button>
                            <button onClick={() => setEditModalOpen(false)}>Cancel</button>
                        </form>
                    </Modal>
                  <button
                    className="p-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(game._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No games found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteGame;
