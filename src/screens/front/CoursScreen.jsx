import { ChevronDown, Search } from "lucide-react";
import AppBody from "../../components/AppBody";
import Cour from "../../components/Cour";
import CourseCard from "../../components/CourseCard";
import { courses } from "../../Data/data";

const CoursScreen = () => {
    return ( 
        <AppBody 
        titleBanner="Formez-vous aux Métiers du Numérique"
        descriptionBanner="Découvrez nos formations et opportunités professionnelles"
        >
         <section className="items-center justify-center min-h-screen w-full">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 my-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Cours et Formations</h1>
                <p className="text-xl text-gray-600">Développez vos compétences avec nos formations de qualité</p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto py-8 flex space-x-8">
                {/* Sidebar (Filters) */}
                <div className="w-1/4">
                <div className="relative">
                    <input
                    type="text"
                    placeholder="Recherche"
                    className="w-full p-2 pl-10 border rounded"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold flex items-center">
                    <span className="mr-2">≡</span> Filtres
                    </h2>

                    <div className="mt-4 p-4 bg-white rounded shadow">
                    <h3 className="font-bold mb-4">Filtres appliqués</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>En Présentiel</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Design UI/UX</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Licence</span>
                        </div>
                    </div>
                    </div>

                    {/* Filter Sections */}
                    {['Domaine', 'Durée', 'Type', 'Diplôme', 'Langue', 'Nouveau cours'].map((filter) => (
                    <div key={filter} className="mt-4">
                        <button className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                        <span>{filter}</span>
                        <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                    ))}
                </div>
                </div>

                {/* Courses Section */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
                </div>
            </div>
            </section>

        </AppBody>
     );
}
 
export default CoursScreen;