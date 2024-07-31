import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import TodoItem from "./components/TodoItem";

import "./App.css";

function App() {
  const savedTodoList = localStorage.getItem("savedTodoList");

  const [value, setValue] = useState(""); // It stores user input value.
  const [todoList, setTodo] = useState(
    savedTodoList !== null
      ? JSON.parse(localStorage.getItem("savedTodoList"))
      : []
  ); //If data is already stored, it will be taken from local storage otherwise, it sets an empty array.

  const [mode, setMode] = useState(false); // It changes the application theme.

  useEffect(() => {
    document.title = "Todos List App";
  }); // It executes after component rendering. It changes the browser title.

  const addTodo = () => {
    if (value !== "") {
      const newTodo = {
        id: uuidv4(),
        text: value,
        checked: false,
      };
      setTodo((prevState) => [...prevState, newTodo]);
      setValue("");
    }
  }; // If we click on the save button, this function executes it creates a new todo and inserts it into todoList.

  const clickCheckBox = (id) => {
    const todos = todoList.map((each) => {
      if (each.id === id) {
        const checkedTodo = { ...each, checked: !each.checked };
        return checkedTodo;
      }
      return each;
    });
    setTodo(todos);
  }; // If we click on the checkbox, it updates the checked status in the todoList.

  const deleteTodoFromList = (id) => {
    const removeTodo = todoList.filter((todo) => todo.id !== id);
    setTodo(removeTodo);
  }; // It deletes the todo from the todoList.

  const saveTodoItem = () => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }; // It stores the todoList array in the local storage.

  const clearAllTodos = () => {
    setTodo([]);
    localStorage.clear();
  }; // It clears the data from the local storage.

  const changeThemeMode = () => {
    setMode((prev) => setMode(!prev));
  }; // It updates the application theme mode.

  const darkMode = () => (
    <>
      <p className="dark-mode-label">Dark Mode</p>{" "}
      <MdLightMode className="dark-mode-icon" />
    </>
  ); // It shows dark mode theme.

  const lightMode = () => (
    <>
      <p className="light-mode-label">Light Mode</p>
      <MdOutlineLightMode className="light-mode-icon" />
    </>
  ); // It shows light mode theme.

  return (
    <div
      className={
        mode === false ? "todos-bg-container" : "dark-mode-bg-container"
      }
    >
      <div className="container">
        <h1 className="todos-heading">Todos</h1>
        <div className="heading-mode-container">
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <button
            type="button"
            onClick={changeThemeMode}
            className="theme-mode-container mode-button"
          >
            {mode === false ? darkMode() : lightMode()}
          </button>
        </div>
        <input
          onChange={(event) => setValue(event.target.value)}
          type="text"
          className="todo-user-input"
          placeholder="What needs to be done?"
          value={value}
        />
        <button type="button" className="button" onClick={addTodo}>
          Add
        </button>
        <h1 className="todo-items-heading">
          My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        <ul className="todo-items-container">
          {todoList.map((each) => (
            <TodoItem
              todo={each}
              key={each.id}
              onChecked={clickCheckBox}
              removeTodo={deleteTodoFromList}
              themeMode={mode}
            />
          ))}
        </ul>
        <button type="button" onClick={saveTodoItem} className="button">
          Save
        </button>
        <button
          type="button"
          onClick={clearAllTodos}
          className="clear-all-button button"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
