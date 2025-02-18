import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getResource, patchResource, postResource, removeResource } from '../../services/api';
import { Button } from '../../components/Button';
import AppBody from '../../components/AppBody';
import img from "../../assets/images/profil.png";
import { errorMessage, onServerError, onServerSuccess, onServerWarning } from "../../services/Helper";
import {jwtDecode} from "jwt-decode";
import DOMPurify from 'dompurify';
import Icon from '../../components/Icon';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import '../../assets/css/style.css';
import Modal from '../../components/admin/common/Modal';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Formatage de la date en français avec l'heure en format 24h
  const formattedDate = format(date, 'd MMMM yyyy \'à\' HH:mm', { locale: fr });

  return formattedDate;
};

const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ content: '', title: '' });
  const [updateDiscussion, setUpdateDiscussion] = useState({ content: '', title: '' });
  const [dataDiscussion, setDataDiscussion] = useState({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});
  const [currentPageDiscussion, setCurrentPageDiscussion] = useState(1);
  const discussionPerPage = 6;
  const apiUrl = import.meta.env.VITE_API_URI_BASE;
  const [delModal, setDelModal] = useState(false);

  const [editorInstance, setEditorInstance] = useState(null); // Store the editor instance


  const fetchForumAndDiscussions = async () => {
    try {
      const forumResponse = await getResource(`/forums/${id}`);
      setForum(forumResponse.data);
      const discussionsResponse = await getResource(`/discussions?forum_id=${id}`);
      setDiscussions(discussionsResponse.data);
    } catch (e) {
      errorMessage(e);
    }
  };

  const handleDelete = async (id) => {
      // setLoading(true);
      
      const arrayId = [id]
      try {
        await removeResource("/discussions" , arrayId); // Appelle une fonction passée en prop pour supprimer
        // setLoading(false);
        onServerSuccess("Suppression effectuee!")
        fetchForumAndDiscussions()
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        // setLoading(false);
      }
    };

  // Initialize CKEditor after loading
  useEffect(() => {
    if (editorLoaded) {
      ClassicEditor
        .create(document.querySelector('#editor'))
        .then(editor => {
          setEditorInstance(editor);
          editor.model.document.on('change:data', () => {
            const data = editor.getData();
            setNewDiscussion(prevData => ({
              ...prevData,
              content: data
            }));
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [editorLoaded]);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js";
    script.async = true;
    script.onload = () => setEditorLoaded(true); // Quand le script est chargé, on met à jour l'état.
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Nettoyage lorsque le composant est démonté.
    };
  }, []);
  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  
  useEffect(() => {
    const fetchForumAndDiscussions = async () => {
      try {
        const forumResponse = await getResource(`/forums/${id}`);
        setForum(forumResponse.data);
        const discussionsResponse = await getResource(`/discussions?forum_id=${id}`);
        setDiscussions(discussionsResponse.data);
      } catch (e) {
        errorMessage(e);
      }
    };
    fetchForumAndDiscussions();
    if (!accessToken) {
      navigate("/login");
    }
  }, [id, accessToken]);

  const createDiscussion = async () => {
    const discussionData = { content: newDiscussion.content , forum_id: id, user_id: decodedToken.id, title: newDiscussion.title };
    
    try {
    const response = await postResource('/discussions', discussionData);
    if (response.data) {
      const discussionsResponse = await getResource(`/discussions?forum_id=${id}`);
      setDiscussions(discussionsResponse.data);
      setNewDiscussion({ content: '', title: ''});
      onServerSuccess("Posté avec succès !");
      fetchForumAndDiscussions()
    } else{
      onServerWarning("Veuillez remplir tous les champs !");
    }} catch (err) {
      onServerWarning("Veuillez remplir tous les champs !");
    }
  };


  const updateFunctionDiscussion = async (idDiscussion) => {
    console.log(idDiscussion)
    const discussionData = { content: updateDiscussion.content , forum_id: id, user_id: decodedToken.id, title: updateDiscussion.title };
    
    try {
    const response = await patchResource('/discussions', idDiscussion, discussionData);
    
      const discussionsResponse = await getResource(`/discussions?forum_id=${id}`);
      setDiscussions(discussionsResponse.data);
      setUpdateDiscussion({ content: '', title: ''});
      setDataDiscussion({})
      setDelModal(false)
      onServerSuccess("Mise a jour avec succès !");
    } catch (err) {
      onServerWarning(err);
    }
  };

  const shareLink = async (discussion) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: discussion.title,
          url: `http://localhost:5174/discussions/${discussion.id}`,
        });
      } catch (err) {
        console.error('Le partage a échoué:', err);
      }
    }
  };

  const redirectComment = (id) => navigate(`/comments/${id}`);

  const currentDiscussion = discussions.slice(
    (currentPageDiscussion - 1) * discussionPerPage,
    currentPageDiscussion * discussionPerPage
  );

  const totalPages = Math.ceil(discussions.length / discussionPerPage);

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

  return (
    <AppBody>
    <div className=" bg-white">
      <div className="bg-[#1a5fa9] md:pt-16 pt-10 text-white grid grid-cols-1 text-center">
          <h3 className="font-bold uppercase leading-normal text-3xl mb-5">{forum.title}</h3>
          
          <div className="subcribe-form mt-6 pb-10 px-5">
              <form className="relative max-w-xl mx-auto">
                  <input type="text" id="SearchForumKeyword" name="text" className="pt-4 pe-14 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" placeholder="Rechercher ..." />
                  <button type="submit" className="inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] size-[46px] bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-full"><i className="uil uil-search"></i></button>
              </form>
          </div>
      </div>
      <div className="container relative md:mt-16 mt-10 pb-10">
        <div className="w-full gap-6">
          <div className="relative">
              <div className="relative block w-full bg-white dark:bg-slate-900 rounded-md ">
                    {currentDiscussion.map((discussion) => (
                      <div key={discussion.id}
                        className="shadow dark:shadow-gray-800 p-6 mt-5">
                        <div className="flex pb-6 border-b border-gray-100 dark:border-gray-800">
    
                          <div className="example-1 w-1/6 md:w-1/12  block justify-center items-start"> 
                                <div className="flex items-center text-center mx-auto">
                                  <img src={discussion.user.file_path ? `${apiUrl}/storage/${discussion.user.file_path}` : img} className="w-14 h-14 rounded-full shadow dark:shadow-gray-800" alt="utilisateur" />
                                </div>
                                <div className="date mt-5">
                                    <span className="day">{formatDate(discussion.created_at).split(' ')[0]}</span>
                                    <span className="month">{formatDate(discussion.created_at).split(' ')[1]}</span>
                                    <span className="year">{formatDate(discussion.created_at).split(' ')[2]}</span>
                                    <span className="mt-2 text-sm font-semibold year">{formatDate(discussion.created_at).split(' ')[4]}</span>
                                </div>
                          </div>
                          <div className="w-5/6 md:w-11/12  pl-4"> 
                              <a href="#" className="text-lg hover:text-indigo-600 duration-500 ease-in-out">{discussion.user.prenom} {discussion.user.nom}</a>
                              
                              <p className="text-slate-400 uppercase pb-2">{discussion.user.role}</p>
                              <p className="text-indigo-600 font-semibold">{discussion.title}</p>
                              <p className="text-slate-500"><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(discussion.content) }} /></p>
                              {/* Icônes Modifier et Supprimer */}
                              <div className="flex space-x-4 mt-15">
                                <button
                                  className="text-yellow-500 hover:text-yellow-700 flex items-center space-x-1"
                                  onClick={() => {setDataDiscussion({})
                                    setUpdateDiscussion({title: discussion.title, content: discussion.content})
                                    setDataDiscussion(discussion)
                                    setDelModal(true);}}
                                >
                                  <Icon name="bx-edit-alt" className="w-5 h-5 mr-1" />
                                  <span>Modifier</span>
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                  onClick={() => handleDelete(discussion.id)}
                                >
                                  <Icon name="bx-trash" className="w-5 h-5 mr-1" />
                                  <span>Supprimer</span>
                                </button>
                              </div>
                          </div>
                      </div>

                            <div className="mt-6">

                            <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={() => redirectComment(discussion.id)}
                          className=" bg-transparent flex items-center space-x-1 text-[#1a5fa9] hover:text-blue-700"
                        >
                            <Icon name="bx-message-rounded-dots" className="w-5 h-5 mr-2" />
                          Commenter
                        </button>
                        <button
                            className=" bg-transparent flex items-center space-x-1 text-green-500 hover:text-green-700"
                            onClick={() => shareLink(discussion)}
                            >
                        <Icon name="bx-share-alt" className="w-5 h-5 mr-2" />
                        <span>Partager</span>
                        </button>
                      </div>

                            </div>
                      </div>
                    ))}
                  
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex space-x-1">
                <button
                  onClick={() => setCurrentPageDiscussion((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPageDiscussion === 1}
                  className={`px-4 py-2 mx-1 border rounded ${
                    currentPageDiscussion === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Précédent
                </button>
                {visiblePages.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPageDiscussion(number)}
                    className={`px-4 py-2 mx-1 border rounded ${
                      currentPageDiscussion === number
                        ? 'bg-[#1a5fa9] text-white'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                {totalPages > 3 && (
                <span className="px-2 text-gray-600">...</span>
              )}
                <button
                  onClick={() =>
                    setCurrentPageDiscussion((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPageDiscussion === totalPages}
                  className={`px-4 py-2 mx-1 border rounded ${
                    currentPageDiscussion === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Suivant
                </button>
              </nav>
            </div>

          {/* Ligne verticale */}
          <div className="w-px bg-gray-300 hidden lg:block"></div>

          {/* Section pour créer une discussion */}
          <div className="flex-1">
          <br /><br />
            <h2 className="text-xl font-bold mb-4">Nouvelle discussion</h2>
            <div className=" px-10 py-5 bg-indigo-200">
              <label className=" font-semibold mb-5">Titre (facultatif)</label>
              <textarea
                placeholder="Titre (non obligatoire)"
                value={newDiscussion.title}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <label className=" font-semibold mb-5">Contenu <span className="text-red-500">*</span></label>
              <textarea required id="editor" name="content" className="w-full p-2 border border-gray-300 rounded" rows="3"></textarea>
              <button onClick={createDiscussion} className="block w-full bg-orange-500 mt-4 py-2 text-white font-semibold mb-2 
              hover:text-gray-200 hover:bg-orange-700 focus:outline-none transition-all">Poster</button>
            </div>
            </div>
          </div>
    </div>
    <Modal isOpen={delModal} onClose={() => setDelModal(false)}>
    <div className="flex-1">
          <br /><br />
            <h2 className="text-xl font-bold mb-4">Mise a jour discussion</h2>
            <div className=" px-10 py-5 bg-indigo-200">
              <label className=" font-semibold mb-5">Titre (facultatif)</label>
              <textarea
                placeholder="Titre (non obligatoire)"
                value={updateDiscussion.title}
                onChange={(e) => setUpdateDiscussion({ ...updateDiscussion, title: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <label className=" font-semibold mb-5">Contenu <span className="text-red-500">*</span></label>
              <textarea
              required
              id="editor"
              name="content"
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              value={updateDiscussion.content} // Utilisation de `value` pour afficher la valeur dans le textarea
              onChange={(e) => setUpdateDiscussion({content: e.target.value})} // Mise à jour de l'état lorsqu'on modifie le contenu
            />
              {/* <textarea required id="editor" name="content" className="w-full p-2 border border-gray-300 rounded" rows="3">{updateDiscussion.content}</textarea> */}
              <button onClick={() => updateFunctionDiscussion(dataDiscussion.id)} className="block w-full bg-orange-500 mt-4 py-2 text-white font-semibold mb-2 
              hover:text-gray-200 hover:bg-orange-700 focus:outline-none transition-all">Mettre a jour</button>
            </div>
            </div>
    </Modal>
    </AppBody>
  );
};

export default Discussion;
