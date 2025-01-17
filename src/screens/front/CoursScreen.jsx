import { ChevronDown, Search } from "lucide-react";
import AppBody from "../../components/AppBody";
import CourseCard from "../../components/CourseCard";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";

const CoursScreen = () => {
  const [courses, setCourses] = useState([]); // Tous les cours
  const [filteredCourses, setFilteredCourses] = useState([]); // Cours filtrés
  const [searchTerm, setSearchTerm] = useState(""); // Texte de recherche
  const [selectedFilter, setSelectedFilter] = useState(""); // Filtre actif
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const coursesPerPage = 9; // Nombre de cours par page
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  if (!accessToken) {
    navigate("/login");
  }

  const _init_ = () => {
    getResource("/course-modules")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data); // Initialiser les cours affichés
      })
      .catch((e) => {
        errorMessage(e);
      });
  };

  useEffect(() => {
    _init_();
  }, []);

  // Options de types de cours
  const filterOptions = [
    { label: "PDF", value: "pdf" },
    { label: "VIDEO", value: "video" },
    { label: "TEXT", value: "text" },
  ];

  // Gestion de la recherche
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    applyFilters(value, selectedFilter);
  };

  // Gestion du filtre par type
  const handleFilter = (filter) => {
    const value = filter === selectedFilter ? "" : filter; // Désélection si déjà actif
    setSelectedFilter(value);
    applyFilters(searchTerm, value);
  };

  // Appliquer les filtres combinés (recherche + type)
  const applyFilters = (search, filter) => {
    let filtered = courses;

    // Filtrer par recherche
    if (search) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrer par type
    if (filter) {
      filtered = filtered.filter((course) => course.type === filter);
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppBody
      titleBanner="Formez-vous aux Métiers du Numérique"
      descriptionBanner="Découvrez nos formations et opportunités professionnelles"
    >
      <section className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row lg:space-x-8">
          {/* Sidebar (Filtres) */}
          <div className="lg:w-1/4 w-full bg-custom-gradient text-white mb-8 lg:mb-0 p-4 rounded shadow">
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="mt-8 bg-custom-gradient text-white">
              <h2 className="text-lg font-semibold flex items-center ml-5">
                <span className="mr-2 text-2xl">≡</span> Filtres
              </h2>
              <div className="mt-4 p-4 rounded-2xl shadow bg-white text-black mx-5">
                <h3 className="font-bold mb-4">Type de cours</h3>
                {/* Boutons de filtres */}
                {filterOptions.map((filter) => (
                  <div key={filter.value} className="mt-4 mx-3">
                    <button
                      onClick={() => handleFilter(filter.value)}
                      className={`w-full flex justify-between items-center p-2 ${
                        selectedFilter === filter.value
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 hover:text-blue-600"
                      } rounded`}
                    >
                      <span>{filter.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section des cours */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-5">
            {currentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 w-full px-4">
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 mx-1 border rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {number}
              </button>
            ))}
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
      </section>
    </AppBody>
  );
};

export default CoursScreen;
