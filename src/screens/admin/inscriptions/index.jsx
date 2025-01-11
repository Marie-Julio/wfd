import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const InscriptionAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'user.nom', Header: 'Nom participant' },
        { accessor: 'promotion.nom', Header: 'Nom de promotion' },
        { accessor: 'annee', Header: 'Annee' },
        { accessor: 'statut', Header: 'Statut' },
      ];

      const _init_ = () => {
        getResource('/inscriptions').then((res) => {
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

    const create = () => {
      navigate("/admin/inscription-create");
    }

    const updateFunction = (item) => {
      navigate(`/admin/inscription-update/${item.id}`);
    }


    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des inscriptions"
            data={cours}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            addFunction={create}
            editFunction={updateFunction}
            open={isOpen}
            label="Filtrage"
            actions={true} 
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
 
export default InscriptionAdmin;