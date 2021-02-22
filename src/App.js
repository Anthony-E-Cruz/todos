import React from 'react';
import logo from './mintbean.png';
import './styles/index.css';
import Login from './pages/login'
import Todo from './pages/todo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Todo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
