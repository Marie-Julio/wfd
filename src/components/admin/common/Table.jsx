import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from './Icon';
import Select from './Select';
import { Input } from './Input';
import { patchResource, removeResource } from '../../../services/api';
import { errorMessage, onServerSuccess } from '../../../services/Helper';
import Modal from './Modal';
import Button from './Button';
import danger from '../../../assets/icons/danger.svg'
import { search } from '../../../utils/utils';



const Table  = ({ data, reloadFonction, columns = [],open, actions = true, primaryKey = "id",  title, children, label, editFunction, addFunction,  deleteUrl, setOpenSidebar, filter, fiches, setFilter}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentData, setCurrentData] = useState(data)
  const [items, setItems] = useState(currentData);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [delModal, setDelModal] = useState(false);
  const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [valueFiche, setValueFiche] = useState(null)
  // const [filter , setFilter] = useState(false)

  const getNestedValue = (obj, accessor) => {
    return accessor.split('.').reduce((value, key) => {
      return value && value[key] ? value[key] : null;
    }, obj);
  };
  
  
  const filteredData = data.filter((row) =>
    columns.some((column) =>
      getNestedValue(row, column.accessor)?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleFilterToggle = () => {
    setFilter(!filter); // Changez l'état du filtre
    setOpenSidebar(!open); // Fermez le Sidebar
};

const updateItemsSelected = (item) => {
  // if(itemsSelected.includes(item)){
      if (itemsSelected.some(selectedItem => selectedItem[primaryKey] === item[primaryKey])) {
      setItemsSelected(() => itemsSelected.filter(id => id[primaryKey] != item[primaryKey]))
  }else{
      setItemsSelected([...itemsSelected, item])
  }
}


  const deleteItems = (array = itemsSelected) => {
    const arrayId = array.map(item => item[primaryKey])
    console.log(arrayId)
    removeResource(deleteUrl , arrayId).then((res) => {
        onServerSuccess(res.data.message)
        reloadFonction()
        setDelModal(false)
    }).catch(e => {
        errorMessage(e)
    }).finally(() => reloadFonction())

    setDelModal(false)
}

useEffect(() => {
  setCurrentData(data)
  setPage(1)
}, [data])

useEffect(() => {
setTotalPages(Math.ceil(currentData.length / itemsPerPage));
}, [currentData, itemsPerPage]);

useEffect(() => {
const offset = (page - 1) * itemsPerPage;
setItems(currentData.slice(offset, offset + itemsPerPage));
}, [itemsPerPage, page, currentData]);

  // const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleExport = () => {
    // Logique d'exportation (ex: générer un fichier CSV)
    console.log('Exporting data...');
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Logique d'importation
      console.log('Importing data...');
    }
  };


  // Fonction de filtrage
  const searchText = (e) => {
    const texte = e.target.value.toLowerCase()
    setSearchTerm(texte)
    data.filter((row) =>
      columns.some((column) =>
        getNestedValue(row, column.accessor)?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // setCurrentData(() => search(data, columns, texte))
    setPage(1)
}

  

  const handleSelectChange = (e, item) => {
    e.stopPropagation();
    const selectedValue = e.target.value;
    setValueFiche(selectedValue)
     patchResource("/modifier_utilisateur", item, {role: selectedValue}).then((res) => {
                // console.log(res)
                onServerSuccess(res.data.message)
            }).catch(e => {
                errorMessage(e)
            })
    
}

  const handleDelete = () => {
    // Logique pour supprimer les lignes sélectionnées
    const remainingData = data.filter(
      (row) => !selectedRows.includes(row.id)
    );
    console.log('Deleted rows:', remainingData);
    setSelectedRows([]);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full h-full flex  border drop-shadow-xl shadow-xl divide-gray-700 rounded-lg p-4">
      { children && filter &&  
                <div className="px-3 flex flex-col items-center w-96 bg-white shadow-lg rounded-md mr-8 mt-9">
                    <p className="font-bold text-lg text-primary my-9 text-center">{label}</p>
                    { children }
                </div>
            }
      <div className="flex flex-col items-center w-full">
      <div className='pt-0 border-bt-2  text-black font-extrabold text-2xl'>
        <h1>{title}</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Rechercher..."
          className="p-2 rounded"
          value={searchTerm}
          onChange={searchText}
        />
        <div className="flex space-x-2">
        <div  className="w-32 mx-3">
            <Select vlaue={itemsSelected} onChange={(e) => {setItemsPerPage(parseInt(e.target.value)), 
            setPage(1)}}>
                {
                    [5,10,20,30,50,100].map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </Select>
        </div>
        <button
            className="bg-warning text-white p-2 rounded cursor-pointer flex h-2/3 mt-2"
            onClick={handleFilterToggle}
          >
            <Icon name="bx-cloud-upload" />
            Filtrer
          </button>
          {/* <button
            onClick={handleExport}
            className="bg-blue-800 text-white p-2 rounded flex h-2/3 mt-2"
          >            
          <Icon name="bx-cloud-download" />
            Export
          </button> */}
          {/* <Input
            type="file"
            onChange={handleImport}
            className="hidden"
            // id="fileInput"
          /> */}
          {/* <button
            className="bg-tertiaire text-white p-2 rounded cursor-pointer flex h-2/3 mt-2"
            // onChange={handleImport}
          >
            <Icon name="bx-cloud-upload" />
            Import
          </button> */}
          <button
            className="bg-[#0ba603] text-white p-2 rounded cursor-pointer flex h-2/3 mt-2"
            onClick={addFunction}
          >
            <Icon name="bx-plus" />
             Ajouter
          </button>
          <button
            onClick={() => setDelModal(true)}
            // disabled={selectedRows.length === 0}
            className="bg-danger text-white p-2 rounded flex h-2/3 mt-2"
          >
            <Icon name="bx-trash" />
            Delete
          </button>
        </div>
      </div>
      <table className="border-collapse text-center w-full h-full boder bg-white drop-shadow-xl">
        <thead className="bg-tertiaire  text-white">
          <tr>
            
            {columns.map((column) => (
              <th key={column.accessor} className="border border-neutral-200 p-2">
                {column.Header.toUpperCase()}
              </th>
            ))}
            {
                fiches && <th className="border border-slate-300 p-2">Fiches</th>
            }
            {
                actions && <th className="border border-neutral-200 p-1">ACTIONS</th>
            }
          </tr>
        </thead>
        <tbody className='text-black font-medium'>
          {paginatedData.length > 0 ? paginatedData.map((row) => (
            <tr key={row.id}
            onClick={() => updateItemsSelected(row)}
            className={`hover:cursor-pointer ${itemsSelected.includes(row) ? "bg-orange-500 text-white" : ""}`} >
              
              {columns.map((column) => (
                <td key={column.accessor} className="border border-neutral-200 ">
                  {getNestedValue(row, column.accessor)}
                </td>
              ))}
              {fiches && (
                                        <td className="border border-slate-300 p-2">
                                            <Select name="valueFiche" value={valueFiche} onChange={(e) => handleSelectChange(e, row.id)}>
                                                <option value="">Choisir une fiche</option>
                                                {fiches.map((fiche) => (
                                                    <option key={fiche} value={fiche}>
                                                        {fiche}
                                                    </option>
                                                ))}
                                            </Select>
                                        </td>
                                    )}
              
              { actions &&
                <td className="border border-neutral-200 p-0 w-full h-full flex flex-wrap items-center justify-around">
                   
                        <span onClick={() => editFunction(row)} className="bg-warning text-white py-2 px-3 rounded-md flex flex-row items-center justify-center z-999">
                            <Icon name="bx-edit-alt" />
                        </span>
                   
                       
                        {deleteUrl && ( <span onClick={() => {
                                setItemsSelected([]);
                                updateItemsSelected(row);
                                setDelModal(true);
                            }}  className="bg-danger text-white py-2 px-3 rounded-md flex flex-row items-center justify-center z-999">
                            <Icon name="bx-trash" />
                        </span> )}
                 
                </td>
            }
            </tr>
          )) :
          <tr>
              <td colSpan={columns.length + 1} className="text-xl font-bold">Aucun resultat trouvé</td>
          </tr>
      }
          
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div className='flex space-x-2'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="p-2 border rounded bg-blue-400 text-white"
          >
            Precedent
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="p-2 border rounded bg-orange-400 text-white"
          >
            Suivant
          </button>
        </div>
        <div>
          Page {currentPage + 1} of {totalPages}
        </div>
      </div>
      </div>
      <Modal isOpen={delModal} onClose={() => setDelModal(false)}>
                <div className="flex flex-col items-center">
                    <img src={danger} className="w-12 h-12 mb-3"/>
                    <p className="text-black text-xl font-bold">Êtes-vous sûr de vouloir supprimer ?</p>
                    <div className="flex mt-5">
                        <Button className="bg-danger mr-3" onClick={() => deleteItems()}>OUI</Button>
                        <Button className="bg-gray-700" onClick={() => setDelModal(false)}>NON</Button>
                    </div>
                </div>
            </Modal>
    </div>
  );
};

export default Table;
