import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const QcmAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'title', Header: 'Titre' },
        { accessor: 'promotion.nom', Header: 'Promotion' },
      ];

      const _init_ = () => {
        getResource('/qcms').then((res) => {
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
          navigate("/admin/qcms-create");
    }

    const updateFunction = (item) => {
      console.log(item)
      navigate(`/admin/qcms-update/${item.id}`);
    } 
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des QCMs"
            data={cours}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            open={isOpen}
            reloadFonction={_init_}
            addFunction={create}
            editFunction={updateFunction}
            deleteUrl="/qcms"
            label="Filtrage"
            actions={true} 
            // editFunction={} 
            // deleteUrl={}    
            >
                
            </Table>
        </Body>
     );
}
 
export default QcmAdmin;