import React, { useEffect } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Shuffle from 'shufflejs'; 

const GallerieComponent = ({galleries = []}) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      groupAll: true // Active le slider entre images
    });

    return () => {
      Fancybox.destroy();
    };
  }, [galleries]);

    useEffect(() => {
      const gridElement = document.getElementById('grid');
      
      if (gridElement) {
        const shuffle = new Shuffle(gridElement, {
          itemSelector: '.picture-item',
          sizer: gridElement.querySelector('.my-sizer-element'),
        });
  
        const filterButtons = document.querySelectorAll('.filter-options button');
        
        const handleFilterClick = (evt) => {
          const btn = evt.currentTarget;
          const isActive = btn.classList.contains('active');
          const btnGroup = btn.getAttribute('data-group');
  
          // Retire la classe active des autres boutons
          filterButtons.forEach(button => button.classList.remove('active'));
  
          let filterGroup;
          if (isActive) {
            filterGroup = Shuffle.ALL_ITEMS;
          } else {
            btn.classList.add('active');
            filterGroup = btnGroup;
          }
  
          shuffle.filter(filterGroup);
        };
  
        filterButtons.forEach(button => {
          button.addEventListener('click', handleFilterClick);
        });
  
        // Nettoyage
        return () => {
          filterButtons.forEach(button => {
            button.removeEventListener('click', handleFilterClick);
          });
          shuffle.destroy();
        };
      }
    }, []);
    const apiUrl = import.meta.env.VITE_API_URI_BASE;

    return (
        <div class="relative md:py-6 py-5">
            <div class="container relative">

                <div id="grid" class="md:flex justify-center mx-auto mt-4">
                {galleries.map((x) => (
                    <div class="lg:w-1/3 md:w-1/3 p-1 picture-item" key={x.id} data-groups={`["${x.promotion_id}"]`}>
                        <div class="group relative block overflow-hidden rounded-md duration-500">
                            <div class="lightbox duration-500 group-hover:scale-105" title="">
                                <img src={`${apiUrl}/storage/${x.image}`} class="" alt="work-image"  />
                            </div>
                            <div class="content duration-500">
                                <div class="icon absolute z-10 opacity-0 group-hover:opacity-100 top-6 end-6 duration-500">
                                    <a href={`${apiUrl}/storage/${x.image}`} data-fancybox="gallery" data-caption={x.title} class="size-14 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center bg-[#eb6b11] hover:bg-indigo-700 border-[#eb6b11] hover:border-indigo-700 text-white rounded-full lightbox"><i class="uil uil-camera text-2xl"></i></a>
                                </div>
                                <div class="absolute -bottom-52 group-hover:bottom-2 start-2 end-2 duration-500 bg-white dark:bg-slate-900 p-4 rounded shadow dark:shadow-gray-800">
                                    <span class="hover:text-[#eb6b11] text-lg duration-500 font-medium">{x.title}</span>
                                    <h6 class="text-slate-400">{x.description}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default GallerieComponent;