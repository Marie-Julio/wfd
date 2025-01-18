import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/wfdguinee.png";
import { Mail, MapPin, Phone, Menu, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Promotions", href: "/page-promotion" },
    { label: "Cours", href: "/page-cours" },
    { label: "Informations", href: "/pages-infos" },
    { label: "Forum", href: "/pages-forum" },
    { label: "Nos Projets", href: "/pages-projet" },
    { label: "Enseignants", href: "/page-members" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.logout();
    navigate("/login");
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between pt-4 px-6 bg-gray-50">
  {/* Logo */}
  <a href="/" className="flex items-center mb-4 md:mb-2">
    <img src={logo} className="h-12" alt="Logo" />
  </a>

  {/* Contact Information */}
  <div className="flex space-x-4">
    {/* Visible on all screen sizes */}
    <div className="flex items-center space-x-2">
      <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#eb6b11] hover:bg-[#db5b01] border border-[#eb6b11] hover:border-[#db5b01] text-white">
        <Phone className="w-6 h-6 text-gray-100" /></span>
      <div>
        <h1 className="font-bold text-sm text-gray-800">Contact</h1>
        <p className="text-xs text-gray-500">+224 612 77 77 56</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center space-x-2">
      <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#eb6b11] hover:bg-[#db5b01] border border-[#eb6b11] hover:border-[#db5b01] text-white">
        <Mail className="w-6 h-6 text-gray-100" /></span>
      <div>
        <h1 className="font-bold text-sm text-gray-800">Mail</h1>
        <p className="text-xs text-gray-500">contact@wfdguinee.org</p>
      </div>
    </div>

    {/* Address (hidden on small screens) */}
    <div className="hidden md:flex items-center space-x-2">
      <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#eb6b11] hover:bg-[#db5b01] border border-[#eb6b11] hover:border-[#db5b01] text-white">
        <MapPin className="w-6 h-6 text-gray-100" /></span>
      <div>
        <h1 className="font-bold text-sm text-gray-800">Adresse</h1>
        <p className="text-xs text-gray-500">Conkary, Ratoma, Nongo </p>
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

          {/* Drawer Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-3/4 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } z-50`}
          >
            <div className="flex justify-between items-center p-4 border-b border-blue-700">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={toggleMenu}>
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={toggleMenu}
                    className=" whitespace-nowrap block py-2 px-4 hover:bg-blue-700 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Buttons for mobile */}
            {!token ? (
              <>
                <li className="py-2 px-4">
                  <Link
                    to="/login"
                    className=" whitespace-nowrap block py-2 px-4 text-sm bg-white text-blue-900 rounded hover:bg-gray-200 text-center"
                  >
                    Connexion
                  </Link>
                </li>
                <li className="py-2 px-4">
                  <Link
                    to="/register"
                    className=" whitespace-nowrap block py-2 px-4 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 text-center"
                  >
                    Inscription
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li className="py-2 px-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="block w-full py-2 px-4 text-left text-sm bg-blue-500 text-white rounded hover:bg-blue-800"
                >
                  Profile
                </button>
              </li>
              <li className="py-2 px-4">
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 px-4 text-left text-sm bg-red-600 text-white rounded hover:bg-red-800"
                >
                  Déconnexion
                </button>
              </li>
              </>
            )}
            </ul>
            
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex md:space-x-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={` whitespace-nowrap py-2 px-4 rounded ${
                    location.pathname === item.href
                      ? "bg-orange-500 text-white"
                      : "hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
          </ul>

          {/* Profile/Login */}
          <div className="hidden md:flex space-x-4">
            {token ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
                  onClick={toggleProfileMenu}
                >
                  <User size={20} />
                  <span>Profil</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md z-10">
                    <Link
                      to="/page-profil"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mon Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  class=" font-semibold px-5 py-3 rounded-xl text-sm border-2 text-gray-50 bg-transparent hover:text-gray-200 focus:outline-none transition-all"
                >
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
