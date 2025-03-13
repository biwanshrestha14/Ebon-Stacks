import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        {/* 404 Heading */}
        <h1 className="text-9xl font-bold text-blue-500 animate-pulse">404</h1>
        
        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-200">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-400 text-lg max-w-md mx-auto">
          Oops! It seems like you’ve wandered into uncharted territory. The page you’re looking for doesn’t exist.
        </p>

        {/* Back to Home Button */}
        <Link to="/" className="mt-6 inline-block">
          <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            Return to Home
          </button>
        </Link>

        {/* Optional Aesthetic Element */}
        <div className="mt-10">
          <svg
            className="w-24 h-24 mx-auto text-gray-700 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 20l-5-5m0 0l5-5m-5 5h12m-3-5l5 5m0 0l-5 5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;