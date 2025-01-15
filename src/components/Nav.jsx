import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/wfdguinee.png";
import { Mail, MapPin, Phone, Menu, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Promotions", href: "/page-promotion" },
    { label: "Cours", href: "/page-cours" },
    { label: "Informations", href: "/pages-infos" },
    { label: "Forum", href: "/pages-forum" },
    { label: "Nos Projets", href: "/pages-projet" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const token = localStorage.getItem("token"); // Vérification du token
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = useAuth()
 
  
      const accessToken = localStorage.getItem("token");
      const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    
      // if (!accessToken) {
      //   navigate("/login");
      // }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.logout()
    navigate("/login");
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-wrap md:flex justify-center items-center pt-2 px-4">
        <a href="/" className="flex items-center mb-4 md:mb-0">
          <img src={logo} className="h-12" alt="Logo" />
        </a>
        <div className="w-full md:w-auto flex flex-col md:ml-8 md:items-center md:justify-center md:flex-row md:ml-auto md:items-center space-y-4 md:space-y-0 md:space-x-3">
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-gray-700 mr-2" />
            <div>
              <h1 className="font-bold text-sm text-gray-800">Contact</h1>
              <p className="text-xs text-gray-500">+229 55002123</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-gray-700 mr-2" />
            <div>
              <h1 className="font-bold text-sm text-gray-800">Mail</h1>
              <p className="text-xs text-gray-500">notrelogo@gmail.com</p>
            </div>
          </div>
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
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
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
                  className="block py-2 px-4 text-center md:inline-block hover:bg-blue-700 md:hover:bg-transparent transition-all duration-300 ease-in-out"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {!token && (
              <>
                <li className="md:hidden">
                  <Link
                    to="/login"
                    className="block py-2 px-4 text-sm text-white rounded hover:bg-gray-200 text-center"
                  >
                    Connexion
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/register"
                    className="block py-2 px-4 text-sm text-white rounded hover:bg-blue-800 text-center"
                  >
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Profile or Login/Signup */}
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
                  className="py-2 px-4 text-sm bg-white text-blue-900 rounded hover:bg-gray-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
                >
                  Inscription
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
