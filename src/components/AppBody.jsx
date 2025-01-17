import React, { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import Nav from './Nav';
import Carousel from './Carousel';
import HeroBanner from './HeroBanner';
import BannerCour from './BannerCour';
import { Link } from 'react-router';

const AppBody = ({home, bannerCour, banner, course, titleBanner,className, imageBanner, descriptionBanner, children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({
    services: false,
    produits: false
  });

  const menusItems = [{label: 'Mentions légales', href : "/page-mention"}, {label: 'Politique de confidentialité', href : "/page-politique"}, {label : 'Contactez-nous', href : '#'}]

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* Header Responsive */}
      
         <Nav/>
         {home  && <Carousel/>}
         {banner && <HeroBanner title={titleBanner} image={imageBanner} description={descriptionBanner}/>}
         {bannerCour && <BannerCour course={course} />}

         
        
        

      {/* Corps de page Responsive */}
      <main className={`flex-grow flex ${className}`}>
        
        {children}
         
      </main>

      {/* Footer Responsive */}
       <footer className="bg-custom-gradient text-white py-6 w-full">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left text-xs sm:text-sm">
            © 2024 WFDGuinee. Tous droits réservés.
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center">
            {menusItems.map((link) => (
              <Link
                key={link}
                to={link.href}
                className="text-2xl sm:text-sm hover:text-blue-300 block sm:inline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppBody;