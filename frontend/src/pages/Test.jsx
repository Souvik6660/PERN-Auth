import React from "react";
import { useSelector } from "react-redux";

function Test() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold">{user.fullname}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-red-500 text-xl font-semibold">No User Found</p>
      )}
    </div>
  );
}

export default Test;
