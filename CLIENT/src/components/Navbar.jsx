import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          BookStore 📚
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink to="/" className="hover:text-blue-400 transition">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/addbook" className="hover:text-blue-400 transition">
              Add Book
            </NavLink>
          </li>
          
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 text-center space-y-3 py-3">
          <li>
            <NavLink to="/" className="block py-2 hover:text-blue-400" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/addbook" className="block py-2 hover:text-blue-400" onClick={() => setIsOpen(false)}>
              Add Book
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
