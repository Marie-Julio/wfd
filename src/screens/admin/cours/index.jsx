import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const Cours = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'title', Header: 'Titre' },
        { accessor: 'promotion.nom', Header: 'Promotion' },
        { accessor: 'type', Header: 'Type' },
        { accessor: 'min_score', Header: 'Score min' },
        { accessor: 'duree', Header: 'Durée(h)' },
      ];

      const _init_ = () => {
        getResource('/course-modules').then((res) => {
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
      navigate("/admin/cours-create");
    }

    const updateFunction = (item) => {
      navigate(`/admin/cours-update/${item.id}`);
    }
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Cours"
            data={cours}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            reloadFonction={_init_}
            open={isOpen}
            addFunction={create}
            editFunction={updateFunction}
            deleteUrl="/course-modules"
            label="Filtrage"
            actions={true}    
            >
             
            </Table>
        </Body>
     );
}
 
export default Cours;