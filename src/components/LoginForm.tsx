import React, { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../api/services/login.service';
import { messages } from '../data/constants';
import UserContext from '../store/user-context';

interface LoginFormProps {
  setSpinnerShow: React.Dispatch<React.SetStateAction<boolean>>;
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setSpinnerShow,
  setNewUser,
}) => {
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert(messages.form.required);
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    setSpinnerShow(true);

    const response = await loginService.loginRequest(user);
    console.log(response);

    setSpinnerShow(false);
  };

  return (
    <div className="flex item-center justify-center p-5 mt-5">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2 text-left"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2 text-left"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex justify-between mr-3 ">
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-3 rounded-md"
          >
            Log In
          </button>
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setNewUser(true)}
          >
            New User
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
