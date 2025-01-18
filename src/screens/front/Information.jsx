import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import InfoComponent from "../../components/Info";
import {  information } from "../../Data/data";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";

const Information = () => {
      const [infos, setInfos] = useState([]);
      const [loading, setLoading] = useState(true)
      
          const _init_ = () => {
    
              getResource("/announcements").then((res) => {
                console.log(res.data);
                setInfos(res.data);
            }).catch(e => {
                errorMessage(e)
              })
        }
    
        useEffect(() => {
            _init_()
            setTimeout(() => setLoading(false), 1500)
        }, [])
    
    return ( 
        <AppBody banner={true} titleBanner="Actualités">
          <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:px-8 py-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-base md:text-xl text-gray-600">
                Soyez toujours informé(e) de nos actualités.
                </p>
            </div>

            {/* Courses Section */}
            {/* <div
                className={`max-w-7xl mx-auto w-full mb-8 md:mb-12 px-4 sm:px-6 lg:px-8 ${
                loading && "animate-pulse"
                }`}
            > */}
                <InfoComponent informations={infos} />
            {/* </div> */}
            </section>


        </AppBody>
     );
}
 
export default Information;