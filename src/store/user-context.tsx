import React from 'react';
import { GlobalContext } from './UserProvider';

const UserContext = React.createContext<GlobalContext>({
  authToken: '',
  user: { id: 0, email: '', username: '', contact: '' },
  setAuthToken: () => {},
  setUser: () => {},
});

export default UserContext;
