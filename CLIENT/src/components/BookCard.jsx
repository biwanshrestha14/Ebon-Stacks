// BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-80 m-4 shadow-md flex flex-col items-center">
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
        <p className="text-sm text-gray-600">
          <strong>Genre:</strong> {book.genre || 'N/A'}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {book.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default BookCard;