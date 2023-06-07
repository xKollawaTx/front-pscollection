import React, { useState, useEffect } from "react";
import { HiPlusCircle } from "react-icons/hi";
import "./Request.css";
import AddRequest from "../components/AddRequest";
import EditRequest from "../components/EditRequest";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const Request = () => {
  const userData = useSelector((state) => state.user);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [isEditRequestOpen, setIsEditRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchUserRequest();
  }, [isAddRequestOpen, isEditRequestOpen]);

  const fetchUserRequest = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/request/user/${userData._id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching request");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  const handleAddRequestClick = () => {
    setIsAddRequestOpen(true);
  };

  const handleCloseAddRequest = () => {
    setIsAddRequestOpen(false);
  };

  const handleEditRequestClick = (request) => {
    setSelectedRequest(request);
    setIsEditRequestOpen(true);
  };

  const handleCloseEditRequest = () => {
    setSelectedRequest(null);
    setIsEditRequestOpen(false);
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/deleterequest/${requestId}`
      );
      setRequests(requests.filter((request) => request._id !== requestId));
      toast.success("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <div>
      <div className="p-3 md:p-4 text-white relative">
        <h1 className="text-2xl px-24 font-bold">Your Requests</h1>
        <div className="flex justify-center">
          <div className="flex flex-col items-center w-full max-w-8xl">
            {requests.map((request) => (
              <div
                key={request._id}
                className="flex flex-col md:flex-row justify-between items-center w-full rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full">
                    <img
                      src={request.image}
                      className="w-full h-full rounded-full"
                      alt="Request Image"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-xs">ID: {request._id}</h1>
                    <p className="text-sm">Game: {request.name}</p>
                    <p className="text-sm">Platform: {request.platform}</p>
                    <p className="text-sm">
                      CreateDate: {formatDate(request.createdAt)}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={
                          request.state === "decline"
                            ? "text-red-500"
                            : request.state === "wait for approval"
                            ? "text-yellow-500"
                            : request.state === "approved"
                            ? "text-green-500"
                            : ""
                        }
                      >
                        {request.state}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex  md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <button
                    className="w-[80px] bg-sixth hover:bg-primary text-black text-xl font-bold text-center rounded-full"
                    onClick={() => handleEditRequestClick(request)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-[80px] bg-sixth hover:bg-red-500 text-black text-xl font-bold text-center rounded-full"
                    onClick={() => handleDeleteRequest(request._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        {isEditRequestOpen && selectedRequest && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <EditRequest
              request={selectedRequest}
              onClose={handleCloseEditRequest}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
