import React, { useState } from "react";
import profileimg from "../asset/profileimg.png";
import { useSelector, useDispatch } from "react-redux";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import axios from "axios";
import { updateUser } from "../redux/userSlice"; // Import the action creator

const Editprofile = ({ onClose }) => {
  const userData = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState(userData.email);
  const [username, setUsername] = useState(userData.username);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const confirmpassword = event.target.confirmpassword.value;

    const updatedData = {};

    if (email !== userData.email) {
      updatedData.email = email;
    }

    if (username !== userData.username) {
      updatedData.username = username;
    }

    if (password !== "" && password !== userData.password) {
      updatedData.password = password;
    }

    if (
      confirmpassword !== "" &&
      confirmpassword !== userData.confirmpassword
    ) {
      updatedData.confirmpassword = confirmpassword;
    }

    if (selectedImage) {
      try {
        const base64Image = await ImagetoBase64(selectedImage);
        updatedData.image = base64Image;
      } catch (error) {
        console.log(error);
      }
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/updateuser/${userData._id}`,
          updatedData
        );

        // Dispatch the updateUser action with the updated user data
        dispatch(updateUser(response.data.user));

        if (response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        onClose();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("No changes made");
    }
  };

  return (
    <div className="bg-eighth p-3 md:p-4 text-white border-solid border-4 border-black min-w-[350px] md:min-w-[400px]">
      <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
        <h1 className="text-center text-2xl font-bold mb-5">Edit Account</h1>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          {selectedImage ? (
            <img
              className="w-full h-full"
              src={URL.createObjectURL(selectedImage)}
              alt={userData.username}
            />
          ) : userData.image ? (
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
              onChange={(event) => setSelectedImage(event.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form
        className="m-auto py-3 flex flex-col placeholder-fifth text-left"
        onSubmit={handleEdit}
      >
        <label htmlFor="email">Email address</label>
        <div className="w-full flex px-2 py-1 bg-fourth mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type="text"
            id="email"
            name="email"
            placeholder={userData.email}
            value={email} // Use the email state value
            onChange={(e) => setEmail(e.target.value)} // Update the email state
            className="bg-fourth text-black w-full border-none outline-none"
          />
        </div>
        <label htmlFor="username">Username</label>
        <div className="w-full flex px-2 py-1 bg-fourth mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
          <input
            type="text"
            id="username"
            name="username"
            placeholder={userData.username}
            value={username} // Use the username state value
            onChange={(e) => setUsername(e.target.value)} // Update the username state
            className="bg-fourth text-black w-full border-none outline-none"
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
        <button
          type="submit"
          className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4"
        >
          Comfirm
        </button>
        <div className="justify-end flex mt-2">
        <p className="text-primary text-xl font-bold underline mt-2 cursor-pointer hover:text-red-500" onClick={onClose}>
          Cancel
        </p>
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
