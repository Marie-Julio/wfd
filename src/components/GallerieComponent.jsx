const GallerieComponent = ({galleries = []}) => {
    const apiUrl = import.meta.env.VITE_API_URI_BASE;
    return ( 
        <>
        {/* <div class="grid grid-cols-2 gap-3"> */}
           {galleries.map((x) => ( <div class="w-80 bg-white p-3 shadow-xl">
            <img class="h-52 w-full object-cover" src={`${apiUrl}/storage/${x.image}`} />
            <ul class="mt-3 ">
                <li class="mr-auto">
                <h1 class="flex font-bold text-black text-xl hover:text-gray-600">
                   {x.title}
                </h1>
                </li>
                <li class="mr-2">
                <p class="flex text-gray-400 text-md hover:text-gray-600">
                    {x.description}
                </p>
                </li>
                {/* <li class="mr-2">
                <a href="#" class="flex text-gray-400 hover:text-gray-600">
                    <svg class="mr-0.5" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                    </svg>
                    3
                </a>
                </li> */}
                {/* <li>
                <a href="#" class="flex text-gray-400 hover:text-gray-600">
                    <svg class="mr-0.5" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                    3
                </a>
                </li> */}
            </ul>
            </div>))}

        {/* </div> */}
        </>
     );
}
 
export default GallerieComponent;