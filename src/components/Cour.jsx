import { Book, ChevronDown, ChevronUp, Clock, Star, User } from "lucide-react";
import { useState } from "react";

const Cour = ({courses = []}) => {
    const [expandedCourse, setExpandedCourse] = useState(null);
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white w-130  rounded-lg shadow-lg overflow-hidden transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600">{course.description}</p>
                  <div className="flex flex-nowrap items-center space-x-8 my-6 text-sm text-gray-500 mb-4 px-2">
                    <div className="flex items-center">
                      <User className="mr-1" />
                      {course.instructor}
                    </div>
                    <div className="flex flex-nowrap items-center">
                      <Clock className="mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex flex-nowrap items-center">
                      <Star className="mr-1 text-yellow-400" />
                      {course.rating} ({course.students} étudiants)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  {expandedCourse === course.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>
              {expandedCourse === course.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Modules du cours:</h4>
                  <ul className="space-y-2">
                    {course.modules.map((module, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Book className="w-4 h-4 mr-2" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
     );
}
 
export default Cour;