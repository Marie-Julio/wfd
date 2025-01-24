import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/wfdguinee.png";
import { Mail, MapPin, Phone, Menu, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import imgmenu from "../assets/images/menu.png";
import imghome from "../assets/images/home.png";
import imgclose from "../assets/images/close.png";

const Nav = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Promotions", href: "/page-promotion"  },
    { label: "Cours", href: "/page-cours", requiresAuth: true  },
    { label: "Informations", href: "/pages-infos" },
    { label: "Forum", href: "/pages-forum", requiresAuth: true  },
    { label: "Nos Projets", href: "/pages-projet" },
    { label: "Enseignants", href: "/page-members" },
    { label: "Galerie", href: "/page-galeries" },
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
      <div className="flex flex-wrap items-center justify-between pt-4 px-6 bg-gray-50">
      <a href="/" className="flex items-center mb-4 md:mb-2">
        <img src={logo} className="h-12" alt="Logo" />
      </a>

      {/* Contact Information */}
      <div className="flex space-x-4">
        {/* Visible on all screen sizes */}
        <div className="hidden md:flex items-center space-x-2 transform transition-all duration-500 hover:scale-105">
          <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#eb6b11] hover:bg-[#db5b01] border border-[#eb6b11] hover:border-[#db5b01] text-white">
            <Phone className="w-6 h-6 text-gray-100" /></span>
          <div>
            <h1 className="font-bold text-sm text-gray-800">Contact</h1>
            <p className="text-xs text-gray-500 whitespace-nowrap">+224 612 77 77 56</p>
          </div>
        </div>

        {/* Email */}
        <div className="hidden md:flex items-center space-x-2 transform transition-all duration-500 hover:scale-105">
          <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#eb6b11] hover:bg-[#db5b01] border border-[#eb6b11] hover:border-[#db5b01] text-white">
            <Mail className="w-6 h-6 text-gray-100" /></span>
          <div>
            <h1 className="font-bold text-sm text-gray-800">Mail</h1>
            <p className="text-xs text-gray-500 whitespace-nowrap">contact@wfdguinee.org</p>
          </div>
        </div>

        {/* Address (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-2 transform transition-all duration-500 hover:scale-105">
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
          <div className="container items-end text-right md:block">
            <button className="md:hidden focus:outline-none bg-transparent mt-5" onClick={toggleMenu} >
              {isMenuOpen ? <div class="flex align-middle justify-center items-center size-10 mt-1  text-2xl bg-[#eb6b11] duration-500">
                <i class="uil uil-bars"></i>
              </div> : <div class="flex align-middle justify-center items-center size-10 mt-1  text-2xl bg-[#eb6b11] duration-500">
                <i class="uil uil-bars"></i>
              </div>}
            </button>
          </div>
        <div className=" mx-auto flex justify-between items-center px-10 py-3">
          {/* Hamburger Icon */}

          {/* Drawer Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-3/4 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } z-50`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-50">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={toggleMenu} className="bg-transparent">
                <img src={imgclose} width="40px" />
              </button>
            </div>
            <ul className="flex flex-col space-y-2 p-4">
              {menuItems.filter((item) => !item.requiresAuth || token).map((item) => (
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
              <li className="py-2 px-4 ">
                <button
                  onClick={() => navigate('/page-profil')}
                  className=" -ml-4 block w-full py-2 px-4 text-left text-sm bg-[#1a5fa9] text-white rounded hover:bg-blue-800"
                >
                  Profile
                </button>
              </li>
              <li className="py-2 px-4">
                <button
                  onClick={() => navigate('/page-attestations')}
                  className=" -ml-4 block w-full py-2 px-4 text-left text-sm bg-[#eb6b11] text-white rounded hover:bg-blue-800"
                >
                  Mes Attestations & Certificats
                </button>
              </li>
              <li className="py-2 px-4">
                <button
                  onClick={handleLogout}
                  className=" -ml-4 block w-full py-2 px-4 text-left text-sm bg-red-600 text-white rounded hover:bg-red-800"
                >
                  Déconnexion
                </button>
              </li>
              </>
            )}
            </ul>
            
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex lg:space-x-2 md:space-x-1">
            {menuItems.filter((item) => !item.requiresAuth || token).map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={` whitespace-nowrap py-2 px-4 rounded ${
                    location.pathname === item.href
                      ? "bg-[#eb6b11] text-white"
                      : "hover:bg-blue-700 hover:text-white "
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
                      Mon Compte
                    </Link>
                    <Link
                      to="/page-attestations"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mes Attestations & Certificats
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full bg-red-700 text-left px-4 text-white py-2 hover:bg-red-500"
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
