import React, { useState } from 'react'
import './styles/index.css';
import './styles/reset.css';
import './styles/todos.css';
import './styles/login.css';
import Login from './pages/login'
import ProtectedRoute from './components/protectedroute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App({ user }) {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute
            path="/dashboard"
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}>
          </ProtectedRoute>
          <Route
            path="/login"
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}>
            <Login authenticated={authenticated}
              setAuthenticated={setAuthenticated} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
