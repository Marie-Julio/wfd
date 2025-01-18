import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import InfoComponent from "../../components/Info";
// import {  InfoSingle } from "../../Data/data";
import { getResource } from "../../services/api";
import { errorMessage } from "../../services/Helper";
import { Calendar, ChevronRight, Clock, Facebook, Linkedin, Menu, MessageCircle, ThumbsUp, Twitter, User } from "lucide-react";
import { useParams } from "react-router";

const InfoSingle = () => {
      const [info, setInfo] = useState({});
      const [infos, setInfos] = useState([]);
      const [loading, setLoading] = useState(true)
      const {id} = useParams()
      
          const _init_ = () => {
    
              getResource(`/announcements/${id}`).then((res) => {
                console.log(res.data);
                setInfo(res.data);
            }).catch(e => {
                errorMessage(e)
              })

              getResource(`/announcements`).then((res) => {
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

        const formatDate = (date) => {
            return new Intl.DateTimeFormat('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(new Date(date));
          };
    
    return ( 
        <AppBody banner={true} titleBanner="Informez-vous sur nos actualites">
          <section className="items-center justify-center min-h-screen w-full md:m-5">

                {/* Header Mobile Menu */}
                <div className="lg:hidden bg-white border-b p-4">
                    <button className="flex items-center gap-2 text-gray-600">
                    <Menu className="w-6 h-6" />
                    <span>Menu</span>
                    </button>
                </div>

                {/* Fil d'Ariane */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center text-sm text-gray-600">
                        <a href="#" className="hover:text-blue-600">Accueil</a>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <a href="#" className="hover:text-blue-600">Actualités</a>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-400 hidden sm:inline">{info.title}</span>
                    </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-4 lg:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Contenu Principal */}
                    <div className="lg:col-span-2">
                        <article className="bg-white rounded-lg shadow-sm">
                        {/* Image principale */}
                        <img 
                            src="https://www.afm-telethon.fr/sites/default/files/styles/webp/public/media/builder/webp/width750image_scale/9586_Retrospective%20L560%20x%20H375_1.png.webp" 
                            alt="Formation en gestion de projet"
                            className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-t-lg"
                        />

                        {/* Contenu de l'article */}
                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Métadonnées */}
                            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-500 mb-4 lg:mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate('2024-01-10')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Par Admin WFD</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min de lecture</span>
                            </div>
                            </div>

                            {/* Titre */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">
                            {info.title}
                            </h1>

                            {/* Contenu */}
                            <div className="prose max-w-none">
                            {info.content}
                            </div>

                            {/* Partage et Engagement */}
                            <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t">
                            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                                <div className="flex flex-wrap items-center gap-4">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                    <ThumbsUp className="w-5 h-5" />
                                    <span>123 J'aime</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>12 Commentaires</span>
                                </button>
                                </div>
                                <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">Partager :</span>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                                    <Facebook className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600">
                                    <Twitter   className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800">
                                    <Linkedin className="w-4 h-4" />
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Articles Récents */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Articles Récents</h2>
                        <div className="space-y-4">
                            {infos.slice(0, 6).map((i) => (
                            <a key={i} href="#" className="flex gap-4 group">
                                <img 
                                src="https://new.societechimiquedefrance.fr/wp-content/uploads/2024/11/AC11-12-2024_couv.jpg" 
                                alt="Article miniature"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                                />
                                <div>
                                <h3 className="font-medium group-hover:text-blue-600 line-clamp-2">
                                    {i.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {formatDate(i.created_at)}
                                </p>
                                </div>
                            </a>
                            ))}
                        </div>
                        </div>

                        {/* Catégories */}
                        {/* <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Catégories</h2>
                        <ul className="space-y-2">
                            {['Formation', 'Événements', 'Actualités', 'Conseils', 'Success Stories'].map((cat) => (
                            <li key={cat}>
                                <a href="#" className="flex justify-between items-center text-gray-600 hover:text-blue-600 py-1">
                                <span>{cat}</span>
                                <span className="text-sm text-gray-400">(12)</span>
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div> */}
                    </div>
                    </div>
                </div>
            </section>


        </AppBody>
     );
}
 
export default InfoSingle;