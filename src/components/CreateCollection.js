import { useState, useEffect } from "react";
import { BiPlusCircle, BiEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";


const CreateCollection = ({ onClose, onCreate }) => {
  const [collectionName, setCollectionName] = useState("");
  const userData = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/collection/user/${userData._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      } else {
        console.error("Error fetching collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleCollectionNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  const handleDeleteCollectionClick = (collection) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deletecollection/${collection._id}`)
      .then((res) => {
        toast.success(res.data.message);
        fetchCollections();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEditCollectionClick = (collection) => {
    const newCollectionName = prompt("Enter new collection name", collection.name);
    if (newCollectionName) {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/updatecollection/${collection._id}`, {
          name: newCollectionName,
        })
        .then((res) => {
          toast.success(res.data.message);
          fetchCollections();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Save collection to MongoDB using your backend API
    try {
      // Assuming you have an API endpoint to save the collection
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/createcollection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: collectionName, userId: userData._id }),
        }
      );
      if (response.ok) {
        // Collection saved successfully
        onClose();
        onCreate(collectionName);
        toast.success("Collection created successfully");
        fetchCollections(); // Refresh collections after creating a new one
      } else {
        // Handle error saving collection
        console.error("Error saving collection");
        toast.error("Error saving collection");
      }
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("Error saving collection");
    }
  };

  const handleNewCollectionClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="bg-eighth border-solid border-4 border-black p-4 rounded w-[400px]">
      <h2 className="text-xl font-bold mb-4">Edit your collections</h2>
      <h3 className="font-bold mb-2 text-center">Your collections:</h3>
      {collections.length > 0 ? (
        <ul>
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="flex bg-tenth rounded-xl h-[60px] text-xl font-bold border-solid border-4 border-black mb-3 cursor-pointer"
            >
              <li className="px-4 py-3 ">{collection.name}</li>
              <div className="flex-grow"></div>
              <BiEdit
                size={35}
                className="mt-2 hover:text-primary"
                onClick={() => handleEditCollectionClick(collection)}
              />
              <MdOutlineDeleteForever
                size={35}
                className="mt-2 hover:text-red-500"
                onClick={() => handleDeleteCollectionClick(collection)}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>No collections found</p>
      )}
      <div
        className="flex items-center justify-center mb-4 mt-4 cursor-pointer"
        onClick={handleNewCollectionClick}
      >
        <BiPlusCircle className="text-2xl mr-2" />
        <p className="text-xl">New collection</p>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="collectionName" className="block mb-2">
            Collection Name
          </label>
          <input
            type="text"
            id="collectionName"
            placeholder="New collection Name"
            value={collectionName}
            onChange={handleCollectionNameChange}
            className="border rounded w-full py-2 px-3 mb-4 text-black"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      )}

      <button
        onClick={onClose}
        className="text-primary underline mt-2 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateCollection;
