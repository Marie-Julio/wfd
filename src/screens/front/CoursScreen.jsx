import { ChevronDown, Search } from "lucide-react";
import AppBody from "../../components/AppBody";
import CourseCard from "../../components/CourseCard";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";

const CoursScreen = () => {
  const [courses, setCourses] = useState([]);
  const [promotion, setPromotion] = useState([]); // Tous les cours
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

  useEffect(() => {
    getResource("/lastpromotion")
      .then((res) => {
        setPromotion(res.data);
        console.log("--------------");
    })
  }, []);

  useEffect(() => {
    getResource("/course-modules?promotion_id="+promotion.id)
    .then((res) => {
      console.log("--------------2");
      console.log(promotion);
      setCourses(res.data);
      setFilteredCourses(res.data); // Initialiser les cours affichés
    })
  }, [promotion]);

  useEffect(() => {
    feather.replace();
  }, []);

  // Options de types de cours
  const filterOptions = [
    { label: "ALL", value: "" },
    { label: "PDF", value: "pdf" },
    { label: "PDF & Vidéo ", value: "video & pdf" },
    { label: "Vidéo", value: "video" },
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
    <AppBody>
    <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">Les cours</h1>
      <div className="items-center pt-5">
      De la Promotion en cours : <span className="bg-[#eb6b11] text-white py-1 px-3 rounded-full text-lg">{promotion.nom}</span>
      </div>
    </div>
    <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:px-8 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center">
          <p className="text-base md:text-xl text-gray-600">
          Veuillez consulter nos derniers cours de formation
          </p>
      </div><br /><br />
      
      <div className="">
        <div className="grid md:grid-cols-12 grid-cols-1">
          <div className="lg:col-span-3 md:col-span-4">
            
            <div className="shadow dark:shadow-gray-800 p-6 rounded-md bg-[#eb6b11] dark:bg-slate-900 sticky top-20">
              
                  <div className="grid grid-cols-1 gap-3">
                      <div>
                          <label for="searchname" className="hidden font-semibold"></label>
                          <div className="relative">
                              <i data-feather="search" className="size-4  absolute top-3 start-3"></i>
                          
                              <input value={searchTerm} onChange={handleSearch} type="text" className="form-input w-full py-2 px-3 h-10 ps-9 bg-white
                               dark:bg-slate-50 dark:text-slate-50 rounded outline-none border border-gray-50 focus:border-gray-50 dark:border-gray-50 dark:focus:border-gray-50 
                               focus:ring-0" placeholder="Rechercher" />
                          </div>
                      </div>
            <div className="mt-8 text-white">
                <h2 className="text-lg font-semibold">
                   Filtres type de cours
                </h2>
                {filterOptions.map((filter) => (
                  <div key={filter.value} className="mt-4">
                    <button
                      onClick={() => handleFilter(filter.value)}
                      className={`bg-transparent border-2 w-full flex justify-between items-center p-2 ${
                        selectedFilter === filter.value
                          ? "bg-[#1a5fa9] text-white"
                          : "hover:bg-transparent hover:bg-gray-600"
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
          </div>
          
          <div className=" pt-10 md:pt-0 lg:col-span-9 md:col-span-8">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-5">
            {currentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          </div>
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
                    ? "bg-[#1a5fa9] text-white"
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
