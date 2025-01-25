import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Send, User } from 'lucide-react';
import { getResource, postResource } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import { errorMessage } from '../../services/Helper';
import AppBody from '../../components/AppBody';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

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


  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  if (!accessToken) {
    navigate("/login");
  }

  const [currentPageForum, setCurrentPageForum] = useState(1); // Page actuelle
  const forumPerPage = 3; // Nombre de cours par page

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

  

  // Créer une discussion
  const createDiscussion = async () => {
    const discussionData = { ...newDiscussion, forum_id: selectedForum.id, user_id: 3, title: "Super" }; // user_id est un exemple
    const response = await postResource('/discussions', discussionData );
    if (response.data) {
      setSelectedForum({ ...selectedForum, discussions: [...(selectedForum.discussions || []), discussionData] });
      setNewDiscussion({ title: '', content: '' });
      getDiscussion(selectedForum.id)
    }
  };

  // Ajouter un commentaire
  const addComment = async () => {
    const commentData = { content: newComment, discussion_id: selectedDiscussion.id, user_id: 3 }; // user_id est un exemple
    const response = await postResource('/comments', commentData);
    if (response.status == 201) {
      const comment = await response.data;
      setComments([...comments, comment]);
      setNewComment('');
    }
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
        if (i <= 3) {
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
      <div class="container relative md:mt-16 mt-10">
      {!selectedForum && (
      <div className="w-full gap-6">
        <div className="relative">
            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 rounded-md border border-gray-100 dark:border-slate-800">
              <table class="w-full text-start">
                  <thead class="text-lg border-b border-gray-100 dark:border-slate-800">
                      <tr>
                          <th class="py-6 px-4 font-semibold min-w-[300px] text-start">Forum</th>
                          <th class="text-center py-6 px-4 font-semibold min-w-[40px]">Sujets</th>
                          <th class="text-center py-6 px-4 font-semibold min-w-[40px]">Commentaires</th>
                          <th class="py-6 px-4 font-semibold min-w-[220px] text-end">Créer par</th>
                      </tr>
                  </thead>
                  <tbody>
                  {currentForum.map((forum) => (
                      <tr key={forum.id} class="border-b border-gray-100 dark:border-slate-800">
                          <th class="p-4">
                              <div class="flex text-start">
                                  <i class="uil uil-comment text-indigo-600 text-2xl"></i>

                                  <div class="ms-2">
                                      <a href="forums-topic.html" class="hover:text-indigo-600 text-lg">{forum.title}</a>
                                      <p class="text-slate-400 font-normal">{forum.description}</p>
                                  </div>
                              </div>
                          </th>
                          <td class="text-center p-4">5</td>
                          <td class="text-center p-4">10</td>
                          <td class="p-4">
                              <div class="flex justify-end">
                                  <img src="assets/images/client/01.jpg" class="h-10 rounded-full shadow dark:shadow-slate-800" alt="" />

                                  <div class="ms-2">
                                      <a href="#" class="hover:text-indigo-600 font-semibold">Calvin Carlo</a>
                                      <p class="text-slate-400 text-sm font-normal"><i class="uil uil-clock"></i> May 2022</p>
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
                  ? "bg-[#1a5fa9] text-white"
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
          {/* Trait vertical */}
      <div className="w-[2px] bg-gray-300 mx-4"></div>

        {/* Section Créer un forum */}
        <div className="flex-1 pt-10">
            <h2 className="text-xl font-bold mb-4">Créer un forum</h2>
            <input
              type="text"
              placeholder="Titre du forum"
              value={newForum.title}
              onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded bg-gray-200"
            />
            <textarea
              placeholder="Description du forum"
              value={newForum.description}
              onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded bg-gray-200"
            />
            <Button onClick={createForum}>Créer</Button>
            </div>
        </div>
      )}

      {/* Discussions */}
      {selectedForum && !selectedDiscussion && (
        <div>
          <Button onClick={() => setSelectedForum(null)}>← Retour</Button>
          <h1 className="text-3xl font-bold my-6">{selectedForum.title}</h1>
          <div>
            {discussions.map((discussion) => (
              <Card
                key={discussion.id}
                className="cursor-pointer transform transition-all hover:scale-105"
                onClick={() => setSelectedDiscussion(discussion)}
              >
                <CardContent>
                  <h3 className="text-lg font-semibold">{discussion.title}</h3>
                  <p>{discussion.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Nouvelle discussion</h2>
            {/* <input
              type="text"
              placeholder="Titre de la discussion"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            /> */}
            <textarea
              placeholder="Contenu"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <Button onClick={createDiscussion}>Créer</Button>
          </div>
        </div>
      )}<br /><br />

      {/* Commentaires */}
      {selectedDiscussion && (
        <div>
          <Button onClick={() => setSelectedDiscussion(null)}>← Retour</Button>
          <h1 className="text-3xl font-bold my-6">{selectedDiscussion.title}</h1>
          <p>{selectedDiscussion.content}</p>
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="border-x-gray-500 rounded-md items-center  justify-center p-2 text-gray-800 bg-blue-200  mt-4">
                {/* <CardContent> */}
                  <p>{comment.content}</p>
                {/* </CardContent> */}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Ajouter un commentaire</h2>
            <textarea
              placeholder="Votre commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <Button onClick={addComment}>Envoyer</Button>
          </div>
        </div>
      )}
      </div>
    </div>
    </AppBody>
  );
};

export default Forum;
