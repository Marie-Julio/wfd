import image1 from "../assets/slide-1.jpg"

const HeroBanner = () => {
    return ( 
      <div className="relative">
      <img 
        src={image1} 
        alt="Education Banner" 
        className="w-full h-96 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Formez-vous aux Métiers du Numérique</h1>
          <p className="text-xl md:text-2xl mb-8">Découvrez nos formations et opportunités professionnelles</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>

     );
}
 
export default HeroBanner;