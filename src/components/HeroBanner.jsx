import image1 from "../assets/slide-1.jpg"
import "../assets/css/header.css";

const HeroBanner = ({image, title,  description}) => {
    return ( 
      <div className="relative">
      <img 
        src={image ? image : image1} 
        alt="Education Banner" 
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl mb-8">{description}</p>
        </div>
      </div>
    </div>

     );
}
 
export default HeroBanner;