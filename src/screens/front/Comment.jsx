import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Send, User, Eye, ThumbsUp } from 'lucide-react';
import { getResource, postResource } from '../../services/api';
import { Button } from '../../components/Button';
import { errorMessage } from '../../services/Helper';
import AppBody from '../../components/AppBody';
import { useNavigate, useParams } from 'react-router';

const Comment = () => {
  const [newDiscussion, setNewDiscussion] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentPageComment, setCurrentPageComment] = useState(1);
  const commentPerPage = 2; // Nombre de commentaires par page

  const fetchForums = async () => {
    const response = await getResource(`/comments?discussion_id=${id}`);
    const data = await response.data;
    setComments(data);
  };

  useEffect(() => {
    fetchForums();
    getDiscussion();
  }, []);

  const getDiscussion = () => {
    getResource(`/discussions/${id}`)
      .then((res) => setNewDiscussion(res.data))
      .catch((e) => errorMessage(e));
  };

  const addComment = async () => {
    const commentData = { content: newComment, discussion_id: id, user_id: 3 }; // user_id est un exemple
    const response = await postResource('/comments', commentData);
    if (response.status === 201) {
      setNewComment('');
      fetchForums();
    }
  };

  // Pagination logic
  const indexOfLastComment = currentPageComment * commentPerPage;
  const indexOfFirstComment = indexOfLastComment - commentPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentPerPage);

  const goToPage = (pageNumber) => setCurrentPageComment(pageNumber);

  const goToNextPage = () => {
    if (currentPageComment < totalPages) setCurrentPageComment(currentPageComment + 1);
  };

  const goToPreviousPage = () => {
    if (currentPageComment > 1) setCurrentPageComment(currentPageComment - 1);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const maxButtonsToShow = 3;

    if (totalPages <= maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <Button
            key={i}
            onClick={() => goToPage(i)}
            className={`mx-1 ${currentPageComment === i ? 'bg-blue-500 text-white' : ''}`}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPageComment > 1) {
        paginationButtons.push(
          <Button key="prev" onClick={goToPreviousPage}>
            Précédent
          </Button>
        );
      }

      // First page
      paginationButtons.push(
        <Button
          key={1}
          onClick={() => goToPage(1)}
          className={`mx-1 ${currentPageComment === 1 ? 'bg-blue-500 text-white' : ''}`}
        >
          1
        </Button>
      );

      if (currentPageComment > 3) {
        paginationButtons.push(<span key="dots-start">...</span>);
      }

      // Middle pages
      const start = Math.max(2, currentPageComment - 1);
      const end = Math.min(totalPages - 1, currentPageComment + 1);

      for (let i = start; i <= end; i++) {
        paginationButtons.push(
          <Button
            key={i}
            onClick={() => goToPage(i)}
            className={`mx-1 ${currentPageComment === i ? 'bg-blue-500 text-white' : ''}`}
          >
            {i}
          </Button>
        );
      }

      if (currentPageComment < totalPages - 2) {
        paginationButtons.push(<span key="dots-end">...</span>);
      }

      // Last page
      paginationButtons.push(
        <Button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`mx-1 ${currentPageComment === totalPages ? 'bg-blue-500 text-white' : ''}`}
        >
          {totalPages}
        </Button>
      );

      if (currentPageComment < totalPages) {
        paginationButtons.push(
          <Button key="next" onClick={goToNextPage}>
            Suivant
          </Button>
        );
      }
    }

    return paginationButtons;
  };

  return (
    <AppBody className="bg-gray-200">
      <section className="max-w-7xl mx-auto p-4 bg-gray-200">
        <Button onClick={() => navigate(-1)}>← Retour</Button>
        <h1 className="text-3xl font-bold my-6">{newDiscussion.title}</h1>
        <p>{newDiscussion.content}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
          {currentComments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-md p-4 mb-4 bg-blue-100 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-bold">{`${comment.user.prenom} ${comment.user.nom}`}</span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{comment.views} vues</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2">
          {renderPagination()}
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
      </section>
    </AppBody>
  );
};

export default Comment;
