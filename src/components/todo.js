import React, { useState } from 'react'
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Todo = (data) => {

  const [edit, setEdit] = useState(false);
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

  return (
    <div className="todo-container">
      <div><p>{title}</p></div>
      <div><FaPencilAlt onClick={toggleEdit} /><FaTrash onClick={deleteTodo} /></div>
    </div>
  )
}

export default Todo
