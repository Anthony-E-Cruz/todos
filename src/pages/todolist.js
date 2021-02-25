import React, { useState, useRef } from 'react'
import Todo from '../components/todo'
import { BsSearch, BsPlus } from "react-icons/bs";

const DashBoard = (data) => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});
  const [newTodo, setNewTodo] = useState("");
  const [newTodoError, setNewTodoError] = useState(null);
  const [formActive, setFormActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTodo, setSearchTodo] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const newTodoInput = useRef(null);

  const validateTodo = (todo) => {
    if (!todo.length) {
      setNewTodo("")
    }
    if (todo.length === 26) {
      newTodoInput.current.style.borderColor = "red"
      setNewTodoError("Character limit exceeded")
      setNewTodo(todo)
    }
    if (todo.length > 0 && todo.length < 26) {
      setNewTodoError(null)
      setNewTodoError(null);
      setNewTodo(todo)
    }
  }

  const renderTodos = () => {
    let res = [];
    let maxIdx = null;
    Object.keys(todos).forEach(i => {
      if (parseInt(i) > maxIdx) {
        maxIdx = parseInt(i);
      };
    });
    if (!searchActive) {
      for (let i = 0; i <= maxIdx; i++) {
        if (todos[i]) {
          res.push(<Todo key={i} title={todos[i]} index={i} todos={todos} setTodos={setTodos} />)
        }
      }
    } else {
      for (let i = 0; i <= maxIdx; i++) {
        if (todos[i] && todos[i].toLowerCase().search(searchTodo.toLowerCase()) !== -1) {
          res.push(<Todo key={i} title={todos[i]} index={i} todos={todos} setTodos={setTodos} />)
        }
      }
    }
    return (
      res
    );
  }

  const createTodo = () => {
    let maxIdx = null;
    Object.keys(todos).forEach(i => {
      if (parseInt(i) > maxIdx) {
        maxIdx = parseInt(i);
      }
    })
    if (Object.keys(todos)) {
      setCurrentIdx(Math.max(Object.keys(todos)) + 1)
    }
    let allTodos = todos;
    allTodos[(maxIdx + 1)] = newTodo;
    setTodos(allTodos);
    setNewTodo("");
    localStorage.setItem('todos', JSON.stringify(allTodos))
    setCurrentIdx(currentIdx + 1)
    setFormActive(false);
    setNewTodo("")
  }

  const toggleForm = () => {
    setFormActive(true);
    setSearchTodo("")
    setNewTodo("")
  }

  const handleChange = (e) => {
    setSearchTodo(e.currentTarget.value)
    if (e.currentTarget.value.length > 25) {
      setNewTodoError("Character limit exceeded")
    } else {
      setNewTodoError(null)
      setSearchTodo(e.currentTarget.value)
    }
    if (e.currentTarget.value.length) {
      setSearchActive(true)
    } else {
      setSearchActive(false)
    }
  }

  const newTodoForm = () => {
    if (formActive) {
      return (
        <div className="todo-form">
          <div className="todo-search">
            <BsPlus className="add-icon" />
            <input
              ref={newTodoInput}
              className="new-todo-input"
              type="text"
              placeholder="Add New Todo!"
              value={newTodo}
              onChange={event => validateTodo(event.target.value)}
            />
          </div>
          <div>
            <button
              className="save-button"
              onClick={() => createTodo()}
            >Save</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="todo-form">
          <div className="todo-search">
            <BsSearch className="search-icon" />
            <input
              className="search-todo-input"
              type="text"
              placeholder="Search"
              value={searchTodo}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <button
              className="search-button"
              onClick={toggleForm}
            >New</button>
          </div>
        </div>
      )
    }
  }

  const logOut = () => {
    data.setAuthenticated(false)
  }

  return (
    <div className="todos-page-outer-container">
      <div className="logout-container">
        <button className="logout-button" onClick={logOut}>log Out</button>
      </div>
      <div className="todos-page-container">
        <p className="title">My To-Do List</p>
        <p className="error">{newTodoError}</p>
        {newTodoForm()}
        <div className="todos-list-container">
          {renderTodos()}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
