import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

interface GuestPageProps {
  setSpinnerShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuestPage: React.FC<GuestPageProps> = ({ setSpinnerShow }) => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-4 ">Lead Management System</h1>
      {!newUser && (
        <LoginForm setSpinnerShow={setSpinnerShow} setNewUser={setNewUser} />
      )}
      {newUser && <SignUpForm setNewUser={setNewUser} />}
    </div>
  );
};

export default GuestPage;
