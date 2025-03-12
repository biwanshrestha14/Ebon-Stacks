// Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../API/config';
import BookCard from './BookCard'; // Adjust the import path if needed

const Home = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/books");
        setBookList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {bookList.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default Home;