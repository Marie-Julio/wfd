import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";

const ProjetAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);

    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'titre', Header: 'Titre' },
        { accessor: 'user.nom', Header: 'Nom participant' },
        { accessor: 'user.prenom', Header: 'Prenom' },
        { accessor: 'inscription.annee', Header: 'Inscription' },
      ];

      const _init_ = () => {
        getResource('/projets').then((res) => {
            console.log(res.data)
            setCours(res.data)
        })
      }

      useEffect(() => {
        _init_()
      }, [])

      const updateData = (new_data) => {
        setCours(new_data)
    }
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Promotions"
            data={cours}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            open={isOpen}
            label="Filtrage"
            actions={false} 
            // editFunction={} 
            // deleteUrl={}    
            >
                <ViewMore title="Code">
                {/* <Searchable
                    data={data}
                    label="Rechercher par Libelle"
                    searchColumns={["code"]}
                    bodyColumns={["code", "libelle"]}
                    headColumns={["code", "libelle"]}
                    showData={updateData}/> */}
                </ViewMore>
            </Table>
        </Body>
     );
}
 
export default ProjetAdmin;