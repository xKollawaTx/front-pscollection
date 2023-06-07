import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDataGame } from "../redux/gameSlide";

import "swiper/swiper-bundle.css";

const GameSlider = ({}) => {
  const dispatch = useDispatch();
  const fetchGameData = useSelector((state) => state.game);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`);
      const resData = await res.json();
      dispatch(setDataGame(resData));
    })();
  }, []);

  const gameData = useSelector((state) => state.game.gameList);

  // Create a new array and sort it by dateAdded
  const newGameList = [...gameData].sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      freeMode: true,
      freeModeSticky: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        grabCursor: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
    });
  }, []);

  return (
    <div className="flex gap-3">
      <div className="gap-1 flex scrollbar-hide overflow-scroll">
        <div className="swiper-container">
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
    </div>
  );
};

export default GameSlider;
