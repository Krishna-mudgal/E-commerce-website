import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  // Expect bookingId (MongoDB _id) to be passed in state
  const bookingId = location.state?.bookingId;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Green checkmark */}
      <div className="mb-6">
        <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <span className="mr-2">Booking Confirmed</span>
      </h1>
      <div className="text-gray-700 mb-6">
        Ref ID: {bookingId || "N/A"}
      </div>
      <button
        className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Success;
