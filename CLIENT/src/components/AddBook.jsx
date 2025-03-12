import React, { useState } from "react";
import api from "../API/config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styling

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    genre: ""
  });
  const [image, setImage] = useState(null); // Initialize as null for file input

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for multipart/form-data submission
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
        // console.log(response);
        // console.log("success");
        toast.success("Added New Book");

        // Reset form
        e.target.reset();
        setFormData({
          name: "",
          author: "",
          description: "",
          genre: ""
        });
        setImage(null); // Reset image state
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-violet-600 p-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl font-bold">Add New Book</h1>
          </div>
          <p className="mt-1 text-violet-100">Fill in the details to add a new book to your collection</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Content */}
          <div className="space-y-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-violet-800">
                  Title
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Book Title"
                  value={formData.name || ""} // Ensure controlled with fallback
                  onChange={handleChange}
                  className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="author" className="block text-sm font-medium text-violet-800">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Author Name"
                  value={formData.author || ""} // Ensure controlled with fallback
                  onChange={handleChange}
                  className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="block text-sm font-medium text-violet-800">
                Genre
              </label>
              <input
                id="genre"
                name="genre"
                type="text"
                placeholder="Fiction, Mystery, Romance, etc."
                value={formData.genre || ""} // Ensure controlled with fallback
                onChange={handleChange}
                className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-violet-800">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Write a brief description of the book..."
                value={formData.description || ""} // Ensure controlled with fallback
                onChange={handleChange}
                rows="5"
                className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium text-violet-800">
                Image file
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-violet-100 bg-violet-50 p-6">
            <button
              type="button"
              className="rounded-md border border-violet-300 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm hover:bg-violet-100 hover:text-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              onClick={() => {
                setFormData({
                  name: "",
                  author: "",
                  description: "",
                  genre: ""
                });
                setImage(null);
              }}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Add Book"
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;