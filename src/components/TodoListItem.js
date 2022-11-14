import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import { FaTrash, FaEdit } from "react-icons/fa";

const TodoListItem = ({ todo }) => {
  const [checked, setChecked] = useState(todo.completed);
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState(todo.title);

  const { todoDispatch } = useContext(TodoContext);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    todoDispatch({
      type: "TOGGLE_TODO",
      payload: todo.id,
    });
  };
  const handleEdit = () => {
    setDisabled(!disabled);
  };
  const handleUpdate = (e) => {
    if (e.key === "Enter") {
      todoDispatch({
        type: "UPDATE_TODO",
        payload: {
          id: todo.id,
          title,
        },
      });
      setDisabled(!disabled);
    }
  };
  const handleDelete = () => {
    todoDispatch({
      type: "DELETE_TODO",
      payload: todo.id,
    });
  };

  return (
    <div className="list-item">
      <input
        type="checkbox"
        className="list-item-checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <input
        type="text"
        className="list-item-input"
        style={{
          textDecoration: checked ? "line-through" : "none",
          color: checked ? "gray" : "black",
          border: disabled ? "none" : "1px solid #ccc",
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled}
        onKeyDown={handleUpdate}
      />
      <button className="list-item-button" onClick={handleEdit}>
        <FaEdit />
      </button>
      <button className="list-item-button" onClick={handleDelete}>
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoListItem;
