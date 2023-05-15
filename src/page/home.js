import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import GameCard from '../components/GameCard';
import { MdChevronLeft,MdChevronRight,Mdchevronright} from 'react-icons/md';

export const Home = () => {
  const gameData = useSelector((state) => state.game.gameList)
  const newGameList = gameData
  console.log(newGameList)
  const ps5gameList = gameData.filter(game => game.platform === 'ps5')
  console.log(ps5gameList)
  const ps4gameList = gameData.filter(game => game.platform === 'ps4')

  return (
    <div className='p-2 md:p-4 text-white'>
      <div className='md:flex'>
        <div className='md:w-full md:min-h-[300px] h-[400px] rounded bg-ninth border-solid border-8 border-primary'
        >
        <h2 className='text-4xl md:text-6xl px-2 md:px-5 font-bold text-left py-20 md:py-28 sm:text-2xl sm:py-10'>Create your own<br></br><span className='text-primary'>Playstation games<br></br></span> collection</h2>
        </div>
        
      </div>
      <p className='px-2 py-2 text-xl md:text-2xl font-bold'>What's new<br></br></p>
      <div className='flex gap-3'>
        <div className='gap-8 flex scrollbar-hide overflow-scroll'>
          {
            newGameList.map(game => {
              return (
                //display game image and name from gameData
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                />
              )
            })
          }
        </div>
      </div>
      <p className='px-2 py-2 text-xl md:text-2xl font-bold'>PS5 Games</p>
      <div className='flex gap-3'>
        <div className='gap-8 flex scrollbar-hide overflow-scroll'>
          {
            ps5gameList.map(game => {
              return (
                //display game image and name from gameData
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                />
              )
            })
          }
        </div>
      </div>
      <p className='px-2 py-2 text-xl md:text-2xl font-bold'>PS4 Games</p>
      <div className='flex gap-3'>
        <div className='gap-8 flex scrollbar-hide overflow-scroll'>
          {
            ps4gameList.map(game => {
              return (
                //display game image and name from gameData
                <GameCard
                  key={game._id}
                  image={game.image}
                  name={game.name}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Home;