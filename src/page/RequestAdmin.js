import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ApproveRequest from "../components/ApproveRequest";
import { MdOutlineDeleteForever } from "react-icons/md";

const RequestAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchAllRequest();
  }, []);

  const fetchAllRequest = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/request`
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

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowEditPopup(true);
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/updaterequest/${requestId}`,
        { state: "decline" }
      );

      if (response.status === 200) {
        toast.success("Request declined successfully");
        fetchAllRequest();
      } else {
        throw new Error("Error declining request");
      }

      // Update the state of the request locally
      const updatedRequests = requests.map((request) => {
        if (request._id === requestId) {
          return {
            ...request,
            state: "decline",
          };
        }
        return request;
      });

      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error declining request:", error);
      toast.error("Error declining request");
    }
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

  return (
    <div>
      <div className="p-3 md:p-4 text-white relative">
        <h1 className="text-2xl px-24 font-bold">All Requests</h1>
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
                    className="bg-green-700 text-white px-4 py-2 rounded-md"
                    onClick={() => handleApproveClick(request)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDecline(request._id)}
                  >
                    Decline
                  </button>
                  <MdOutlineDeleteForever
                    size={30}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteRequest(request._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showEditPopup && selectedRequest && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <ApproveRequest
            request={selectedRequest}
            onClose={() => setShowEditPopup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default RequestAdmin;
