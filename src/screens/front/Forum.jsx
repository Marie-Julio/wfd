import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Send, User } from 'lucide-react';
import { getResource, postResource } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import { errorMessage } from '../../services/Helper';
import AppBody from '../../components/AppBody';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import img from "../../assets/images/profil.png";

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newForum, setNewForum] = useState({ title: '', description: '' });
  const [newDiscussion, setNewDiscussion] = useState({ content: '' });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate()

  const [currentPageForum, setCurrentPageForum] = useState(1); // Page actuelle
  const forumPerPage = 5; // Nombre de cours par page

  const [currentPageDiscussion, setCurrentPageDiscussion] = useState(1); // Page actuelle
  const discussionPerPage = 9; // Nombre de cours par page

  const [currentPageComment, setCurrentPageComment] = useState(1); // Page actuelle
  const commentPerPage = 9; // Nombre de cours par page

  // Exemple de récupération des données
  useEffect(() => {
    
    // Remplacez par vos appels API
    const fetchForums = async () => {
      const response = await getResource('/forums');
      const data = await response.data;
      setForums(data);
    };
    fetchForums();
    getDiscussion();
  }, []);

  const getDiscussion = (id) => {
    getResource(`/discussions?forum_id=${id}`).then((res) => {
        setDiscussions(res.data)
    }).catch((e) => {
        errorMessage(e)
    })
  } 


  // Créer un forum
  const createForum = async () => {
    const response = await postResource('/forums', newForum);
    if (response.ok) {
      const forum = await response.data;
      setForums([...forums, forum]);
      setNewForum({ title: '', description: '' });
    }
  };

   // Lorsqu'un forum est sélectionné
   const handleSelectForum = (forum) => {
    navigate(`/discussions/${forum.id}`)
    // setSelectedForum(forum);
    getDiscussion(forum.id); // Charger les discussions de ce forum
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Janv', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Pagination logic pour Forum 
  const indexOfLastCourse = currentPageForum * forumPerPage;
  const indexOfFirstCourse = indexOfLastCourse - forumPerPage;
  const currentForum = forums.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(forums.length / forumPerPage);

  const paginate = (pageNumber) => setCurrentPageForum(pageNumber);


    // Fonction pour générer les numéros de pages visibles
    const getVisiblePages = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i <= 5) {
          pages.push(i);
        }
      }
      return pages;
    };
  
    const visiblePages = getVisiblePages();
  
    useEffect(() => {
      feather.replace();
    }, []);
  

  return (
    <AppBody>
    <div className=" bg-white">
      <div class="bg-[#1a5fa9] md:pt-16 pt-10 text-white grid grid-cols-1 text-center">
          <h3 class="font-bold uppercase leading-normal text-3xl mb-5">Forum</h3>

          <div class="subcribe-form mt-6 pb-10">
              <form class="relative max-w-xl mx-auto">
                  <input type="text" id="SearchForumKeyword" name="text" class="pt-4 pe-14 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" placeholder="Rechercher ..." />
                  <button type="submit" class="inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] size-[46px] bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-full"><i class="uil uil-search"></i></button>
              </form>
          </div>
      </div>
      <div class="container relative md:mt-16 mt-10 pb-10">
      {!selectedForum && (
      <div className="w-full gap-6">
        <div className="relative">
            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 rounded-md border border-gray-200 dark:border-slate-800">
              <table class="w-full text-start">
                  <thead class=" bg-orange-600 text-white text-lg border-b border-gray-200 dark:border-slate-800">
                      <tr>
                          <th class="py-6 px-4 font-semibold min-w-[300px] text-start">Forum</th>
                          <th class="text-center py-6 px-4 font-semibold min-w-[40px]">Sujets</th>
                          <th class="py-6 px-4 font-semibold min-w-[220px] text-start">Créer par</th>
                      </tr>
                  </thead>
                  <tbody>
                  {currentForum.map((forum) => (
                      <tr key={forum.id} class="border-b border-gray-200 dark:border-slate-800">
                          <th class="p-4">
                              <div class="flex text-start">
                                  <i class="uil uil-comment text-indigo-600 text-2xl"></i>

                                  <div class="ms-2">
                                      <button onClick={() => handleSelectForum(forum)} class="bg-transparent hover:text-indigo-600 text-lg">{forum.title}</button>
                                      <p class="text-slate-400 font-normal">{forum.description}</p>
                                  </div>
                              </div>
                          </th>
                          <td class="text-center p-4">{forum.discussions_count}</td>
                          <td class="p-4">
                              <div class="flex">
                                  <img src={forum.user_file_path || img} class="h-10 rounded-full shadow dark:shadow-slate-800" alt="" />

                                  <div class="ms-2">
                                      <a href="#" class=" hover:text-indigo-600 font-semibold text-normal whitespace-nowrap">{forum.user_prenom.split(' ')[0]} {forum.user_nom.split(' ')[0]}</a>
                                      <p class="text-slate-400 text-sm font-normal whitespace-nowrap"><i class="uil uil-clock"></i> {formatDate(forum.created_at)}</p>
                                  </div>
                              </div>
                          </td>
                      </tr>
                    ))}

                  </tbody>
              </table>
          </div>
          
      <div className=" w-full flex justify-center bg-white py-4">
        <nav className="inline-flex">
          <button
            onClick={() => paginate(currentPageForum - 1)}
            disabled={currentPageForum === 1}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPageForum === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
            }`}
          >
            Précédent
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPageForum === number
                  ? "bg-orange-600 text-white"
                  : "bg-white"
              }`}
            >
              {number}
            </button>
          ))}

        {totalPages > 3 && (
                <span className="px-2 text-gray-600">...</span>
              )}
          <button
            onClick={() => paginate(currentPageForum + 1)}
            disabled={currentPageForum === totalPages}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPageForum === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-white"
            }`}
          >
            Suivant
          </button>
        </nav>
      </div>
    </div>
      
        </div>
      )}
      </div>
    </div>
    </AppBody>
  );
};

export default Forum;
