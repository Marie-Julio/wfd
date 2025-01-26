import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const GalerieAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [choix, setChoix] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'title', Header: 'Titre' },
        { accessor: 'description', Header: 'Description' },
        { accessor: 'promotion_id', Header: 'Promotion' },
        { accessor: 'user_id', Header: 'ID User' },
      ];

      const _init_ = () => {
        getResource('/galleries').then((res) => {
            console.log(res.data)
            setChoix(res.data)
        })
      }

      useEffect(() => {
        _init_()
      }, [])

      const updateData = (new_data) => {
        setchoix(new_data)
    }

    const create = () => {
          navigate("/admin/gallerie-create");
    }

    // const updateFunction = (item) => {
    //   console.log(item)
    //   navigate(`/admin/galerie-update/${item.id}`);
    // } 
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des images de la galerie"
            data={choix}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            open={isOpen}
            reloadFonction={_init_}
            addFunction={create}
            // editFunction={updateFunction}
            deleteUrl="/galleries"
            label="Filtrage"
            actions={true}   
            >
                
            </Table>
        </Body>
     );
}
 
export default GalerieAdmin;