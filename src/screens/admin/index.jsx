import React, { useState } from "react";
import Footer from "../../components/admin/common/Footer";
import CardFile from "../../components/admin/common/CardFile";
import Icon from "../../components/admin/common/Icon";
import Nav from "../../components/admin/common/Nav";
import SideBar from "../../components/admin/common/SideBar";


export const AdminHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false); 

    const data = [
        { id: 1, name: 'Aspirin', quantity: 100 },
        { id: 2, name: 'Ibuprofen', quantity: 200 },
        { id: 3, name: 'Paracetamol', quantity: 150 },
        // Ajoutez d'autres données ici
      ];
      
      const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Quantity', accessor: 'quantity' },
      ];


    return ( 
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <SideBar open={isOpen} setOpen={setIsOpen}/>
                <div className="flex-1 flex flex-col">
                    <Nav />
                    <section className="flex-1 p-4 bg-[#f4f5fa]">
                        {/* Contenu principal */}
                        <div className="flex justify-between">
                        <CardFile className="w-70 h-40 p-5 bg-[#ffffff]">
                            <div>
                                <h1 className="start-0 items-start font-roboto-semibold">Bienvenu sur le dashboard</h1>
                            </div>
                       </CardFile>
                       <CardFile className="w-180 h-40 p-5 bg-[#ffffff]">
                            <div>
                                <h1 className="start-0 items-start font-roboto-bold">PHARMACIES</h1>
                                <p>Total 50</p>
                            </div>
                            <div className="flex ">
                                <div className="flex ml-10">
                                    <div className="flex w-12 h-12 bg-success rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-circle-three-quarter" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Cours</h4>
                                        <h2 className="font-bold">400</h2>
                                    </div>
                                </div>
                                <div className="flex ml-20">
                                    <div className="flex w-12 h-12 bg-warning rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-package" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Informations</h4>
                                        <h2 className="font-bold">800k</h2>
                                    </div>
                                </div>
                                <div className="flex ml-20">
                                    <div className="flex w-12 h-12 bg-danger rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-check-shield" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Opportunites</h4>
                                        <h2 className="font-bold">80k</h2>
                                    </div>
                                </div>
                            </div>
                       </CardFile>
                       
                        </div>
                        <CardFile className="w-190 h-100 p-5 bg-[#ffffff] mt-6">
                            <div>
                                <h1 className="start-0 items-start font-roboto-semibold">Statistiques</h1>
                            </div>
                       </CardFile>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
     );
}