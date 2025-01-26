import React from 'react';
import img from "../assets/imgCard.jpeg";
import img2 from "../../public/assets/images/certified.png";
import { Info, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URI_BASE;
    const handleDetail = () => {
        navigate(`/cours-detail/${course.id}`)
    }
  return (
    <div className="group relative rounded-md shadow hover:shadow-lg dark:shadow-gray-800 duration-500 ease-in-out overflow-hidden">
        <div className="relative overflow-hidden">
            <img src={img} className="group-hover:scale-110 duration-500 ease-in-out" alt="" />
            <div className="absolute inset-0 bg-slate-900/50 group-hover:opacity-0 opacity-100 duration-500 ease-in-out"></div>

            <div className="absolute start-0 bottom-0 opacity-100 duration-500 ease-in-out">
                <div className="pb-4 ps-4 flex items-center">
                    <img src="assets/images/client/01.jpg" className="size-12 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
                    <div className="ms-3">
                        <a href="#" className="font-semibold text-white block">{course.user_prenom} {course.user_nom} </a>
                        <span className="text-white/70 text-sm">{course.user_profession}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="content p-6 relative border-t-2">
            <button onClick={handleDetail} className="bg-[#1a5fa9] p-1 text-left uppercase font-semibold text-sm case block text-white">{course.type}</button>
            <button onClick={handleDetail} className="bg-white font-semibold p-0 text-1xl text-left block hover:text-indigo-600 duration-500 ease-in-out mt-2">{course.title}</button>
            <p className="text-slate-800 mt-3 mb-4">Credit: {course.min_score}</p>
            
            <ul className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center list-none text-slate-800">
                <li className="flex whitespace-nowrap items-center me-4">
                    <i className="uil uil-book-open text-lg leading-none me-2 text-slate-800 dark:text-white"></i>
                    <span>25 Lectures</span>
                </li>

                <li className="flex whitespace-nowrap items-center me-4">
                    <i className="uil uil-clock text-lg leading-none me-2 text-slate-800 dark:text-white"></i>
                    <span>{course.duree}</span>
                </li>
            </ul>
            {course.certifield === 1 ? 
            <div className="absolute -top-7 end-6 z-1 group-hover:scale-110  duration-500 ease-in-out">
                <div className="flex justify-center items-center size-20 bg-white dark:bg-slate-900 rounded-full shadow-lg dark:shadow-gray-800 text-indigo-600 dark:text-white">
                  <img src={img2} className="group-hover:scale-110 duration-500 ease-in-out" alt="" />
                </div>
            </div> : null }
        </div>
    </div>
  );
};

export default CourseCard;
