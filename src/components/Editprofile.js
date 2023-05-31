import React from "react";
import profileimg from "../asset/profileimg.png";
import { useSelector, useDispatch } from "react-redux";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";

const Editprofile = ({ onClose, onCreate }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: userData.email,
    username: userData.username,
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the form data if needed

    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/updateuser/${userData._id}`, formData);
      // Handle the successful update response
      console.log(response.data);
      // Close the edit profile form
      onClose();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-eighth p-3 md:p-4 text-white border-solid border-4 border-black min-w-[350px] md:min-w-[400px]">
      <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
        <h1 className="text-center text-2xl font-bold mb-5">Edit Account</h1>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          {userData.image ? (
            <img
              className="w-full h-full"
              src={userData.image}
              alt={userData.username}
            />
          ) : (
            <img
              src={profileimg}
              alt="Default Profile"
              className="w-full h-full"
            />
          )}
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 w-full bg-opacity-50 bg-cyan-900 text-center cursor-pointer">
              <p className="text-sm text-center">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>
      <form
        className="m-auto py-3 flex flex-col placeholder-fifth text-left"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email address</label>
        <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type={"text"}
            id="email"
            name="email"
            placeholder={userData.email}
            className=" bg-fourth text-black w-full border-none outline-none"
          />
        </div>
        <label htmlFor="username">Username</label>
        <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type={"text"}
            id="username"
            name="username"
            placeholder={userData.username}
            className=" bg-fourth text-black w-full border-none outline-none"
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            className=" bg-fourth text-black w-full border-none outline-none"
          />
          <span
            className="flex text-xl cursor-pointer text-black"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm Password"
            className=" bg-fourth text-black w-full border-none outline-none"
          />
          <span
            className="flex text-xl cursor-pointer text-black"
            onClick={handleShowConfirmPassword}
          >
            {showConfirmPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-sixth hover:bg-primary cursor-pointer text-black text-xl font-bold text-center py-1 rounded-full mt-4"
          >
            Comfirm
          </button>
          <button
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-black text-xl font-bold text-center py-1 rounded-full mt-4"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
