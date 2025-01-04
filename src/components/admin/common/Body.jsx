import React ,{ useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Table from "./Table";

export const Body  = ({children, isOpen, setIsOpen}) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const [filter, setFilter] = useState(false); 
    return ( 
        <div className="flex flex-col min-h-screen">
            <div className="flex  max-h-screen ">
                <SideBar open={isOpen} setOpen={setIsOpen}/>
                <div className="flex-1 flex flex-col overflow-scroll scrollbar-none">
                    <Nav />
                    <section className="flex-1 p-4 bg-[#f4f5fa]">
                        {/* Contenu principal */}
                        {children}
                    </section>
                </div>
            </div>
            <Footer />
        </div>
     );
}