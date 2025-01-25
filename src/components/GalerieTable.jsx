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
      <h2 className="text-2xl font-bold mb-4">Mes Galeries</h2>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Titre</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery) => (
            <tr key={gallery.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={`${apiUrl}/storage/${gallery.image}`}
                  alt={gallery.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2">{gallery.title}</td>
              <td className="px-4 py-2">{gallery.description}</td>
              <td className="px-4 py-2">
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
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryTable;
