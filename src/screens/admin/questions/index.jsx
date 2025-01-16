import { useEffect, useState } from "react";
// import { getResource } from "../../services/Api";
import { Body } from "../../../components/admin/common/Body";
import Table from "../../../components/admin/common/Table";
import { courses } from "../../../Data/data";
import ViewMore from "../../../components/admin/common/ViewMore";
import Searchable from "../../../components/admin/common/Searchable";
import { getResource } from "../../../services/api";
import { useNavigate } from "react-router";

const Question = () => {
    const [filter, setFilter] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [cours, setCours] = useState([]);
    const [data, setData] = useState();

    const columns = [
        { accessor: 'question_text', Header: 'Question' },
        { accessor: 'correct_answer', Header: 'Reponse correct' },
        { accessor: 'qcm.title', Header: 'Qcm' },
      ];

      const _init_ = () => {
        getResource('/qcm-questions').then((res) => {
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
          navigate("/admin/qcms-questions-create");
    }

    const updateFunction = (item) => {
      console.log(item)
      navigate(`/admin/qcms-questions-update/${item.id}`);
    } 
    return ( 
        <Body isOpen={isOpen} setIsOpen={setIsOpen}>
            <Table
            title="Liste des QCm Question"
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
 
export default Question;