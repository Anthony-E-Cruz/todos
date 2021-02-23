import React, { useState } from 'react'
import Todo from '../components/todo'

const DashBoard = () => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});
  const [newTodo, setNewTodo] = useState();
  const [newTodoError, setNewTodoError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const validateTodo = (todo) => {
    if (!todo.length) {
      setNewTodo("")
    }
    if (todo.length > 25) {
      setNewTodoError("Character limit exceeded")
    }
    if (todo.length > 0 && todo.length < 25) {
      setNewTodoError(null);
      setNewTodo(todo)
    }
  }

  const renderTodos = () => {
    let maxIdx = null;
    Object.keys(todos).forEach(i => {
      if (parseInt(i) > maxIdx) {
        maxIdx = parseInt(i);
      }
    })
    let allTodos = localStorage.getItem('todos') || {};
    let res = [];
    for (let i = 0; i <= maxIdx; i++) {
      if (todos[i]) {
        res.push(<Todo title={todos[i]} index={i} todos={todos} setTodos={setTodos} />)
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
  }

  return (
    <div className="todos-page-container">
      <p>My To-Do List</p>
      <div>
        <input
          type="text"
          placeholder="New Todo"
          className="todo-input"
          value={newTodo}
          onChange={event => validateTodo(event.target.value)}
        />
        <button
          onClick={() => createTodo()}
        >Save</button>
      </div>
      {renderTodos()}
    </div>
  )
}

export default DashBoard

