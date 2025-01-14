import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import Cour from "../../components/Cour";
import Info from "../../components/Info";
import {  courses, information } from "../../Data/data";
import { getResource } from "../../services/api";
import Modal from "../../components/admin/common/Modal";

const Promotion = () => {
    const [infos, setInfos] = useState([]);
          const [loading, setLoading] = useState(true)
          
              const _init_ = () => {
        
                  getResource("/promotions").then((res) => {
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
        <AppBody titleBanner="Informez-vous sur nos actualites">
          <section className="items-center justify-center min-h-screen w-full md:m-5">

                 {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 my-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Actualités
                </h1>
                <p className="text-xl text-gray-600">
                    Soyez toujours informer de nos actualites.
                </p>
            </div>

            {/* Courses Section */}
            <div className="max-w-7xl mx-auto mb-12 md:m-10">
                {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6 items-start ">
                Informations
                </h2> */}
                <Cour courses={infos}/>
            </div>

            </section>

            

        </AppBody>
     );
}
 
export default Promotion;