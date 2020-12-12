import React from 'react';
import 'materialize-css';

import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './pages/routes';

function App() {

  const routers = useRoutes(false);

  return (
    <Router>
      <div className="container">
        {routers}
      </div>
    </Router>
  );
}

export default App;
