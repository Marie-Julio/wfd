import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";

const Cours = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);

    const [cours, setCours] = useState([]);
    const [data, setData] = useState(courses);

    const columns = [
        { accessor: 'title', Header: 'Code' },
        { accessor: 'instructor', Header: 'Libellé' },
        { accessor: 'duration', Header: 'Departement' },
      ];

    //   const _init_ = () => {
    //     getResource('/Cours').then((res) => {
    //         console.log(res.data)
    //         setCourss(res.data.data)
    //     })
    //   }

    //   useEffect(() => {
    //     _init_()
    //   }, [])

      const updateData = (new_data) => {
        setCours(new_data)
    }
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des Courss"
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
 
export default Cours;