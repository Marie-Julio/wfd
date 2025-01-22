import React, { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import Nav from './Nav';
import Carousel from './Carousel';
import HeroBanner from './HeroBanner';
import BannerCour from './BannerCour';
import { Link } from 'react-router';
import bgfooter from "../assets/images/footer.jpg";

const AppBody = ({home, bannerCour, banner, course, titleBanner,className, imageBanner, descriptionBanner, children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({
    services: false,
    produits: false
  });

  const menusItems = [{label: 'Mentions légales', href : "/page-mention"}, {label: 'Politique de confidentialité', href : "/page-politique"}, {label : 'Contactez-nous', href : 'https://wfdguinee.org/contact/'}]

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
      <main className={`${className}`}>
        
        {children}
         
      </main>

      <div className="bg-[#1a5fa9]">
        <footer className="footer relative text-gray-100 dark:text-gray-400 bg-no-repeat bg-right" style={{ backgroundImage: `url(${bgfooter})`, backgroundPosition: "top left"}}>
            <div className="absolute inset-0 bg-gradient-to-r to-transparent via-[#1a5fa9] dark:via-slate-900 from-[#1a5fa9] dark:from-slate-900"></div>
            <div className="container relative">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="py-[60px] px-0">
                            <div className="grid grid-cols-1">
                                <div>
                                    <a href="mailto:contact@example.com" className="relative inline-block font-semibold tracking-wide align-middle text-center border-none after:content-['']
                                     after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-2xl text-white dark:text-white
                                     dark:hover:text-white hover:text-[#eb6b11] after:bg-[#eb6b11] dark:after:bg-white duration-500 ease-in-out">WELT FRIEDENS DIENST e.V</a>
                                </div>
                                <p className="mt-6 max-w-2xl">Service mondiale pour la paix</p>
                                <ul className="list-none mt-6 space-x-5">
                                    <li className="inline"><a href="" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center text-gray-400 hover:text-white border border-gray-100 dark:border-gray-800 rounded-md hover:border-[#eb6b11] dark:hover:border-[#eb6b11] hover:bg-[#eb6b11] dark:hover:bg-[#eb6b11]"><i className="uil uil-linkedin" title="Linkedin"></i></a></li>
                                    <li className="inline"><a href="" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center text-gray-400 hover:text-white border border-gray-100 dark:border-gray-800 rounded-md hover:border-[#eb6b11] dark:hover:border-[#eb6b11] hover:bg-[#eb6b11] dark:hover:bg-[#eb6b11]"><i className="uil uil-facebook-f align-middle" title="facebook"></i></a></li>
                                    <li className="inline"><a href="" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center text-gray-400 hover:text-white border border-gray-100 dark:border-gray-800 rounded-md hover:border-[#eb6b11] dark:hover:border-[#eb6b11] hover:bg-[#eb6b11] dark:hover:bg-[#eb6b11]"><i className="uil uil-instagram align-middle" title="instagram"></i></a></li>
                                    <li className="inline"><a href="" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center text-gray-400 hover:text-white border border-gray-100 dark:border-gray-800 rounded-md hover:border-[#eb6b11] dark:hover:border-[#eb6b11] hover:bg-[#eb6b11] dark:hover:bg-[#eb6b11]"><i className="uil uil-twitter align-middle" title="twitter"></i></a></li>
                                    <li className="inline"><a href="" className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center text-gray-400 hover:text-white border border-gray-100 dark:border-gray-800 rounded-md hover:border-[#eb6b11] dark:hover:border-[#eb6b11] hover:bg-[#eb6b11] dark:hover:bg-[#eb6b11]"><i className="uil uil-envelope align-middle" title="email"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-[30px] px-0 border-t border-slate-800">
                <div className="container relative text-center">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="md:text-start text-center">
                            <p className="mb-0">© <script>document.write(new Date().getFullYear())</script> WFD Guinée. Tous droits réservés.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default AppBody;