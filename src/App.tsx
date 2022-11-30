import { Fragment, useContext, useEffect } from 'react';
import './App.css';
import Lead from './components/Lead/Lead';
import Navigation from './components/Navigation';
import { useNavigate } from 'react-router-dom';
import UserContext from './store/user-context';
import MemberPage from './pages/MemberPage';
import loginService from './api/services/login.service';
import CurrentUser from './components/CurrentUser';

function App() {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      userCtx.setUser(JSON.parse(localStorage.getItem('user') as string));
      userCtx.setAuthToken(localStorage.getItem('auth_token') as string);
    }
  }, [userCtx]);

  const logoutUserHandler = async () => {
    const response = await loginService.logoutRequest(userCtx.authToken);
    if (response?.status === 200) {
      userCtx.setAuthToken('');
      userCtx.setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className="App">
      <Fragment>
        <Navigation />
        <div className="p-5">
          {userCtx.authToken.length !== 0 && (
            <>
              <CurrentUser currentUser={userCtx.user!} />
              <MemberPage currentUser={userCtx.user!} />
            </>
          )}
        </div>
      </Fragment>
    </div>
  );
}

export default App;
