import { Fragment, useContext, useEffect } from 'react';
import './App.css';
import Lead from './components/Lead/Lead';
import Navigation from './components/Navigation';
import { useNavigate } from 'react-router-dom';
import UserContext from './store/user-context';
import MemberPage from './pages/MemberPage';

function App() {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      userCtx.setUser(JSON.parse(localStorage.getItem('user') as string));
      userCtx.setAuthToken(localStorage.getItem('auth_token') as string);
    }
  }, []);

  return (
    <div className="App">
      <Fragment>
        <Navigation />
        <div className="p-5">
          {userCtx.authToken.length !== 0 && (
            <>
              <MemberPage currentUser={userCtx.user} />
            </>
          )}
        </div>
      </Fragment>
    </div>
  );
}

export default App;
