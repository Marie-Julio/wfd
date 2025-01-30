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

    const apiUrl = import.meta.env.VITE_API_URI_BASE;

    return (
        <div class="relative md:py-6 py-5">
            <div class="container relative">

                <div id="grid" class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2 mx-auto mt-4">
                {galleries.map((x) => (
                    <div class="picture-item" key={x.id} data-groups={`["${x.promotion_id}"]`}>
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