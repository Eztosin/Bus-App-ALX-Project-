import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { IoMdSearch } from "react-icons/io";
import { FaBusAlt, FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "#about",
  },
  {
    id: 5,
    name: "Login",
    link: "/login",
  },
  {
    id: 6,
    name: "Sign Up",
    link: "#",
    hasDropdown: true,
  },
  {
    id: 7,
    name: "Logout",
    link: "/login",
  },
];

const SignUpLinks = [
  {
    id: 3,
    name: "Create Driver Account",
    link: "/RegisterDriver",
  },
  {
    id: 4,
    name: "Create Passenger Account",
    link: "/RegisterUser",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleLogout = () => {
    // Perform any necessary logout logic here
    // e.g., clear user data from local storage or state

    // Navigate to the login page
    navigate("/login");
  };

  // Check if the current path is in the specified paths
  const isMainPath = location.pathname === "/";
  const isAuthPath = ["/login", "/RegisterDriver", "/RegisterUser"].includes(location.pathname);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10 rounded-full" />
              <span className="font-fancy">ADDIS RIDE</span>
            </Link>
          </div>
          {/* Conditionally render search bar and book ride button */}
          {!isMainPath && !isAuthPath && (
            <div className="flex justify-between items-center gap-4">
              {/* <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="search"
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                />
                <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
              </div> */}
              {/* Book ride button */}
              <button
                onClick={() => handleOrderPopup()}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <span className="group-hover:block hidden transition-all duration-200">
                  Book A Seat
                </span>
                <FaBusAlt className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </div>
          )}
          {/* Conditionally render Logout */}
          {!isMainPath && !isAuthPath && (
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                SignOut
              </button>
            </div>
          )}
          {/* DarkMode Switch */}
          <div className="hidden sm:block">
            <DarkMode />
          </div>
          {/* Menu Toggle Button for Mobile */}
          <div className="sm:hidden">
            <button onClick={toggleSideMenu}>
              {sideMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            (isMainPath && !['About', 'Home', 'Logout'].includes(data.name)) && (
              <li
                key={data.id}
                className={`${
                  data.hasDropdown ? "group relative cursor-pointer" : ""
                }`}
              >
                <Link
                  to={data.link}
                  className="inline-block px-4 hover:text-primary duration-200 flex items-center gap-1"
                >
                  {data.name}
                  {data.hasDropdown && (
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  )}
                </Link>
                {data.hasDropdown && (
                  <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
                    <ul>
                      {data.name === "Sign Up" &&
                        SignUpLinks.map((link) => (
                          <li key={link.id}>
                            <Link
                              to={link.link}
                              className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          ))}
        </ul>
      </div>
      {/* Side Menu for Mobile */}
      {sideMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
          onClick={toggleSideMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            <button onClick={toggleSideMenu} className="text-xl mb-4">
              <FaTimes />
            </button>
            <ul className="flex flex-col gap-4">
              {Menu.map((data) => (
                (isMainPath || !['Login', 'Sign Up'].includes(data.name)) && (
                  <li key={data.id} className="relative">
                    <Link
                      to={data.link}
                      className="block px-4 py-2 text-black dark:text-white hover:bg-primary/20 rounded-md"
                      onClick={() => toggleDropdown(data.id)}
                    >
                      {data.name}
                      {data.hasDropdown && (
                        <FaCaretDown
                          className={`transition-all duration-200 ml-2 ${
                            dropdownOpen === data.id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>
                    {data.hasDropdown && dropdownOpen === data.id && (
                      <div className="pl-4">
                        <ul>
                          {data.name === "Sign Up" &&
                            SignUpLinks.map((link) => (
                              <li key={link.id}>
                                <Link
                                  to={link.link}
                                  className="block px-4 py-2 text-black dark:text-white hover:bg-primary/20 rounded-md"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
