
import { useState } from "react"
import api from "../API/config"

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    genre: ""
  })

  const [image, setImage] = useState("No file chosen")

  const handleChange = (e) => {
    const { name, value } = e.target  
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async(e) => {
    console.log(e.target.value)
    e.preventDefault()
     const res = await api.post("/books/add",{
      ...formData,image:image
    })
    console.log(res)
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 p-4">
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
                  value={formData.name}
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
                  value={formData.author}
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
                value={formData.genre}
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
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-md border border-violet-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Imagefile" className="block text-sm font-medium text-violet-800">
                Image file
              </label>
              <input type="file"
                id="image"
                name="image"
                placeholder=""
                onChange={(e)=>setImage(e.target.files[0])}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook

