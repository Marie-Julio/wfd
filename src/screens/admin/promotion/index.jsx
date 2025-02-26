import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const PromotionAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
      { accessor: 'nom', Header: 'Nom de promotion' },
      { accessor: 'date_debut', Header: 'Date début' },
      { accessor: 'date_fin', Header: 'Date fin' },
      { accessor: 'duree', Header: 'Durée' },
      ];

      const _init_ = () => {
        getResource('/promotions').then((res) => {
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
      navigate("/admin/promotion-create");
    }

    const updateFunction = (item) => {
      navigate(`/admin/promotion-update/${item.id}`);
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
            addFunction={create}
            editFunction={updateFunction}
            reloadFonction={_init_}
            deleteUrl="/promotions"
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
 
export default PromotionAdmin;