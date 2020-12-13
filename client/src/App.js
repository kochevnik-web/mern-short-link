import React from 'react';
import 'materialize-css';

import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './pages/routes';
import {useAuth} from './hooks/auth.hook';
import { AuthContext } from './context/AutnContext';

function App() {

  const {login, logout, token, userId} = useAuth();
  const isAuthenticated = !!token;
  const routers = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
      <Router>
        <div className="container">
          {routers}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
