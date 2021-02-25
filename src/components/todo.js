import React, { useState } from 'react'
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Todo = (data) => {

  const [edit, setEdit] = useState(false);
  const [localTodo, setLocalTodo] = useState(data.title);
  const title = data.title

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const deleteTodo = () => {
    let index = data.index;
    let todos = JSON.parse(localStorage.getItem('todos'));
    delete todos[index];
    localStorage.setItem('todos', JSON.stringify(todos));
    data.setTodos(todos);
  }

  const handleChange = (e) => {
    let todo = e.currentTarget.value;
    if (todo.length < 26) {
      setLocalTodo(todo);
    }
  }

  const handleSubmit = (e) => {
    let index = data.index;
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos[index] = localTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
    data.setTodos(todos);
    setEdit(!edit)
  }

  const todo = () => {
    if (edit) {
      return (
        <div className="todo-container">
          <input type="text" className="edit-todo-input" value={localTodo} onChange={e => handleChange(e)} />
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      )
    } else {
      return (
        <div className="todo-container">
          <div className="todo-title-container"><p className="todo-text">{title}</p></div>
          <div><FaPencilAlt className="todo-icon" onClick={toggleEdit} /><FaTrash className="todo-icon" onClick={deleteTodo} /></div>
        </div>
      );
    }
  }

  return (
    // <div className="todo-outer-container">
    /* <div><p>{title}</p></div>
    <div><FaPencilAlt onClick={toggleEdit} /><FaTrash onClick={deleteTodo} /></div>
    <br />
    {editTodo()} */
    todo()
    // </div>
  )
}

export default Todo
