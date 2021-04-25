import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import DrawPage from './components/DrawPage/DrawPage.js';

const App = () => {
  return (
    <>
      <Suspense fallback={<span>Loading...</span>}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/draw" component={DrawPage} />
            </Switch>
          </AuthProvider>
        </Router>
      </Suspense>
    </>
  )
}

export default App;