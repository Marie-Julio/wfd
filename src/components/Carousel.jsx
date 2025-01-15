import { useEffect, useState } from "react";
import slide_1 from "../assets/slide-1.jpg";
import slide_2 from "../assets/slide-2.jpg";
import slide_3 from "../assets/slide-3.jpg";

const Carousel = () => {
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [slide_1, slide_2, slide_3];

  useEffect(() => {
    // Simule un rechargement du DOM pendant 5 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Gestion automatique du défilement après le chargement
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval); // Nettoyage de l'intervalle
    }
  }, [isLoading, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-200">
        <p className="text-lg font-semibold">Chargement...</p>
      </div>
    );
  }

  return (
    <div
      id="default-carousel"
      className="relative w-full h-screen md:mt-0"
      data-carousel="slide"
    >
      {/* <!-- Carousel wrapper --> */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out h-full ${
              index === activeIndex ? "block" : "hidden"
            }`}
            data-carousel-item
          >
            <img
              src={slide}
              className="block w-full h-full object-cover animate-rotate-y animate-once animate-duration-[5000ms] animate-delay-500"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* <!-- Slider indicators --> */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full animate-rotate-y animate-once animate-duration-[5000ms] animate-delay-500 ${
              index === activeIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>

      {/* <!-- Slider controls --> */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
