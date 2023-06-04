import React, { useState, useEffect } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const ApproveRequest = ({ request, onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [data, setData] = useState({
    user: userData._id,
    image: request.image,
    name: request.name,
    platform: request.platform,
    genre: request.genre,
    rating: request.rating,
    publisher: request.publisher,
    state: request.state,
  });

  useEffect(() => {
    setData({
      user: userData._id,
      image: request.image,
      name: request.name,
      platform: request.platform,
      genre: request.genre,
      rating: request.rating,
      publisher: request.publisher,
      state: request.state,
    });
  }, [request, userData._id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { image, name, platform, genre, rating, publisher } = data;
  
    if (image && name && platform && genre && rating && publisher) {
      dispatch({ type: "GET_USER_ID" });
  
      // Update request
      const updateRequestResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/updaterequest/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, userId: userData._id, state: "approved" }),
        }
      );
      const updateRequestData = await updateRequestResponse.json();
      console.log(updateRequestData);
      toast.success(updateRequestData.message);
  
      // Add game
      const addGameResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/addgame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId: userData._id }),
      });
      const addGameData = await addGameResponse.json();
      console.log(addGameData);
      toast.success(addGameData.message);
  
      onClose(); // Close the component
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="p-4 text-white max-w-[400px] m-auto bg-eighth border-solid border-2 border-black">
      <div className="rounded text-white  m-auto flex items-center flex-col p-4">
        <h1 className="text-center text-2xl font-bold mb-5">Edit Game</h1>
        <label htmlFor="image">
          <div className="h-40 w-[350px] bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" alt="Game Cover" />
            ) : (
              <span className="text-6xl text-black">
                <BiCloudUpload />
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
      </div>
      <div className="max-w-[500px] min-w-[350px] mt-0">
        <form
          className="m-auto py-4 max-w-[400px] flex flex-col placeholder-fifth"
          onSubmit={handleSubmit}
        >
          <label htmlFor="gamename">Game name</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter game name"
              className="bg-fourth text-black w-full border-none outline-none"
              onChange={handleOnChange}
              value={data.name}
            />
          </div>
          {/* Rest of the form fields */}
          {/* ... */}
          <label htmlFor="platform">Platform</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <select
              className="bg-fourth text-black w-full border-none outline-none"
              name="platform"
              id="platform"
              onChange={handleOnChange}
              value={data.platform}
            >
              <option value="ps5">PS5</option>
              <option value="ps4">PS4</option>
            </select>
          </div>
          <label htmlFor="genre">Genre</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <select
              className="bg-fourth text-black w-full border-none outline-none"
              name="genre"
              id="genre"
              onChange={handleOnChange}
              value={data.genre}
            >
              <option selected>Choose genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Family">Family</option>
              <option value="Fighting">Fighting</option>
              <option value="Horror">Horror</option>
              <option value="Indy">Indy</option>
              <option value="Platformer">Platformer</option>
              <option value="Role Playing Games">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Simulation">Simulation</option>
              <option value="Sports">Sports</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <label htmlFor="rating">Rating</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <select
              className="bg-fourth text-black w-full border-none outline-none"
              name="rating"
              id="rating"
              onChange={handleOnChange}
              value={data.rating}
            >
              <option selected>Choose Rating</option>
              <option value="EVERYONE">EVERYONE</option>
              <option value="EVERYONE 10+">EVERYONE 10+</option>
              <option value="TEEN">TEEN</option>
              <option value="MATURE">MATURE</option>
              <option value="ADULTS ONLY">ADULTS ONLY</option>
              <option value="RATING PENDING">RATING PENDING</option>
              <option value="RATING PENDING-Likely Mature">RP17+</option>
              <option value="NOT RATED">NOT RATED</option>
            </select>
          </div>
          <label htmlFor="publisher">Publisher</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <input
              type="text"
              id="publisher"
              name="publisher"
              placeholder="Enter publisher"
              className="bg-fourth text-black w-full border-none outline-none"
              onChange={handleOnChange}
              value={data.publisher}
            />
          </div>
          <div className="flex">
            <button
              className="w-full max-w-[150px] m-auto bg-green-700 hover:bg-green-500 cursor-pointer text-black text-xl font-bold text-center py-1 rounded-full mt-4"
              type="submit"
            >
              Approve
            </button>
            <button
              className="w-full max-w-[150px] m-auto bg-sixth hover:bg-primary cursor-pointer text-black text-xl font-bold text-center py-1 rounded-full mt-4"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveRequest;