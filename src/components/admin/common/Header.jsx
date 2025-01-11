import LogoDesktop from "../../assets/images/logo/logo_desktop.png";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg"
import ThemeSelector from "../theme";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useSelector(state => state.auth.token)
  const [user, setUser] = useState({})
  const auth = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if(token) {
      const tokenDecode = jwtDecode(token)
      console.log(tokenDecode)
      setUser(tokenDecode)
    }
    
  }, [token])

  const deconnect = () => {
    auth.logout()
  }
  
  const links = [
    {
      name: "Comment ça marche ?",
      link: "/comment-ça-marche",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
  ];

  return (
    <nav className="bg-white border-gray-200 shadow-md text-gray-500">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-3xl px-4 py-0">
        <Link to="/" className="flex items-center">
          <img src={LogoDesktop} className="h-14 mr-3 object-contain" alt="UAC Logo" />
        </Link>

        {token && <div className="flex items-center">
          <ThemeSelector />
          <div className="flex cursor-pointer ml-5">
            <img src={userIcon} className="w-12 mx-2"/>
            <Link onClick={() => deconnect()}>
                <span className="text-black">{user.identifiant}</span>
                <div className="flex text-sm hover:text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 mr-2 bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                  <span>Deconnexion</span>
                </div>
            </Link>
          </div>
        </div>}
        
      </div>
    </nav>
  );
}

export default Header;
