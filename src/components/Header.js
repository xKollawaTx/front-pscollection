import React, { useState } from "react";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import profileimg from "../asset/profileimg.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData.username);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  }
  const handleLogout = () => {
    dispatch(logoutRedux())
    toast.success("Sign Out Success");
    setTimeout(() => {
      navigate("/");
    }, 1000)

  }

  return (
    <header className="bg-primary fixed shadow-md w-full h-16 z-50">
      {/* desktop */}
      <div className="flex items-center h-full justify-between ">
        <div className="flex items-center gap-4 hidden md:flex">
          <Link to={""}>
            <div className="h-16 ml-3">
              <img src={logo} className="h-16" />
            </div>
          </Link>
          <div>
            <FaSearch className="text-white text-2xl" />
          </div>
        </div>
        {/* mobile */}

        <div className="flex-1 text-center  md:hidden flex items-center justify-center">
          <Link to={""}>
            <div className="h-16">
              <img src={logo} className="h-16 ml-20" />
            </div>
          </Link>
          <div className="absolute left-0">
            <FaSearch className="text-white text-2xl m-3" />
          </div>
        </div>

        <div className="flex items-center">
          <nav className="text-white gap-4 md:text-lg hidden md:flex">
            <Link to={""} className="">
              Home
            </Link>
            <Link to={"Whatsnew"} className="">
              What's New
            </Link>
            <Link to={"Ps5"} className="">
              PS5
            </Link>
            <Link to={"Ps4"} className="">
              PS4
            </Link>
          </nav>
          <div className="text-white ml-5 mr-5">
            <div className="text-4xl text-center cursor-pointer rounded-full w-10 h-10 overflow-hidden drop-shadow-md" onClick={handleShowMenu}>
              {userData.image ? <img className="w-full h-full" src={userData.image} /> : <img src={profileimg} />}
            </div>
            {showMenu && (
              <div className="absolute flex-column right-3 bg-third mt-1 mr-4 max-w-[200px] border-solid border-2 border-black">
                {
                  userData.username && <p className="px-3 text-xl">{userData.username}<hr></hr></p>
                }
                {
                  userData.username && <Link to={"Profile"} className="hover:text-blue-300 py-3 px-3">Your account<br></br></Link>
                }
                {
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"Addgame"} className="hover:text-blue-300 py-3 px-3 mb-2">Admin panel<br></br></Link>
                }
                {
                  userData.username && <Link to={"Request"} className="hover:text-blue-300 py-3 px-3">Request<br></br></Link>
                }

                {
                  userData.image ? <a className="cursor-pointer underline hover:text-red-700 py-3 px-3" onClick={handleLogout} >Sign Out</a> : <Link to={"Signin"} className="hover:text-blue-300 underline py-3 px-3 ">Sign In</Link>
                }
                {/* mobile */}
                <nav className="text-white md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="hover:text-blue-300 px-3">
                  <hr className="mt-1 mb-1"></hr>Home
                  </Link>
                  <Link to={"Whatsnew"} className="hover:text-blue-300 px-3 py-1">
                    What's New
                  </Link>
                  <Link to={"Ps5"} className="hover:text-blue-300 px-3 py-1">
                    PS5
                  </Link>
                  <Link to={"Ps4"} className="hover:text-blue-300 px-3 py-1">
                    PS4
                  </Link>
                </nav>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
