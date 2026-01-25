import React, { useState } from "react";
import { FaBell, FaBars, FaUpload, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkMode from './DarkMode';
import { useAuth } from "../context/AuthContext";



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 px-4 py-2 shadow-md flex items-center justify-between">
      {/* Left: Brand Name */}
      <div className="flex items-center space-x-4">
        <h2
          onClick={() => navigate("/")}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer",
            background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MediaFun
        </h2>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 ml-6 text-gray-700 dark:text-gray-200 font-medium">
          <button onClick={() => navigate("/")} className="hover:underline">Home</button>
          <button onClick={() => navigate("/trending")} className="hover:underline">Trending</button>
          <button onClick={() => navigate("/videos")} className="hover:underline">Videos</button>
          <button onClick={() => navigate("/clips")} className="hover:underline">Clips</button>
          <button onClick={() => navigate("/photos")} className="hover:underline">Photos</button>
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center space-x-1 hover:underline"
          >
            <FaCompass /> <span>Explore</span>
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block px-3 py-1 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out w-70 focus:w-90"
         />

        {/* Upload Button */}
        {user && (
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            <FaUpload className="mr-1" /> Upload
          </button>
        )}

        {/* Notifications */}
        {user && (
          <div className="relative">
            <FaBell className="text-xl cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              3
            </span>
          </div>
        )}

        {/* Theme Toggle */}
          <div>
              <DarkMode/>
            </div>


        {/* Profile Avatar */}
        {user ? (
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Login
          </button>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-100 dark:bg-gray-900 md:hidden shadow-md flex flex-col space-y-2 px-4 py-2">
          <button onClick={() => navigate("/")} className="hover:underline">Home</button>
          <button onClick={() => navigate("/trending")} className="hover:underline">Trending</button>
          <button onClick={() => navigate("/videos")} className="hover:underline">Videos</button>
          <button onClick={() => navigate("/clips")} className="hover:underline">Clips</button>
          <button onClick={() => navigate("/photos")} className="hover:underline">Photos</button>
          <button onClick={() => navigate("/explore")} className="flex items-center space-x-1 hover:underline">
            <FaCompass /> <span>Explore</span>
          </button>
          {user && (
            <>
              <button onClick={() => navigate("/upload")} className="flex items-center space-x-1 hover:underline">
                <FaUpload /> Upload
              </button>
              <button onClick={() => navigate("/profile")} className="hover:underline">Profile</button>
              <button onClick={() => navigate("/settings")} className="hover:underline">Settings</button>
              <button onClick={() => navigate("/logout")} className="text-red-500 hover:underline">Logout</button>
            </>
          )}
          {!user && (
            <button onClick={() => navigate("/login")} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500">
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
