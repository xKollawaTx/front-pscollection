import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import profileimg from "../asset/profileimg.png";
import axios from "axios";

const Userprofile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const loggedInUser = useSelector((state) => state.user);

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getuser/${username}`
      );
      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
        fetchCollections(userData._id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCollections = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/collection/user/${userId}`
      );
      if (response.status === 200) {
        const collectionsData = response.data;
        setCollections(collectionsData);
        console.log(collectionsData);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <div className="p-3 md:p-4 text-white">
      <div className="max-w-[450px] m-auto items-center flex flex-col md:flex-row p-4">
        <div className="w-40 h-40 overflow-hidden rounded-full">
          {userData && userData.image ? (
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
        </div>
        <div className="md:w-2/3 p-4">
          <p className="text-sm">username</p>
          <h1 className="text-3xl font-bold">
            {userData && userData.username}
          </h1>
          <p className="text-sm">Email</p>
          <p className="text-xl underline">{userData && userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
