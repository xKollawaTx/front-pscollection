import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setDataGame } from "../redux/gameSlide";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import GameCard from "../components/GameCard";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const fetchGameData = useSelector((state) => state.game);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`);
      const resData = await res.json();
      dispatch(setDataGame(resData));
    })();
  }, []);

  const gameData = useSelector((state) => state.game.gameList);
  const newGameList = [...gameData].sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });
  newGameList.length = 15;

  const ps5gameList = gameData.filter((game) => game.platform === "ps5");
  ps5gameList.length = 15;
  
  ps5gameList.sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  const ps4gameList = gameData.filter((game) => game.platform === "ps4");

  ps4gameList.sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });
  ps4gameList.length = 15;
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      freeMode: true,
      freeModeSticky: true,
      slidesPerView: "auto",
    });
  }, []);
  return (
    <div className="p-2 md:p-4 text-white">
      <div className="md:flex">
        <div className="md:w-full md:min-h-[300px] h-[300px] md:h-[400px] rounded bg-ninth border-solid border-8 border-primary">
          <div className="flex-col h-full mt-12 md:mt-24">
            <h1 className="text-4xl md:text-6xl px-2 md:px-5 font-bold text-left">
              Welcome to <span className="text-primary">PScollection</span>
            </h1>
            <h2 className="text-2xl md:text-3xl px-2 md:px-5 font-bold mt-2">
              Create your own
              <br />
              <span className="text-primary">Playstation games</span>
              <br />
              collection
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="px-5 py-2 text-xl md:text-2xl font-bold">What's new</p>
        {userData._id ? (
          <Link to={"Whatsnew"} className="flex mr-5">
            <p className="text-xl">More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        ) : (
          <Link to={"SignIn"} className="flex mr-5">
            <p className="text-xl">Sign In for More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        )}
      </div>
      <div className="flex overflow-hidden">
        <div className="swiper-container w-40 md:w-80">
          <div className="swiper-wrapper">
            {newGameList.map((game) => (
              <div className="swiper-slide" key={game._id}>
                <Link to={`/game/${game._id}`}>
                  <GameCard
                    image={game.image}
                    name={game.name}
                    publisher={game.publisher}
                    releaseDate={game.releaseDate}
                    platform={game.platform}
                    genre={game.genre}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="px-5 py-2 text-xl md:text-2xl font-bold">PS5 Games</p>
        {userData._id ? (
          <Link to={"ps5"} className="flex mr-5">
            <p className="text-xl">More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        ) : (
          <Link to={"SignIn"} className="flex mr-5">
            <p className="text-xl">Sign In for More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        )}
      </div>
      <div className="flex overflow-hidden">
        <div className="swiper-container w-40 md:w-80">
          <div className="swiper-wrapper">
            {ps5gameList.map((game) => (
              <div className="swiper-slide" key={game._id}>
                <Link to={`/game/${game._id}`}>
                  <GameCard
                    image={game.image}
                    name={game.name}
                    publisher={game.publisher}
                    releaseDate={game.releaseDate}
                    platform={game.platform}
                    genre={game.genre}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="px-5 py-2 text-xl md:text-2xl font-bold">PS4 Games</p>
        {userData._id ? (
          <Link to={"ps4"} className="flex mr-5">
            <p className="text-xl">More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        ) : (
          <Link to={"SignIn"} className="flex mr-5">
            <p className="text-xl">Sign In for More</p>
            <AiOutlineRight className="mt-2" />
          </Link>
        )}
      </div>
      <div className="flex overflow-hidden">
        <div className="swiper-container w-40 md:w-80">
          <div className="swiper-wrapper">
            {ps4gameList.map((game) => (
              <div className="swiper-slide" key={game._id}>
                <Link to={`/game/${game._id}`}>
                  <GameCard
                    image={game.image}
                    name={game.name}
                    publisher={game.publisher}
                    releaseDate={game.releaseDate}
                    platform={game.platform}
                    genre={game.genre}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
