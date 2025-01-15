import React from 'react';
import img from "../assets/imgCard.jpeg";
import { Info, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const handleDetail = () => {
        navigate(`/page-cours-detail/${course.id}`)
    }
  return (
    <div className="bg-white shadow-lg rounded-lg border p-1 hover:shadow-orange-500/90 w-80 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={img}
        alt="Course Thumbnail"
        className="w-full h-40 object-cover rounded"
      />
      <span className="bg-orange-500 text-white font-semibold p-1 rounded-lg float-right flex justify-between">
      
      <Info strokeWidth={3} size={20} color="#fff" className='mr-1 -mb-2'/>Certifié</span>
      <div className='rounded-md px-1 h-auto'>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-gray-600 font-semibold">Type de cours: {course.type}</p>
        <p className="text-gray-600">Credit: {course.min_score}</p>
        {/* {course.isCertified && ( */}
          
        {/* )} */}
      </div>
      <button className="flex w-full mt-4 mb-1 -mr-1 bg-orange-500 text-white py-2 px-4 rounded-xl" onClick={handleDetail}>
        <Plus size={24}/>
        Plus d'informations
      </button>
      </div>
      
    </div>
  );
};

export default CourseCard;
