import React, { useEffect, useState } from "react";
import Footer from "../../components/admin/common/Footer";
import CardFile from "../../components/admin/common/CardFile";
import Icon from "../../components/admin/common/Icon";
import Nav from "../../components/admin/common/Nav";
import SideBar from "../../components/admin/common/SideBar";
import { getResource } from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";


export const AdminHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const navigate = useNavigate() 

    const accessToken = localStorage.getItem("token");
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  
    if (!accessToken) {
      navigate("/login");
    }

    // Données fictives pour la démonstration
  const [data] = useState([
    { mois: 'Janvier', total: 150, faculteSciences: 45, faculteLettres: 35, iut: 70 },
    { mois: 'Février', total: 120, faculteSciences: 40, faculteLettres: 30, iut: 50 },
    { mois: 'Mars', total: 180, faculteSciences: 60, faculteLettres: 45, iut: 75 },
    { mois: 'Avril', total: 160, faculteSciences: 50, faculteLettres: 40, iut: 70 },
  ]);

  

      
      const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Quantity', accessor: 'quantity' },
      ];

      const [projects, setProjects] = useState([]);
        const [cours, setCours] = useState([]);
        const [infos, setInfos] = useState([]);
        const [inscris, setInscris] = useState([]);
        const [users, setUsers] = useState([]);
        
            const _init_ = () => {
              getResource("/projets").then((res) => {
                  console.log(res.data)
                  setProjects(res.data)
              }).catch(e => {
                  errorMessage(e)
                })
      
                getResource("/announcements").then((res) => {
                  console.log(res.data);
                  setInfos(res.data);
              })
      
                getResource("/course-modules").then((res) => {
                  console.log(res.data)
                  setCours(res.data)
              })
      
              getResource("/inscriptions").then((res) => {
                console.log(res.data)
                setInscris(res.data)
            })

            getResource("/afficher_liste_utilisateur").then((res) => {
                console.log(res.data)
                setUsers(res.data.utilisateurs)
            })
          }
      
          useEffect(() => {
              _init_()
          }, [])


          const pieData = [
            { name: 'Nombre de cours', value: cours.length },
            { name: 'Nombre d\'inscription', value: inscris.length },
            { name: 'Nombre de participant', value: users.length },
          ];
        
          const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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
                                <h1 className="start-0 items-start font-roboto-bold">Inscriptions</h1>
                                <p>Total {inscris.length}</p>
                            </div>
                            <div className="flex ">
                                <div className="flex ml-10">
                                    <div className="flex w-12 h-12 bg-success rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-circle-three-quarter" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Cours</h4>
                                        <h2 className="font-bold">{cours.length}</h2>
                                    </div>
                                </div>
                                <div className="flex ml-20">
                                    <div className="flex w-12 h-12 bg-warning rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-package" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Informations</h4>
                                        <h2 className="font-bold">{infos.length}</h2>
                                    </div>
                                </div>
                                <div className="flex ml-20">
                                    <div className="flex w-12 h-12 bg-danger rounded-xl shadow-xl items-center justify-center">
                                        <Icon name="bx-check-shield" color="white" size="30px"/>
                                    </div>
                                    <div className="pl-3">
                                        <h4>Projets</h4>
                                        <h2 className="font-bold">{projects.length}</h2>
                                    </div>
                                </div>
                            </div>
                       </CardFile>
                       
                        </div>
                        <h1 className="start-0 items-start font-roboto-semibold">Statistiques</h1>
                        <CardFile className="grid-cols-2 p-4 w-full   bg-[#ffffff] mt-6">
                            {/* <div> */}
                                
                            {/* </div> */}
                            <div className="flex items-center justify-center  p-4">
                                <BarChart width={500} height={300} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mois" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total" fill="#8884d8" />
                                </BarChart>
                            </div>
                            <div className="flex items-center justify-center  p-4">
                            <PieChart width={500} height={300}>
                                <Pie
                                    data={pieData}
                                    cx={250}
                                    cy={150}
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                            </div>
                           

                           
                       </CardFile>

                       
                    </section>
                </div>
            </div>
            <Footer />
        </div>
     );
}