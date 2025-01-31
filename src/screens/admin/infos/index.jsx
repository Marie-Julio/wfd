import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
// import { Informationes } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const InformationAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);

    const [informations, setInformations] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const columns = [
        { accessor: 'title', Header: 'Titre' },
        { accessor: 'visibility', Header: 'Visibilite' },
        { accessor: 'user.nom', Header: 'Utilisateur' },
      ];

      const _init_ = () => {
        getResource('/announcements').then((res) => {
            console.log(res.data)
            
            setInformations(res.data)
        })
      }

      useEffect(() => {
        _init_()
      }, [])

      const updateData = (new_data) => {
        setData(new_data)
    }

    const create = () => {
            navigate("/admin/informations-create");
    }

    const updateFunction = (item) => {
      console.log(item)
      navigate(`/admin/informations-update/${item.id}`);
    }
    
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Informations"
            data={informations}
            primaryKey="id"
            columns={columns}
            filter={filter}
            reloadFonction={_init_}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            addFunction={create}
            editFunction={updateFunction}
            open={isOpen}
            label="Filtrage"
            actions={true} 
            deleteUrl="/announcements"   
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
 
export default InformationAdmin;