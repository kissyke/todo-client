import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useGlobalContext } from "../../context/TodoContext";

function TodoItemList() {
  const { todoItems } = useGlobalContext();

  return (
    <>
      {todoItems &&
        todoItems.length > 0 &&
        todoItems.map((todo) => <TodoItem key={todo._id} todo={todo} />)}
    </>
  );
}

export default TodoItemList;
