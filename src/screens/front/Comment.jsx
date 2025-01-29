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
            className={`mx-1 ${currentPageComment === i ? 'bg-[#1a5fa9] text-white' : ''}`}
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
          className={`mx-1 ${currentPageComment === 1 ? 'bg-[#1a5fa9] text-white' : ''}`}
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
            className={`mx-1 ${currentPageComment === i ? 'bg-[#1a5fa9] text-white' : ''}`}
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
          className={`mx-1 ${currentPageComment === totalPages ? 'bg-[#1a5fa9] text-white' : ''}`}
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
          
          <div class="rounded shadow dark:shadow-slate-800">
              <div class="p-6 bg-[#eb6b11] text-white dark:bg-slate-50 flex items-center justify-between">
                  <span class="text-lg font-semibold">Auteur</span>
                  <span class="text-lg font-semibold">Date</span>
              </div>

                        <div class="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                            <h5 class="text-lg font-semibold">Comments:</h5>

                            <div class="mt-8">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <img src="assets/images/client/01.jpg" class="size-11 rounded-full shadow" alt="" />
    
                                        <div class="ms-3 flex-1">
                                            <a href="#" class="text-lg font-semibold hover:text-indigo-600 duration-500">Calvin Carlo</a>
                                            <p class="text-sm text-slate-400">6th May 2022 at 01:25 pm</p>
                                        </div>
                                    </div>

                                    <a href="#" class="text-slate-400 hover:text-indigo-600 duration-500 ms-5"><i class="mdi mdi-reply"></i> Reply</a>
                                </div>
                                <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                                    <p class="text-slate-400 italic">" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour "</p>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                            <h5 class="text-lg font-semibold">Leave A Comment:</h5>

                            <form class="mt-8">
                                <div class="grid grid-cols-1">
                                    <div class="mb-5">
                                        <div class="text-start">
                                            <label for="comments" class="font-semibold">Your Comment:</label>
                                            <div class="form-icon relative mt-2">
                                                <i data-feather="message-circle" class="size-4 absolute top-3 start-4"></i>
                                                <textarea name="comments" id="comments" class="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Message :"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" id="submit" name="send" class="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full">Send Message</button>
                            </form>
                        </div>
                    </div>
              {currentComments.map((comment) => (
                <div key={comment.id} class=" bg-white p-6 border-b border-gray-100 dark:border-gray-800">
                  <div class="sm:flex items-center justify-between">
                      <div class="flex items-center">
                          <img src={comment.user.file_path} class="h-10 rounded-full shadow dark:shadow-slate-800" alt="" />

                          <div class="ms-3">
                              <a href="#" class="hover:text-indigo-600 font-semibold">{`${comment.user.prenom} ${comment.user.nom}`}</a>
                              <p class="text-slate-400 text-sm font-normal"><i class="uil uil-user"></i> Auteur</p>
                          </div>
                      </div>
                      <p class="text-slate-400 text-sm font-normal mt-3 sm:mt-0"><i class="uil uil-clock"></i> {comment.created_at}</p>
                  </div>

                  <p class="text-slate-400 mt-4">{comment.content}</p>
              </div>))}

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
