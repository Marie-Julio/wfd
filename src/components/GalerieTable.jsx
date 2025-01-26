import React, { useState } from "react";
import { removeResource } from "../services/api";
import Icon from "./admin/common/Icon";

const GalleryTable = ({ galleries = []}) => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URI_BASE;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(galleries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = galleries.slice(startIndex, startIndex + itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getVisiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 5) {
        pages.push(i);
      }
    }
    return pages;
  };
  
  const visiblePages = getVisiblePages();

  const handleDelete = async (id) => {
    setLoading(true);
    const arrayId = [id]
    try {
      await removeResource("galleries" , arrayId); // Appelle une fonction passée en prop pour supprimer
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-5">
      <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
      <table className=" bg-slate-100 w-full text-start">
        <thead>
          <tr>
            <th className="px-4 py-5 text-start">Image</th>
            <th className="px-4 py-5 text-start">Information</th>
            <th className="px-4 py-5 text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((gallery) => (
            <tr key={gallery.id} className="border-t-2 border-white dark:border-gray-700">
              <td className="p-4">
                <img
                  src={`${apiUrl}/storage/${gallery.image}`}
                  alt={gallery.title}
                  className="h-15 object-cover rounded-md"
                />
              </td>
              <td className="p-4 text-start text-md"><span className=" font-semibold text-[#1a5fa9]">{gallery.title}</span><br />{gallery.description}</td>
              <td className="p-4 text-end">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(gallery.id)}
                  disabled={loading}
                >
                  {loading ? "Suppression..." : <Icon name="bx-trash" />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className=" w-full flex justify-center bg-white py-4">
        <nav className="inline-flex">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
            }`}
          >
            Précédent
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === number
                  ? "bg-[#1a5fa9] text-white"
                  : "bg-white"
              }`}
            >
              {number}
            </button>
          ))}

        {totalPages > 3 && (
                <span className="px-2 text-gray-600">...</span>
              )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-white"
            }`}
          >
            Suivant
          </button>
        </nav>
      </div>
    </div>
  );
};

export default GalleryTable;
