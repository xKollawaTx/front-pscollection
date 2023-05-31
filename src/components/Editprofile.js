import React, { useState } from "react";
import profileimg from "../asset/profileimg.png";
import { useSelector, useDispatch } from "react-redux";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import axios from "axios";

const Editprofile = ({ onClose }) => {
  const userData = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmpassword = event.target.confirmpassword.value;

    // Create an empty object to hold the updated values
    const updatedData = {};

    // Check if the email field has been modified
    if (email !== userData.email) {
      updatedData.email = email;
    }

    // Check if the username field has been modified
    if (username !== userData.username) {
      updatedData.username = username;
    }

    // Check if the password field has been modified
    if (password !== "" && password !== userData.password) {
      updatedData.password = password;
    }

    // Check if the confirmPassword field has been modified
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

    // Send a request to update the user profile if any fields have been modified
    if (Object.keys(updatedData).length > 0) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/updateuser/${userData._id}`,
          updatedData
        );

        dispatch({ type: "UPDATE_USER", payload: response.data.user });
        if (response.data.message) {
          toast.success(response.data.message);
        }
        else {
            toast.error(response.data.error);
        }
        onClose();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      // No fields have been modified, perform necessary actions (e.g., show a message)
      console.log("No changes made");
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
        <button
          type="submit"
          className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4"
        >
          Comfirm
        </button>
        <p className="text-primary underline" onClick={onClose}>
          Cancel
        </p>
      </form>
    </div>
  );
};

export default Editprofile;
