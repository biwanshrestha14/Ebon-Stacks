import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const Explore = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 p-4">
      {book ? (
        
        <div className="w-1/2 relative h-1/2 max-w-lg rounded-lg shadow-lg bg-white overflow-hidden flex flex-col items-center p-6">
             <button
            onClick={() => navigate("/")}
            className="absolute left-6 px-4 py-1 bg-violet-600 text-white rounded-md shadow-md hover:bg-violet-700 transition"
          >
         <MoveLeft />
          </button> <img
            src={book.image || "https://via.placeholder.com/300"}
            alt={book.name}
            className="w-40 h-56 object-cover rounded-md shadow-md mb-4"
          />
          <div className="text-center">
            <h3 className="text-xl font-bold text-violet-800">{book.name}</h3>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Author:</strong> {book.author || "Unknown"}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Genre:</strong> {book.genre || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-4">{book.description}</p>
          </div>
          {/* Back Button */}
      
        </div>
      ) : (
        <p className="text-lg text-gray-700">No book details available</p>
      )}
    </div>
  );
};

export default Explore;
