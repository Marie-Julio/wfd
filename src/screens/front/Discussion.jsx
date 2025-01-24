import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getResource, postResource } from '../../services/api';
import { errorMessage } from '../../services/Helper';
import { Card, CardContent } from '../../components/CardComponents';
import { Button } from '../../components/Button';
import AppBody from '../../components/AppBody';
import img from "../../assets/images/user.png";
import Icon from '../../components/Icon';

const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ content: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});
  const [currentPageDiscussion, setCurrentPageDiscussion] = useState(1);
  const discussionPerPage = 6;

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
  }, [id]);

  const createDiscussion = async () => {
    const discussionData = { ...newDiscussion, forum_id: id, user_id: 3, title: 'Super' };
    const response = await postResource('/discussions', discussionData);
    if (response.data) {
      setDiscussions([response.data, ...discussions]);
      setNewDiscussion({ content: '' });
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
    <AppBody className="bg-gray-200">
      <section className="max-w-7xl mx-auto p-4 bg-gray-200">
        <Button onClick={() => navigate(-1)}>← Retour</Button>
        <h1 className="text-3xl font-bold my-6">{forum.title}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des discussions */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6">
              {currentDiscussion.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="cursor-pointer transform transition-all hover:scale-105 shadow-lg rounded-lg bg-white"
                >
                  <CardContent className="flex items-start space-x-4 mt-10">
                    <img
                      src={discussion.user?.profile_picture || img}
                      alt="Utilisateur"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{discussion.title}</h3>
                      <p className="text-gray-600">{discussion.content}</p>
                      <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={() => redirectComment(discussion.id)}
                          className="flex items-center space-x-1 text-[#1a5fa9] hover:text-blue-700"
                        >
                            <Icon name="bx-message-rounded-dots" className="w-5 h-5 mr-2" />
                          Commenter
                        </button>
                        <button
                            className="flex items-center space-x-1 text-green-500 hover:text-green-700"
                            onClick={() => shareLink(discussion)}
                            >
                        <Icon name="bx-share-alt" className="w-5 h-5 mr-2" />
                        <span>Partager</span>
                        </button>
                        <div className="text-sm text-gray-500">
                          Publié par <span className="font-semibold">{discussion.user?.name || 'Anonyme'}</span>
                        </div>
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
          </div>

          {/* Ligne verticale */}
          <div className="w-px bg-gray-300 hidden lg:block"></div>

          {/* Section pour créer une discussion */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Nouvelle discussion</h2>
            <textarea
              placeholder="Contenu"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <Button onClick={createDiscussion}>Créer</Button>
          </div>
        </div>
      </section>
    </AppBody>
  );
};

export default Discussion;
