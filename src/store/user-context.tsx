import React from 'react';
import { GlobalContext } from './UserProvider';

export const defaultUser = {
  id: 0,
  email: '',
  username: '',
  contact: '',
  roles: [],
};

const UserContext = React.createContext<GlobalContext>({
  authToken: '',
  user: defaultUser,
  setAuthToken: () => {},
  setUser: () => {},
});

export default UserContext;
