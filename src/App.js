import React from 'react';
import logo from './mintbean.png';
import './styles/index.css';
import './styles/reset.css';
import './styles/todos.css';
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
          <Route path="/dashboard">
            <Todo />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
