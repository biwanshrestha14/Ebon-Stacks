import React, { useState } from "react";
import api from "../API/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    genre: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("genre", formData.genre);
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await api.post("/books/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Added New Book");
        e.target.reset();
        setFormData({ name: "", author: "", description: "", genre: "" });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-gray-300 p-6">
      <ToastContainer />
    
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 shadow-lg">
        {/* Header */}
        <div className="bg-gray-700 p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📚 Add New Book
          </h1>
          <p className="mt-1 text-gray-300">Fill in the details to add a book to your collection.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Content */}
          <div className="space-y-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Book Title"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-300">Genre</label>
              <input
                id="genre"
                name="genre"
                type="text"
                placeholder="Fiction, Mystery, Romance, etc."
                value={formData.genre}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Write a brief description of the book..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-300">Book Cover</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-700 bg-gray-800 p-6">
            <button
              type="button"
              className="rounded-md border border-gray-500 bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-600 hover:text-white transition"
              onClick={() => {
                setFormData({ name: "", author: "", description: "", genre: "" });
                setImage(null);
              }}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Add Book"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition cursor-pointer focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
