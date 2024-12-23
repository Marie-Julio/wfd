import slide_1 from "../assets/slide-1.jpg";
import slide_2 from "../assets/slide-2.jpg";
import slide_3 from "../assets/slide-3.jpg";
import slide_4 from "../assets/slide-4.jpg";
import slide_5 from "../assets/slide-5.jpg";

const Carousel = () => {
    return ( 


<div id="default-carousel" className="relative w-full h-screen md:mt-0" data-carousel="slide">
  {/* <!-- Carousel wrapper --> */}
  <div className="relative w-full h-full overflow-hidden">
    {/* <!-- Item 1 --> */}
    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
      <img 
        src={slide_1} 
        className="block w-full h-full object-cover" 
        alt="Slide 1" 
      />
    </div>
    {/* <!-- Item 2 --> */}
    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
      <img 
        src={slide_2} 
        className="block w-full h-full object-cover" 
        alt="Slide 2" 
      />
    </div>
    {/* <!-- Item 3 --> */}
    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
      <img 
        src={slide_3} 
        className="block w-full h-full object-cover" 
        alt="Slide 3" 
      />
    </div>
    {/* <!-- Add other items similarly --> */}
  </div>

  {/* <!-- Slider indicators --> */}
  <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
    <button type="button" className="w-3 h-3 rounded-full" data-carousel-slide-to="0"></button>
    <button type="button" className="w-3 h-3 rounded-full" data-carousel-slide-to="1"></button>
    <button type="button" className="w-3 h-3 rounded-full" data-carousel-slide-to="2"></button>
  </div>

  {/* <!-- Slider controls --> */}
  <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>
  <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
      </svg>
      <span className="sr-only">Next</span>
    </span>
  </button>
</div>


     );
}
 
export default Carousel;