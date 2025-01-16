import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Send, User } from 'lucide-react';
import { getResource, postResource } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import { errorMessage } from '../../services/Helper';
import AppBody from '../../components/AppBody';
import { useNavigate, useParams } from 'react-router';
import Icon from '../../components/Icon';

const Discussion = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newForum, setNewForum] = useState({ title: '', description: '' });
  const [newDiscussion, setNewDiscussion] = useState({ content: '' });
  const {id} = useParams()
  const navigate = useNavigate()
  const [forum, setForum] = useState({})


  const [currentPageDiscussion, setCurrentPageDiscussion] = useState(1); // Page actuelle
  const discussionPerPage = 9; // Nombre de cours par page



  // Exemple de récupération des données
  useEffect(() => {
    
    // Remplacez par vos appels API
    const fetchForums = async () => {
      const response = await getResource(`/forums/${id}`);
      const data = await response.data;
      setForum(data);
    };
    fetchForums();
    getResource(`/discussions?forum_id=${id}`).then((res) => {
        console.log(res.data)
        setDiscussions(res.data)
    }).catch((e) => {
        errorMessage(e)
    })
  }, []);

  const getDiscussion = () => {
    getResource(`/discussions?forum_id=${id}`).then((res) => {
        console.log(res.data)
        setDiscussions(res.data)
    }).catch((e) => {
        errorMessage(e)
    })
  } 


  // Créer un forum
//   const createForum = async () => {
//     const response = await postResource('/forums', newForum);
//     if (response.ok) {
//       const forum = await response.data;
//       setForum([...forums, forum]);
//       setNewForum({ title: '', description: '' });
//     }
//   };

   // Lorsqu'un forum est sélectionné
   const handleSelectForum = (forum) => {
    setSelectedForum(forum);
    getDiscussion(forum.id); // Charger les discussions de ce forum
  };

  

  // Créer une discussion
  const createDiscussion = async () => {
    const discussionData = { ...newDiscussion, forum_id: id, user_id: 3, title: "Super" }; // user_id est un exemple
    const response = await postResource('/discussions', discussionData );
    if (response.data) {
    //   setSelectedForum({ ...selectedForum, discussions: [...(selectedForum.discussions || []), discussionData] });
    //   setNewDiscussion({ title: '', content: '' });
      getDiscussion(id)
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

  const redirectComment = (id) =>{
    navigate(`/comments/${id}`)
  }

   // Pagination logic pour Forum 
   const indexOfLastCourse = currentPageDiscussion * discussionPerPage;
   const indexOfFirstCourse = indexOfLastCourse - discussionPerPage;
   const currentDiscussion = discussions.slice(indexOfFirstCourse, indexOfLastCourse);
 
   const totalPages = Math.ceil(discussions.length / discussionPerPage);
 
   const paginate = (pageNumber) => setCurrentPageForum(pageNumber);

    // Fonction pour copier le lien dans le presse-papiers
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papiers !');
    } catch (err) {
      alert('Échec de la copie du lien. Veuillez essayer manuellement.');
    }
  };

  // Fonction pour partager via l'API de partage si disponible
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
    } else {
      // Si l'API de partage n'est pas disponible, utilisez le presse-papiers
      copyToClipboard();
    }
  };



  return (
    <AppBody className="bg-gray-200 ">
    <section className="max-w-7xl mx-auto p-4 bg-gray-200">
      {/* Liste des forums */}
      

      {/* Discussions */}
      {/* {selectedForum && !selectedDiscussion && ( */}
        <div>
          <Button onClick={() => navigate(-1)}>← Retour</Button>
          <h1 className="text-3xl font-bold my-6">{forum.title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
  {currentDiscussion.map((discussion) => (
    <Card
      key={discussion.id}
      className="cursor-pointer transform transition-all hover:scale-105 shadow-lg rounded-lg bg-white"
    >
      <CardContent>
        <h3 className="text-lg font-semibold text-gray-800 m-4">{discussion.title}</h3>
        <p className="m-3 text-gray-600">{discussion.content}</p>
        <div className="flex justify-between items-center mt-5">
          {/* Actions principales */}
          <div className="flex space-x-4">
            {/* Commenter */}
            <button
              className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
              onClick={() => redirectComment(discussion.id)}
            >
              <Icon name="bx-message-rounded-dots" className="w-5 h-5" />
              <span>Commenter</span>
            </button>
            {/* Partager */}
            <button
              className="flex items-center space-x-1 text-green-500 hover:text-green-700"
              onClick={() => shareLink(discussion)}
            >
              <Icon name="bx-share-alt" className="w-5 h-5" />
              <span>Partager</span>
            </button>
          </div>
          {/* Informations supplémentaires */}
          <div className="text-sm text-gray-500">
            Publié par <span className="font-semibold">{discussion.user?.nom || 'Anonyme'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                    <nav className="inline-flex space-x-1">
                        <button
                        onClick={() => paginate(currentPageDiscussion - 1)}
                        disabled={currentPageDiscussion === 1}
                        className={`px-4 py-2 mx-1 border rounded ${
                            currentPageDiscussion === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                        }`}
                        >
                        Précédent
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 mx-1 border rounded ${
                            currentPageDiscussion === number
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-gray-100"
                            }`}
                        >
                            {number}
                        </button>
                        ))}
                        <button
                        onClick={() => paginate(currentPageDiscussion + 1)}
                        disabled={currentPageDiscussion === totalPages}
                        className={`px-4 py-2 mx-1 border rounded ${
                            currentPageDiscussion === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                        }`}
                        >
                        Suivant
                        </button>
                    </nav>
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
      {/* )} */}
    </section>
    </AppBody>
  );
};

export default Discussion;
