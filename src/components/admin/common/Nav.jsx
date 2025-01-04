import { Link } from "react-router-dom";
import logo  from "../../../assets/wfdguinee.png";
import Icon from "./Icon";
import { Input } from "./Input";

function Nav () {
    return (
        <nav className="bg-[#f4f5fa] shadow-md border-gray-600 font-montserrat-light">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-4xl px-4 py-0">
            <a  className="flex items-center">
                <img src={logo} className="h-8 mr-3 object-contain  m-4 flex items-center" alt="Pharma Logo" />
                <h2 className="font-montserrat-extra-bold-italic bg-custom-gradient bg-clip-text text-transparent text-xl">WFDGuinee</h2>
            </a>

            <div className="flex w-2/4  rounded-full">
                <Input full type="search" name="search" placeholder="Rechercher..." onChange={() => console.log("ok")} className="rounded-full w-full"/>
            </div>

                <div className="flex text-end justify-between items-center">
                    <Icon name="bxs-user-circle" size="36px" style={{ margin: "2px" }}/>
                    <a className="flex-wrap items-center">
                        <p className="text-start text-gray font-montserrat-bold">Admin</p>
                        <span className="text-gray-500">admin@gmail.com</span>
                    </a>
                </div>

            </div>

            
        </nav>
    )
}

export default Nav;