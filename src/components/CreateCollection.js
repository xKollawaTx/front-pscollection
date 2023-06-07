import { useState, useEffect } from "react";
import { BiPlusCircle, BiEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {BsCheckCircle} from "react-icons/bs";
import axios from "axios";

const CreateCollection = ({ onClose, onCreate }) => {
  const [collectionName, setCollectionName] = useState("");
  const userData = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [collections, setCollections] = useState([]);
  const [editingCollectionId, setEditingCollectionId] = useState(null);

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
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/deletecollection/${collection._id}`
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchCollections();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEditCollectionClick = (collection) => {
    setEditingCollectionId(collection._id);
    setCollectionName(collection.name);
  };

  const handleSaveCollectionClick = (collectionId) => {
    const editedCollection = collections.find(
      (collection) => collection._id === collectionId
    );

    if (editedCollection) {
      if (!collectionName) {
        toast.error("Please enter a collection name");
        return;
      }

      if (editedCollection.name !== collectionName) {
        axios
          .put(
            `${process.env.REACT_APP_SERVER_URL}/updatecollection/${collectionId}`,
            {
              name: collectionName,
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            fetchCollections();
            setEditingCollectionId(null);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        setEditingCollectionId(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!collectionName) {
      toast.error("Please enter a collection name");
      return;
    }

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
              {editingCollectionId === collection._id ? (
                <input
                  type="text"
                  value={collectionName}
                  onChange={handleCollectionNameChange}
                  className="bg-fourth text-black w-[280px] border-none outline-none px-4 py-3"
                />
              ) : (
                <li className="px-4 py-3 ">{collection.name}</li>
              )}
              <div className="flex-grow"></div>
              {editingCollectionId === collection._id ? (
                <BsCheckCircle
                  size={30}
                  className="mt-3 hover:text-primary"
                  onClick={() => handleSaveCollectionClick(collection._id)}
                />
              ) : (
                <BiEdit
                  size={35}
                  className="mt-2 hover:text-primary"
                  onClick={() => handleEditCollectionClick(collection)}
                />
              )}
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
        <form
          className="m-auto py-3 flex flex-col placeholder-fifth text-left"
          onSubmit={handleSubmit}
        >
          <label htmlFor="collectionName" className="block mb-2">
            Collection Name
          </label>
          <div className="w-full flex px-2 py-1 h-9 bg-fourth mt-0 mb-2 rounded focus-within:outline focus-within:outline-primary">
            <input
              type="text"
              id="collectionName"
              placeholder="New collection name"
              value={collectionName}
              onChange={handleCollectionNameChange}
              className="bg-fourth text-black w-full border-none outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4"
          >
            Create
          </button>
        </form>
      )}
      <div className="flex justify-end">
        <p
          onClick={onClose}
          className="text-primary text-xl font-bold underline mt-2 cursor-pointer hover:text-red-500"
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default CreateCollection;
