import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import GameCard from '../components/GameCard';
import GameProfile from '../components/GameProfile';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const Home = () => {
  const gameData = useSelector((state) => state.game.gameList)
  const newGameList = gameData.slice(0, 10)
  console.log(newGameList)
  const ps5gameList = gameData.filter(game => game.platform === 'ps5')
  console.log(ps5gameList)
  const ps4gameList = gameData.filter(game => game.platform === 'ps4')

  return (
    <div className='p-2 md:p-4 text-white'>
      <div className='md:flex'>
        <div className='md:w-full md:min-h-[300px] h-[300px] md:h-[400px] rounded bg-ninth border-solid border-8 border-primary'
        >
          <h2 className='text-4xl md:text-6xl px-2 md:px-5 font-bold text-left py-20 md:py-28 sm:text-2xl sm:py-10'>Create your own<br></br><span className='text-primary'>Playstation games<br></br></span> collection</h2>
        </div>

      </div>
      <div className='flex justify-between items-center'>
        <p className='px-5 py-2 text-xl md:text-2xl font-bold'>What's new<br></br></p>
        <Link to={"Whatsnew"} className='flex mr-5'>
          <p className='text-xl'>More</p>
          <AiOutlineRight className='mt-2' />
        </Link>
      </div>
      <div className='flex gap-3'>
        <div className='gap-1 flex scrollbar-hide overflow-scroll'>
          {
            newGameList.map(game => {
              return (
                <Link to={`/game/${game._id}`}>
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                  publisher={game.publisher}
                  releaseDate={game.releaseDate}
                  platform={game.platform}
                  genre={game.genre}
                />
                </Link>
              )
            })
          }
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='px-5 py-2 text-xl md:text-2xl font-bold'>PS5 Games<br></br></p>
        <Link to={"Ps5"} className='flex mr-5'>
          <p className='text-xl'>More</p>
          <AiOutlineRight className='mt-2' />
        </Link>
      </div>
      <div className='flex gap-3'>
        <div className='gap-1 flex scrollbar-hide overflow-scroll'>
          {
            ps5gameList.map(game => {
              return (
                //display game image and name from gameData
                <Link to={`/game/${game._id}`}>
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                  publisher={game.publisher}
                  releaseDate={game.releaseDate}
                  platform={game.platform}
                  genre={game.gener}
                />
                </Link>
              )
            })
          }
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='px-5 py-2 text-xl md:text-2xl font-bold'>PS4 Games<br></br></p>
        <Link to={"Ps4"} className='flex mr-5'>
          <p className='text-xl'>More</p>
          <AiOutlineRight className='mt-2' />
        </Link>
      </div>
      <div className='flex gap-3'>
        <div className='gap-1 flex scrollbar-hide overflow-scroll'>
          {
            ps4gameList.map(game => {
              return (
                //display game image and name from gameData
                <Link to={`/game/${game._id}`}>
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                  publisher={game.publisher}
                  releaseDate={game.releaseDate}
                  platform={game.platform}
                  genre={game.genre}
                />
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Home;