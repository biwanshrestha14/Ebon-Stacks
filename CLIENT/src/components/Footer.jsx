import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo & Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Book Haven 📚</h2>
          <p className="text-sm mt-1">Your gateway to endless stories & knowledge.</p>
        </div>

        {/* Middle Section: Navigation Links */}
        <ul className="flex space-x-6 my-4 md:my-0">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/addbook" className="hover:text-blue-400 transition">Add Book</Link>
          </li>
        </ul>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:text-blue-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-pink-500 transition" />
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Book Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
