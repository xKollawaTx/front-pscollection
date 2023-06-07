import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ApproveRequest from "../components/ApproveRequest";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiFilter } from "react-icons/bi";

const RequestAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sortOrder, setSortOrder] = useState("oldToNew");

  useEffect(() => {
    fetchAllRequest();
  }, [showEditPopup]);

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
      fetchAllRequest();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "oldToNew" ? "newToOld" : "oldToNew";
    setSortOrder(newSortOrder);
  };

  const sortedRequests = requests.sort((a, b) => {
    if (sortOrder === "oldToNew") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const sortOrderText = sortOrder === "oldToNew" ? "Old to New" : "New to Old";

  return (
    <div>
      <div className="p-3 md:p-4 text-white relative">
        <div className="px-5 py-5 md:px-20 flex justify-between items-center">
          <p className="text-2xl md:text-2xl font-bold">
            All request<br></br>
          </p>
          <div className="flex items-center">
            <BiFilter
              size={50}
              className="cursor-pointer"
              onClick={handleSortOrderChange}
            />
            <p className="ml-2">{sortOrderText}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center w-full max-w-8xl">
            {sortedRequests.map((request) => (
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
                    className="w-[100px] bg-sixth hover:bg-primary text-black text-xl font-bold text-center rounded-full"
                    onClick={() => handleApproveClick(request)}
                  >
                    Approve
                  </button>
                  <button
                    className="w-[100px] bg-sixth hover:bg-red-500 text-black text-xl font-bold text-center rounded-full"
                    onClick={() => handleDecline(request._id)}
                  >
                    Decline
                  </button>
                  <MdOutlineDeleteForever
                    size={40}
                    className="text-sixth hover:text-red-500 cursor-pointer"
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
