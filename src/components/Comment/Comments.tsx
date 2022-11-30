import React, { useEffect, useState } from 'react';
import { CommentType, defaultCommentType } from '../../api/types';
import commentService from '../../api/services/comment.service';
import Spinner from '../../UI/Spinner';

import ReactTimeAgo from 'react-time-ago';
import Modal from '../../UI/Modal';
import CommentForm from './CommentForm';

interface CommentsProps {
  id: string;
  commentType: string;
}

const defaultComment: defaultCommentType = {
  commentable_id: '',
  commentable_type: '',
};

const Comments: React.FC<CommentsProps> = ({ id, commentType }) => {
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [commentState, setCommentState] = useState(defaultComment);

  const setTypesToCreateComment = (id: string) => {
    setCommentState({
      commentable_id: id,
      commentable_type: commentType,
    });
    setModalShow(true);
  };

  useEffect(() => {
    setSpinnerShow(true);
    const getCommentsHandler = async () => {
      const resposne = await commentService.getAll(commentType, id);
      setCommentsList(resposne?.data);
    };
    getCommentsHandler();
  }, [id, commentType]);

  return (
    <div className="mt-4">
      <h1 className="text-lg font-medium">Comments </h1>
      <button
        onClick={() => setTypesToCreateComment(id)}
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
      >
        Add New Comment
      </button>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <div className="mt-1">
          {commentsList.map((comment, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 gap-4 p-4 my-2 border rounded-lg bg-white shadow-sm"
            >
              <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p>
                      <strong>Created by: &nbsp; </strong>
                      {comment.user.email}
                    </p>
                    <div className="text-sm font-bold text-gray-500">
                      <ReactTimeAgo
                        date={new Date(comment.created_at)}
                        locale="en-US"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          <CommentForm
            setModalShow={setModalShow}
            commentState={commentState}
            setCommentsList={setCommentsList}
          />
        </Modal>
      )}
    </div>
  );
};

export default Comments;
