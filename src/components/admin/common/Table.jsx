import React, { useState } from 'react';
import axios from 'axios';
import Icon from './Icon';
import Select from './Select';
import { Input } from './Input';



const Table  = ({ data, columns = [],open, actions = true, title, children, label, editFunction, deleteUrl, setOpenSidebar, filter, setFilter}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
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

  // // Effectuer un effet lors du changement de l'état filter
  // React.useEffect(() => {
  //   if (filter) {
  //     setOpenSidebar(false); // Ferme le sidebar lorsque filter est true
  //   }
  // }, [filter, setOpenSidebar]);

  

  const totalPages = Math.ceil(filteredData.length / pageSize);

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
          placeholder="Search..."
          className="p-2 rounded"
          value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-2">
        <div  className="w-32 mx-3">
            <Select>
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
          <button
            onClick={handleExport}
            className="bg-blue-800 text-white p-2 rounded flex h-2/3 mt-2"
          >            
          <Icon name="bx-cloud-download" />
            Export
          </button>
          {/* <Input
            type="file"
            onChange={handleImport}
            className="hidden"
            // id="fileInput"
          /> */}
          <button
            className="bg-tertiaire text-white p-2 rounded cursor-pointer flex h-2/3 mt-2"
            // onChange={handleImport}
          >
            <Icon name="bx-cloud-upload" />
            Import
          </button>
          <button
            className="bg-[#0ba603] text-white p-2 rounded cursor-pointer flex h-2/3 mt-2"
            // onChange={handleImport}
          >
            <Icon name="bx-plus" />
             Ajouter
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
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
                actions && <th className="border border-neutral-200 p-1">ACTIONS</th>
            }
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-primary-100 text-black">
              
              {columns.map((column) => (
                <td key={column.accessor} className="border border-neutral-200 p-2">
                  {row[column.accessor]}
                </td>
              ))}
              { actions &&
                <td className="border border-neutral-200 p-0 w-full h-full flex flex-wrap items-center justify-around">
                   
                        <span onClick={editFunction} className="bg-warning text-white py-2 px-3 rounded-md flex flex-row items-center justify-center z-999">
                            <Icon name="bx-edit-alt" />
                        </span>
                   
                       
                        <span onClick={deleteUrl}  className="bg-danger text-white py-2 px-3 rounded-md flex flex-row items-center justify-center z-999">
                            <Icon name="bx-trash" />
                        </span>
                 
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
            className="p-2 border rounded"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="p-2 border rounded"
          >
            Next
          </button>
        </div>
        <div>
          Page {currentPage + 1} of {totalPages}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Table;
