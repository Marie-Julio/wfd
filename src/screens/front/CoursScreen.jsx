import { ChevronDown, Search } from "lucide-react";
import AppBody from "../../components/AppBody";
import CourseCard from "../../components/CourseCard";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CoursScreen = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const coursesPerPage = 9; // Nombre de cours par page
  const navigate = useNavigate()

  //  const accessToken = localStorage.getItem("token");
  //   const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  
  //   if (!accessToken) {
  //     navigate("/login");
  //   }



  const _init_ = () => {
    getResource("/course-modules")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((e) => {
        errorMessage(e);
      });

      
  };

  useEffect(() => {
    _init_();
  }, []);

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppBody
      titleBanner="Formez-vous aux Métiers du Numérique"
      descriptionBanner="Découvrez nos formations et opportunités professionnelles"
    >
      <section className="flex flex-col items-center justify-center min-h-screen w-full">
        {/* Conteneur principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row lg:space-x-8">
          {/* Sidebar (Filtres) */}
          <div className="lg:w-1/4 w-full bg-custom-gradient text-white mb-8 lg:mb-0 p-4 rounded shadow">
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="mt-8 bg-custom-gradient text-white">
              <h2 className="text-lg font-semibold flex items-center ml-5">
                <span className="mr-2 text-2xl">≡</span> Filtres
              </h2>
              <div className="mt-4 p-4 rounded-2xl shadow bg-white text-black mx-5">
                <h3 className="font-bold mb-4">Filtres appliqués</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>En Présentiel</span>
                  </div>
                </div>
              </div>
              {/* Filter Sections */}
              {['Domaine', 'Durée', 'Type', 'Diplôme', 'Langue', 'Nouveau cours'].map((filter) => (
                <div key={filter} className="mt-4 mx-3">
                  <button className="w-full flex justify-between items-center p-2 hover:bg-gray-100 hover:text-blue-600 rounded">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="">{filter}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
