import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";

const Utilisateur = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);

    const [cours, setCours] = useState([]);
    const [data, setData] = useState();
    const roles = ["participant", "admin", "formateur"];
    const [fiches, setFiches] = useState(roles)

    const columns = [
        { accessor: 'nom', Header: "Nom " },
        { accessor: 'prenom', Header: "Prenom" },
        { accessor: 'email', Header: "Email" },
        { accessor: 'nationalite', Header: "Nationalite" },
        { accessor: 'role', Header: "Role" },
      ];

     

      const _init_ = () => {
        getResource('/afficher_liste_utilisateur').then((res) => {
            console.log(res.data)
            setCours(res.data.utilisateurs)
        })
      }

      useEffect(() => {
        _init_()
      }, [])

      const updateData = (new_data) => {
        setCours(new_data)
    }

      const create = () => {
        navigate("/admin/users-create");
      }

      const updateFunction = (item) => {
        console.log(item)
        navigate(`/admin/users-update/${item.id}`);
      } 

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des utilisateurs"
            data={cours}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            open={isOpen}
            fiches={fiches}
            addFunction={create}
            editFunction={updateFunction}
            reloadFonction={_init_}
            deleteUrl="/utilisateurs"
            label="Filtrage"
            actions={true} 
            // editFunction={} 
            // deleteUrl={}    
            >
               
            </Table>
        </Body>
     );
}
 
export default Utilisateur;