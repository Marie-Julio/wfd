import React from 'react';
import img from "../assets/imgCard.jpeg";
import { Info } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow rounded-lg p-1">
      <img
        src={img}
        alt="Course Thumbnail"
        className="w-full h-40 object-cover rounded"
      />
      <span className="bg-orange-500 text-white font-semibold p-1 rounded-sm float-right flex justify-between">
      <Info size={20} color="#fff" className='mr-1 -mb-2'/>Certifié</span>
      <div className='rounded-md border px-5'>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        {/* <p className="text-gray-600">{course.location}</p> */}
        <p className="text-gray-600">{course.duration}</p>
        {/* {course.isCertified && ( */}
          
        {/* )} */}
      </div>
      <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded">
        Plus d'informations
      </button>
      </div>
      
    </div>
  );
};

export default CourseCard;
