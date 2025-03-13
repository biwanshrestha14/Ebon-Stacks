// BookCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate= useNavigate()
  return (
    <div onClick={()=>{navigate("/Explore",{
      state:{
        book
      }
    })}} className="border border-gray-200 rounded-lg p-4 w-80 m-4 shadow-md flex flex-col items-center">
      <img
        src={book.image || 'https://via.placeholder.com/150'}
        alt={book.name}
        className="w-36 h-48 object-cover rounded-md mb-4"
      />
      <div className="text-left w-full flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.name}</h3>
        <p className="text-sm text-gray-600">
          <strong>Author:</strong> {book.author || 'Unknown'}
        </p>
     
      </div>
    </div>
  );
};

export default BookCard;