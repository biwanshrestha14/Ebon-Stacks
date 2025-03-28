import React, { useEffect, useState } from 'react'
import api from '../API/config'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Search, Trash2, X, Filter } from 'lucide-react'

const Home = () => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            const response = await api.get('/books')
            setBooks(response.data)
            setFilteredBooks(response.data)
            setLoading(false)

            // Extract unique genres for filtering
            const uniqueGenres = [...new Set(response.data.map(book => book.genre))]
            setGenres(uniqueGenres)
        } catch (err) {
            setError('Failed to fetch books')
            setLoading(false)
            console.error('Error fetching books:', err)
        }
    }

    // Handle search input change
    useEffect(() => {
        if (searchTerm.trim() === '' && selectedGenre === '') {
            setFilteredBooks(books)
        } else {
            let results = books

            // Apply genre filter if selected
            if (selectedGenre !== '') {
                results = results.filter(book =>
                    book.genre === selectedGenre
                )
            }

            // Apply search term filter
            if (searchTerm.trim() !== '') {
                const lowerCaseSearch = searchTerm.toLowerCase()
                results = results.filter(book =>
                    book.name.toLowerCase().includes(lowerCaseSearch) ||
                    book.author.toLowerCase().includes(lowerCaseSearch)
                )
            }

            setFilteredBooks(results)
        }
    }, [searchTerm, books, selectedGenre])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value)
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        if (searchTerm.trim() === '') return

        try {
            setLoading(true)
            const response = await api.get(`/books/search/all?q=${searchTerm}`)
            setFilteredBooks(response.data)
            setLoading(false)
        } catch (err) {
            toast.error('Error searching books')
            console.error('Error searching books:', err)
            setLoading(false)
        }
    }

    const handleBookClick = (book) => {
        navigate('/Explore', {
            state: {
                book
            }
        })
    }

    const confirmDelete = (e, book) => {
        e.stopPropagation() // Prevent navigating to book details
        setBookToDelete(book)
        setShowDeleteModal(true)
    }

    const cancelDelete = () => {
        setShowDeleteModal(false)
        setBookToDelete(null)
    }

    const deleteBook = async () => {
        if (!bookToDelete) return

        try {
            await api.delete(`/books/delete/${bookToDelete.id}`)
            setBooks(books.filter(book => book.id !== bookToDelete.id))
            setFilteredBooks(filteredBooks.filter(book => book.id !== bookToDelete.id))
            toast.success(`"${bookToDelete.name}" has been deleted`)
            setShowDeleteModal(false)
            setBookToDelete(null)
        } catch (err) {
            toast.error('Failed to delete book')
            console.error('Error deleting book:', err)
        }
    }

    const resetFilters = () => {
        setSearchTerm('')
        setSelectedGenre('')
        setFilteredBooks(books)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{bookToDelete?.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteBook}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8 text-center">Our Book Collection</h1>

            {/* Search and Filter Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <form onSubmit={handleSearchSubmit} className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by title or author..."
                                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                    </form>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Filter size={18} />
                        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Filter by Genre</label>
                                <select
                                    id="genre"
                                    value={selectedGenre}
                                    onChange={handleGenreChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Genres</option>
                                    {genres.map((genre, index) => (
                                        <option key={index} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                <span>Reset Filters</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Search Results Count */}
                <div className="text-gray-600">
                    Showing {filteredBooks.length} of {books.length} books
                </div>
            </div>

            {filteredBooks.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-lg text-gray-600 mb-4">No books match your search criteria.</p>
                    <button
                        onClick={resetFilters}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 relative"
                        >
                            <div
                                className="absolute top-2 right-2 z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={(e) => confirmDelete(e, book)}
                                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
                                    title="Delete book"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={() => handleBookClick(book)}
                            >
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="w-full h-56 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://via.placeholder.com/150?text=No+Image"
                                    }}
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{book.name}</h2>
                                    <p className="text-gray-600 mb-1">By {book.author}</p>
                                    <p className="text-gray-600 mb-3">Genre: {book.genre}</p>
                                    <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
                                    <button
                                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
