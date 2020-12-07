import React from "react";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { format, formatDistanceToNow } from "date-fns";

function TodoItem({ todo, toggleCompleteTodo, removeTodo, editItem }) {
  return (
    <section
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <button
        type="button"
        className="complete-btn"
        onClick={() => toggleCompleteTodo(todo.id)}
      >
        {todo.isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
      </button>
      <span className="text">{todo.text}</span>

      <span className="date">
        {todo.date
          ? formatDistanceToNow(new Date(todo.date), { addSuffix: true })
          : "(no date)"}
      </span>
      <div>
        <button
          type="button"
          className="edit-btn"
          onClick={() => editItem(todo.id)}
        >
          <FaRegEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => removeTodo(todo.id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </section>
  );
}

export default TodoItem;
