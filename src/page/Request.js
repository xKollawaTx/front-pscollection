import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import './Request.css';

const Request = () => {
  return (
    <div className="p-3 md:p-4 text-white relative">
      <h1 className='text-2xl px-8'>Your Request</h1>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <HiPlusCircle size={80} className="text-primary" title="Create new request" />
        <span className="tooltiptext">Create new request</span>
      </div>
    </div>
  );
};

export default Request;
