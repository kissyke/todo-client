import React from "react";
import "./TodoItem.css";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

function TodoItem({ todo, toggleCompleteTodo, removeTodo, editItem }) {
  return (
    <section
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <button
        type="button"
        className="complete-btn"
        onClick={() => toggleCompleteTodo(todo._id)}
      >
        {todo.isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
      </button>
      <span className="text">{todo.text}</span>

      <span className="date">
        {todo.date
          ? formatDistanceToNow(todo.date, { addSuffix: true })
          : "(no date)"}
      </span>
      <div>
        <button
          type="button"
          className="edit-btn"
          onClick={() => editItem(todo._id)}
        >
          <FaRegEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => removeTodo(todo._id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </section>
  );
}

export default TodoItem;
