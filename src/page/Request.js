import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import "./Request.css";
import AddRequest from "../components/AddRequest";
import { useSelector } from "react-redux";
import axios from "axios";

const Request = () => {
  const userData = useSelector((state) => state.user);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);

  const fetchUserRequest = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/request/user/${userData._id}`
      );
  
      if (!response.ok) {
        throw new Error("Error fetching request");
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useState(() => {
    fetchUserRequest();
  }, []);

  const handleAddRequestClick = () => {
    setIsAddRequestOpen(true);
  };

  const handleCloseAddRequest = () => {
    setIsAddRequestOpen(false);
  };

  return (
    <div>
      <div className="p-3 md:p-4 text-white relative">
        <h1 className="text-2xl px-8 font-bold">Your Request</h1>
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <HiPlusCircle
            size={80}
            className="text-primary"
            title="Create new request"
            onClick={handleAddRequestClick}
          />
          <span className="tooltiptext">Create new request</span>
        </div>
        {isAddRequestOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <AddRequest onClose={handleCloseAddRequest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
