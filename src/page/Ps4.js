import React from "react";
import { Link } from "react-router-dom";
import { BiFilter } from "react-icons/bi";
import { useSelector } from "react-redux";
import GameFeature from "../components/GameFeature";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDataGame } from "../redux/gameSlide";
import { useState } from "react";

export const Ps4 = () => {
  const dispatch = useDispatch()
  const fetchGameData = useSelector((state)=>state.game)
  
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`)
      const resData = await res.json()
      dispatch(setDataGame(resData))
    })()
  },[])
  console.log(fetchGameData)
  const gameData = useSelector((state) => state.game.gameList);
  const ps4GameList = gameData.filter((game) => game.platform === "ps4");
  const [showFilter, setShowFilter] = useState(false); // State to track filter visibility
  const [selectedPlatform, setSelectedPlatform] = useState("any");
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSelectedSortBy(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const filteredData = ps4GameList.filter((game) => {
    const platformMatch = selectedPlatform === "any" || game.platform === selectedPlatform;
    const genreMatch = selectedGenre === "" || game.genre === selectedGenre;
    const ratingMatch = selectedRating === "" || game.rating === selectedRating;

    return platformMatch && genreMatch && ratingMatch;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (selectedSortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (selectedSortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (selectedSortBy === "date-added-new-old") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (selectedSortBy === "date-added-old-new") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <div className="p-2 md:p-4 text-white">
      <div className="px-5 py-5 md:px-20 flex justify-between items-center">
        <p className="text-2xl md:text-2xl font-bold">
          PS4 Games<br></br>
        </p>
        <BiFilter size={50} className="" onClick={handleFilterClick}/>
      </div>
      {showFilter && (
        <div className="p-5 md:p-10 bg-eighth">
          <h2 className="text-lg font-bold mb-3">Filter Options</h2>
          <div className="mb-3">
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-bold">Sort By:</label>
            <select
              value={selectedSortBy}
              onChange={handleSortByChange}
              className="w-full p-2 border third rounded-md bg-fourth text-black"
            >
              <option value="">None</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date-added-new-old">Date Added (New-Old)</option>
              <option value="date-added-old-new">Date Added (Old-New)</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-bold ">Genre:</label>
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full p-2 border third rounded-md bg-fourth text-black"
            >
              <option value="">Any</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Family">Family</option>
              <option value="Fighting">Fighting</option>
              <option value="Horror">Horror</option>
              <option value="Indy">Indy</option>
              <option value="Platformer">Platformer</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Simulation">Simulation</option>
              <option value="Sports">Sports</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">Rating:</label>
            <select
              value={selectedRating}
              onChange={handleRatingChange}
              className="w-full p-2 border bg-fourth text-black border-third rounded-md"
            >
              <option value="">Any</option>
              <option value="EVERYONE">EVERYONE</option>
              <option value="EVERYONE 10+">EVERYONE 10+</option>
              <option value="TEEN">TEEN</option>
              <option value="MATURE">MATURE</option>
              <option value="ADULTS ONLY">ADULTS ONLY</option>
              <option value="RATING PENDING">RATING PENDING</option>
              <option value="RATING PENDING-Likely Mature">RP17+</option>
              <option value="NOT RATED">NOT RATED</option>
            </select>
          </div>
        </div>
      )}
      <div className="flex flex-wrap md:gap-5 justify-center">
        {sortedData.map((game) => {
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
export default Ps4;
