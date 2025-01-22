import { Link, useNavigate } from "react-router-dom";
import logo  from "../../../assets/wfdguinee.png";
import Icon from "./Icon";
import { Input } from "./Input";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";
import { Power } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";

function Nav () {
    const access_token = localStorage.getItem('token');
          const tokenNew = access_token ? jwtDecode(access_token) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
 const handleLogout = () => {
    localStorage.removeItem("token");
    auth.logout();
    navigate("/login");
  };

          

    if (!access_token) {
      navigate("/login");
    }
    return (
        <nav className="bg-[#f4f5fa] shadow-md border-gray-600 font-montserrat-light">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-4xl px-4 py-0">
            <Link to="/" className="flex items-center">
                <img src={logo} className="h-8 mr-3 object-contain  m-4 flex items-center" alt="Pharma Logo" />
                <h2 className="font-montserrat-extra-bold-italic bg-custom-gradient bg-clip-text text-transparent text-xl">WFDGuinee</h2>
            </Link>

            <div className="flex w-3/6  rounded-full">
                <Input full type="search" name="search" placeholder="Rechercher..." onChange={() => console.log("ok")} className="rounded-full w-full"/>
            </div>

                <div className="flex text-end justify-between items-center">
                    <Icon name="bxs-user-circle" size="36px" style={{ margin: "2px" }}/>
                    <Link to="/page-profil" className="flex-wrap items-center">
                        <p className="text-start text-gray font-montserrat-bold">{tokenNew && `${tokenNew.nom} ${tokenNew.prenom}`}</p>
                        <span className="text-gray-500">{tokenNew && tokenNew.email}</span>
                    </Link>
                    <div>
                        <Button onClick={handleLogout} className="w-10 h-10 rounded-full bg-red-900 ml-8"><Power /></Button>
                    </div>
                </div>
        
            </div>

            
        </nav>
    )
}

export default Nav;