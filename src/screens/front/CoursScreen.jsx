import AppBody from "../../components/AppBody";
import Cour from "../../components/Cour";
import { courses } from "../../Data/data";

const CoursScreen = () => {
    return ( 
        <AppBody>
          <section className="items-center justify-center min-h-screen w-full">

                 {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 my-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Nos Cours et Formations
                </h1>
                <p className="text-xl text-gray-600">
                    Développez vos compétences avec nos formations de qualité
                </p>
            </div>

            {/* Courses Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
                Cours disponibles
                </h2>
                <Cour courses={courses}/>
            </div>

            </section>


        </AppBody>
     );
}
 
export default CoursScreen;