import React from 'react';
import { GlobalContext } from './UserProvider';

const UserContext = React.createContext<GlobalContext>({
  authToken: '',
  user: null,
  setAuthToken: () => {},
  setUser: () => {},
});

export default UserContext;
