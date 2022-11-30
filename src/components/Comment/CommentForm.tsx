import React, { FormEvent, Fragment, useState } from 'react';
import commentService from '../../api/services/comment.service';
import { CommentType, defaultCommentType } from '../../api/types';
import { messages } from '../../data/constants';
import Spinner from '../../UI/Spinner';

interface CommentFormProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  commentState: defaultCommentType;
  setCommentsList: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const CommentForm: React.FC<CommentFormProps> = ({
  setModalShow,
  commentState,
  setCommentsList,
}) => {
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [content, setContent] = useState('');

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (content === '') {
      alert(messages.form.required);
      return;
    }

    setSpinnerShow(true);

    const data = { ...commentState, content };
    const response = await commentService.createComment(data);

    if (response?.status === 201) {
      setCommentsList((prevState) => [...prevState, response.data]);
      setSpinnerShow(true);
    }
  };

  return (
    <div>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="mb-4 font-medium text-xl underline">
            Create New Comment
          </h1>
          <form className="w-full max-w-xl" onSubmit={formSubmitHandler}>
            <div className="flex w-full mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Comment Form
                </label>
                <textarea
                  required={true}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  name="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <button
              className="float-right bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default CommentForm;
