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
    <div class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
  <div class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
    <img
      src={img}
      alt="ui/ux review check"
    />
    <div class="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
    <button
      class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-dark="true"
    >
      <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          class="h-6 w-6"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg>
      </span>
    </button>
  </div>
  <div class="p-6">
    <div class="mb-3 flex items-center justify-between">
      <h5 class="block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
      {course.title}
      </h5>
      <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          class="-mt-0.5 h-5 w-5 text-orange-700"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"
          ></path>
        </svg>
        5.0
      </p>
    </div>
    <p class="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
      { course.description }
    </p>
    <div class="group mt-8 inline-flex flex-wrap items-center gap-3">
    <div className="mt-4">
        <p className="text-gray-600"><span className='font-semibold'>Type de cours:</span> {course.type}</p>
        <p className="text-gray-600"><span className='font-semibold'>Credit:</span> {course.min_score}</p>
       
      </div>
     
     

    </div>
  </div>
  <div class="p-6 pt-3">
    <button
      class="block w-full select-none rounded-lg bg-orange-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-light="true"
      onClick={handleDetail}
    >
      + Information
    </button>
  </div>
</div>
  );
};

export default CourseCard;
