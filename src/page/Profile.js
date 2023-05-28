import React from "react";
import profileimg from "../asset/profileimg.png";
import { useSelector, useDispatch } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";
import CreateCollection from "../components/CreateCollection";
import Editprofile from "../components/Editprofile";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userData = useSelector((state) => state.user);
  const handleEditAccount = () => {
    setIsEditing((prev) => !prev);
  };
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const handleCreateCollection = (collectionName) => {
    // Perform the necessary actions to create the collection
    // For example, make an API request to the backend

    // Close the pop-up
    setIsCreatingCollection(false);
  };
  const handleCreateCollectionClick = () => {
    setIsCreatingCollection(true);
  };

  return (
    <div className="p-3 md:p-4 text-white">
      <div className="max-w-[450px] m-auto items-center flex flex-col md:flex-row p-4">
        <div className="w-40 h-40 overflow-hidden rounded-full">
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
        </div>
        <div className="md:w-2/3 p-4">
          <p className="text-sm">username</p>
          <h1 className="text-3xl font-bold">{userData.username}</h1>
          <p className="text-sm">Email</p>
          <p className="text-xl underline">{userData.email}</p>
        </div>
      </div>
      <div
        className="m-auto mt-1 flex flex-col items-center"
        onClick={handleEditAccount}
      >
        <p className="text-primary underline">Edit Account</p>
      </div>
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <Editprofile />
        </div>
      )}
      <div>
        <button
          className="w-full mt-10 flex flex-row max-w-[200px] m-auto  bg-sixth hover:bg-primary cursor-pointer text-black text-xl font-bold py-1 rounded-full"
          onClick={() => setIsCreatingCollection(true)}
        >
          <p className="ml-5 mr-1">My Collection</p>
          <MdEditNote size={30} />
        </button>
      </div>
      {isCreatingCollection && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <CreateCollection
            onClose={() => setIsCreatingCollection(false)}
            onCreate={handleCreateCollection}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
