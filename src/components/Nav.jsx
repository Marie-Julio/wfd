import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/wfdguinee.png";
import { Mail, MapPin, Phone, Menu, X } from "lucide-react";

const Nav = () => {
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Opportunités", href: "/pages-opportunites" },
    { label: "Cours", href: "/page-cours" },
    // { label: "Inscription", href: "/inscriptions" },
    { label: "Informations", href: "/pages-infos" },
    { label: "Forum", href: "/pages-forum" },
    { label: "Profil des membres", href: "/pages-profil-members" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-wrap justify-center items-center pt-2 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center mb-4 md:mb-0">
            <img src={logo} className="h-12" alt="Logo" />
        </a>

        {/* Contact Details */}
        <div className="w-full md:w-auto flex flex-col md:ml-8 md:items-center md:justify-center md:flex-row md:ml-auto md:items-center space-y-4 md:space-y-0 md:space-x-3">
            {/* Contact */}
            <div className="flex items-center">
            <Phone className="w-6 h-6 text-gray-700 mr-2" />
            <div>
                <h1 className="font-bold text-sm text-gray-800">Contact</h1>
                <p className="text-xs text-gray-500">+229 55002123</p>
            </div>
            </div>

            {/* Mail */}
            <div className="flex items-center">
            <Mail className="w-6 h-6 text-gray-700 mr-2" />
            <div>
                <h1 className="font-bold text-sm text-gray-800">Mail</h1>
                <p className="text-xs text-gray-500">notrelogo@gmail.com</p>
            </div>
            </div>

            {/* Address */}
            <div className="flex items-center">
            <MapPin className="w-6 h-6 text-gray-700 mr-2" />
            <div>
                <h1 className="font-bold text-sm text-gray-800">Adresse</h1>
                <p className="text-xs text-gray-500">Guinée - Tohin, rue 234</p>
            </div>
            </div>
        </div>
        </div>


      {/* Navbar Section */}
      <nav className="bg-custom-gradient text-white">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          

          {/* Hamburger Icon */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Menu Items */}
          <ul
            className={`flex-col md:flex-row md:items-center absolute md:static bg-blue-900 md:bg-transparent w-full md:w-auto top-16 md:top-auto left-0 md:left-auto z-10 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            {menuItems.map((item) => (
              <li key={item.label} className="md:ml-8">
                <Link
                  to={item.href}
                  className="block py-2 px-4 text-center md:inline-block hover:bg-blue-700 md:hover:bg-transparent md:hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login / Signup Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="py-2 px-4 text-sm bg-white text-blue-900 rounded hover:bg-gray-200"
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="py-2 px-4 text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Inscription
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
