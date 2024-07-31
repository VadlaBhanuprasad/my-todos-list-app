import { MdOutlineDeleteOutline } from "react-icons/md";

import "./index.css";

const TodoItem = (props) => {
  const { todo, onChecked, removeTodo, themeMode } = props;
  const { id, text, checked } = todo;

  const strickTodo = () => {
    //It passes the todo id to a function to strike the specific todo.
    onChecked(id);
  };

  const deleteTodo = () => {
    //It passes the todo id to delete the todo from the list.
    removeTodo(id);
  };

  const checkedBox = checked && "checked"; //If checked as true, the todo label text will be stricked.

  return (
    <li
      className={themeMode === true ? "dark-mode-color" : "todo-item-container"}
    >
      <input
        type="checkbox"
        className="checkbox-input"
        onClick={() => strickTodo()}
        checked={checked}
      />
      <div className="label-container">
        <p className={`${checkedBox} checkbox-label`}>{text}</p>
        <div className="delete-icon-container">
          <button type="button" className="delete-button" onClick={deleteTodo}>
            <MdOutlineDeleteOutline color="#000000" className="delete-icon" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
