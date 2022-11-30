import React, { Dispatch, useState } from 'react';
import { IRoles } from '../api/types';
import UserContext from './user-context';

type Props = {
  children?: React.ReactNode;
};
export interface IUserProps {
  id: number;
  email: string;
  username: string;
  contact: string;
  roles: IRoles[];
}

export type GlobalContext = {
  authToken: string;
  user: IUserProps | null;
  setAuthToken: Dispatch<string>;
  setUser: Dispatch<IUserProps | null>;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [user, setUser] = useState<IUserProps | null>();

  const userContext: GlobalContext = {
    authToken: authToken,
    user: user!,
    setAuthToken: setAuthToken,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
