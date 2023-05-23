import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataGame } from "./redux/gameSlide";


function App() {
  const dispatch = useDispatch()
  const gameData = useSelector((state)=>state.game)
  
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/game`)
      const resData = await res.json()
      dispatch(setDataGame(resData))
    })()
  },[])

  console.log(gameData)

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-second min-h-[calc(100vh)] text-white">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
