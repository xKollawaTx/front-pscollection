import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setDataGame } from "../redux/gameSlide";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const options = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Family", label: "Family" },
  { value: "Fighting", label: "Fighting" },
  { value: "Horror", label: "Horror" },
  { value: "Indy", label: "Indy" },
  { value: "Platformer", label: "Platformer" },
  { value: "RPG", label: "Role Playing Games" },
  { value: "Shooter", label: "Shooter" },
  { value: "Simulation", label: "Simulation" },
  { value: "Sports", label: "Sports" },
  { value: "Strategy", label: "Strategy" },
];

const Addgame = () => {
  const [data, setData] = useState({
    image: "",
    name: "",
    platform: "",
    genre: [],
    rating: "",
    publisher: "",
    dateAdded: new Date(),
  });
  
  const handleOnChange = (selectedGenres) => {
    if (Array.isArray(selectedGenres)) {
      const genreValues = selectedGenres.map((genre) => genre.value);
      setData((prev) => ({
        ...prev,
        genre: genreValues,
      }));
    } else {
      const { name, value } = selectedGenres.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { image, name, platform, genre, rating, publisher } = data;

    if (image && name && platform && genre.length > 0 && rating && publisher) {
      setData((prev) => ({
        ...prev,
        dateAdded: new Date(),
      }));

      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/addgame`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const fetchDataRes = await fetchData.json();

      toast(fetchDataRes.message);

      setData({
        image: "",
        name: "",
        platform: "",
        genre: [],
        rating: "",
        publisher: "",
        dateAdded: new Date(),
      });
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <div className="p-4 text-white max-w-[500px] m-auto">
      <div className=" rounded text-white  m-auto flex items-center flex-col p-4 border-solid border-2 border-black bg-eighth">
        <h1 className="text-center text-2xl font-bold mb-5">Add game</h1>
        <label htmlFor="image">
          <div className="h-40 w-[350px] bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-6xl text-black">
                <BiCloudUpload />
              </span>
            )}
            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
      </div>
      <div className="max-w-[500px] min-w-[350px] mt-4 border-solid border-2 border-black bg-eighth">
        <form
          className="m-auto py-4 max-w-[400px] flex flex-col placeholder-fifth"
          onSubmit={handleSubmit}
        >
          <label htmlFor="gamename">Game name</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <input
              type={"text"}
              id="name"
              name="name"
              placeholder="Enter game name"
              className=" bg-fourth text-black w-full border-none outline-none"
              onChange={handleOnChange}
              value={data.name}
            />
          </div>
          <label className="mb-1" htmlFor="platform">
            Platform
          </label>
          <hr className="mb-3"></hr>
          <div className="w-full mb-2 px-1 py-1 bg-fourth text-black rounded focus-within:outline focus-within:outline-primary">
            <select
              className="bg-fourth text-black w-full rounded"
              name="platform"
              onChange={handleOnChange}
              value={data.platform}
            >
              <option selected>Choose Platform</option>
              <option value="ps5">PS5</option>
              <option value="ps4">PS4</option>
            </select>
          </div>
          <label className="mb-1" htmlFor="genre">
            Genre
          </label>
          <hr className="mb-3"></hr>
          <div className=" w-full mb-2 px-1 py-1 bg-fourth text-black rounded focus-within:outline focus-within:outline-primary">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#D9D9D9",
                primary: "black",
              },
            })}
            value={options.filter((option) => data.genre.includes(option.value))}
            onChange={handleOnChange}
          />
        </div>
          <label className="mb-1" htmlFor="rating">
            Rating
          </label>
          <hr className="mb-3"></hr>
          <div className="w-full mb-2 px-1 py-1 bg-fourth text-black rounded focus-within:outline focus-within:outline-primary">
            <select
              className="bg-fourth text-black w-full rounded"
              name="rating"
              onChange={handleOnChange}
              value={data.rating}
            >
              <option selected>Choose Rating</option>
              <option value="EVERYONE">EVERYONE</option>
              <option value="EVERYONE 10+">EVERYONE 10+</option>
              <option value="TEEN">TEEN</option>
              <option value="MATURE">MATURE</option>
              <option value="RATING PENDING">RATING PENDING</option>
            </select>
          </div>
          <label htmlFor="publisher">Publisher</label>
          <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <input
              type={"text"}
              id="publisher"
              name="publisher"
              placeholder="Enter publisher"
              className=" bg-fourth text-black w-full border-none outline-none"
              onChange={handleOnChange}
              value={data.publisher}
            />
          </div>
          <div className="flex">
            <button className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4">
              Confirm
            </button>
            {/* <button className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4">
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Addgame;
