import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const NotificationAdmin = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'user.nom', Header: 'Nom' },
        { accessor: 'user.prenom', Header: 'Prenom' },
        { accessor: 'message', Header: 'Message' },
      ];

      const _init_ = () => {
        getResource('/notifications').then((res) => {
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
          navigate("/admin/notification-create");
    }

    const updateFunction = (item) => {
      console.log(item)
      navigate(`/admin/notification-update/${item.id}`);
    } 

    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Notifications"
            data={cours}
            columns={columns}
            filter={filter}
            reloadFonction={_init_}
            setFilter={setFilter}
            setOpenSidebar={setIsOpen}
            addFunction={create}
            editFunction={updateFunction}
            deleteUrl="/notifications"
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
 
export default NotificationAdmin;