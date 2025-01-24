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
    return ( <AppBody>
      <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Promotions</h1>
      </div>
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 mb-10">
              Découvrez nos encadreurs qualifiés et dévoués à votre succès.
            </p>
            <div className="max-w-7xl mx-auto mb-12 md:m-10">
                <Cour courses={infos}/>
            </div>
        </div>
      </div>
    </AppBody>
     );
}
 
export default Promotion;