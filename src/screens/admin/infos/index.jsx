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
        { accessor: 'title', Header: 'Code' },
        { accessor: 'visibility', Header: 'Visibilite' },
        { accessor: 'user_id', Header: 'Utilisateur' },
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
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Informations"
            data={informations}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            addFunction={create}
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
 
export default InformationAdmin;