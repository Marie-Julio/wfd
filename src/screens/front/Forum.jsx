import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Send, User } from 'lucide-react';
import { getResource, postResource } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import { errorMessage } from '../../services/Helper';
import AppBody from '../../components/AppBody';

const Forum = () => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newForum, setNewForum] = useState({ title: '', description: '' });
  const [newDiscussion, setNewDiscussion] = useState({ content: '' });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);


  const [currentPageForum, setCurrentPageForum] = useState(1); // Page actuelle
  const forumPerPage = 6; // Nombre de cours par page

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
    setSelectedForum(forum);
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


  return (
    <AppBody>
    <div className="max-w-7xl mx-auto p-4">
      {/* Liste des forums */}
      {!selectedForum && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Forums</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentForum.map((forum) => (
              <Card
                key={forum.id}
                className="cursor-pointer transform transition-all hover:scale-105"
                onClick={() => handleSelectForum(forum)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {forum.title}
                    <ChevronRight />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{forum.description}</p>
                </CardContent>
              </Card>
            ))}
            
                {/* Pagination */}
                <div className="flex justify-center mt-8 w-full px-4">
                <nav className="inline-flex">
                    <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPageForum === 1}
                    className={`px-4 py-2 mx-1 border rounded ${
                        currentPageForum === 1 ? "bg-gray-200 text-gray-500" : "bg-white"
                    }`}
                    >
                    Précédent
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 mx-1 border rounded ${
                            currentPageForum === number
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                    >
                        {number}
                    </button>
                    ))}
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
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Créer un forum</h2>
            <input
              type="text"
              placeholder="Titre du forum"
              value={newForum.title}
              onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Description du forum"
              value={newForum.description}
              onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
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
      )}

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
    </AppBody>
  );
};

export default Forum;
