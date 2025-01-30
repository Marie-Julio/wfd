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

  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <AppBody>
      <div className=" bg-white">
        <div class="bg-[#1a5fa9] md:pt-16 pt-10 text-white grid grid-cols-1 text-center">
            <h3 class="font-bold uppercase leading-normal text-3xl mb-5">Commentaire</h3>
            
            <div class="subcribe-form mt-6 pb-10 px-5">
                <form class="relative max-w-xl mx-auto">
                    <input type="text" id="SearchForumKeyword" name="text" class="pt-4 pe-14 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" placeholder="Rechercher ..." />
                    <button type="submit" class="inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] size-[46px] bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-full"><i class="uil uil-search"></i></button>
                </form>
            </div>
        </div>
        <div class="container relative md:mt-16 mt-10 pb-10">
          <div className="mt-6">
              <div class="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                  <h5 class="text-lg font-semibold">Commentaires :</h5>

                  {currentComments.map((comment) => (
                  <div key={comment.id} class="mt-8">
                      <div class="flex items-center justify-between">
                          <div class="flex items-center">
                              <img src="assets/images/client/01.jpg" class="size-11 rounded-full shadow" alt="" />

                              <div class="ms-3 flex-1">
                                  <a href="#" class="text-lg font-semibold hover:text-indigo-600 duration-500">{comment.user.prenom} {comment.user.nom}</a>
                                  <p class="text-sm text-slate-400">6th May 2022 at 01:25 pm</p>
                              </div>
                          </div>

                          <a href="#" class="text-slate-400 hover:text-indigo-600 duration-500 ms-5"><i class="mdi mdi-reply"></i> Reply</a>
                      </div>
                      <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                          <p class="text-slate-400 italic"><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }} /></p>
                      </div>
                  </div>))}
                  <div className="flex justify-center items-center mt-4 space-x-2">
                    {renderPagination()}
                  </div>

                  </div>
                  <div class="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                    <h5 class="text-lg font-semibold">Laisser un commentaire :</h5>

                    <form class="mt-8">
                        <div class="grid grid-cols-1">
                            <div class="mb-5">
                                <div class="text-start">
                                    <label for="comments" class="font-semibold text-gray-500">Votre commentaire :</label>
                                    <div class="form-icon relative mt-2">
                                        <i data-feather="message-circle" class="size-4 absolute top-3 start-4"></i>
                                        <textarea name="comments" id="comments" value={newComment} onChange={(e) => setNewComment(e.target.value)} class="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Message :"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" onClick={addComment} id="submit" name="send" class="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full">Envoyer le message</button>
                    </form>
                </div>
              </div>
          </div>
        </div>
    </AppBody>
  );
};

export default Comment;
