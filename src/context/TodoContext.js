import React, { useState, useContext } from "react";

const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const sortTodoItems = (a, b) =>
    (a.date || Number.POSITIVE_INFINITY) - (b.date || Number.POSITIVE_INFINITY);

  const fetchData = async () => {
    const result = await fetch("/api/todos");
    const list = await result.json();
    for (const item of list) {
      if (item.date) {
        item.date = new Date(item.date);
      }
    }
    list.sort(sortTodoItems);
    setTodoItems(list);
  };

  const addTodo = async (text, date) => {
    const newTodo = { text, date };
    newTodo.date = newTodo.date ? newTodo.date.toString() : newTodo.date;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    };
    try {
      const result = await fetch("/api/todos", requestOptions);
      const newItem = await result.json();
      const fixedNewItem = {
        ...newItem,
        date: newItem.date ? new Date(newItem.date) : newItem.date,
      };
      const newTodos = [...todoItems, fixedNewItem];
      newTodos.sort(sortTodoItems);
      setTodoItems(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (todo) => {
    const fixedTodo = {
      ...todo,
      date: todo.date ? todo.date.toString() : todo.date,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fixedTodo),
    };
    const result = await fetch(`/api/todos/${todo._id}`, requestOptions);
    const updatedItem = await result.json();
    const fixedUpdatedItem = {
      ...updatedItem,
      date: updatedItem.date ? new Date(updatedItem.date) : updatedItem.date,
    };
    const newTodos = todoItems.map((item) =>
      item._id === fixedUpdatedItem._id ? { ...fixedUpdatedItem } : item
    );
    newTodos.sort(sortTodoItems);
    setTodoItems(newTodos);
  };

  const toggleCompleteTodo = async (id) => {
    const specificItem = todoItems.find((item) => item._id === id);
    specificItem.isCompleted = !specificItem.isCompleted;
    updateTodo(specificItem);
  };

  const removeTodo = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      await fetch(`/api/todos/${id}`, requestOptions);
      const newTodos = todoItems.filter((item) => item._id !== id);
      showAlert(true, "danger", "item removed");
      setTodoItems(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (id) => {
    const specificItem = todoItems.find((item) => item._id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.text);
    setSelectedDate(
      specificItem.date ? new Date(specificItem.date) : new Date()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      const specificItem = todoItems.find((item) => item._id === editID);
      const modifiedItem = { ...specificItem, text: name, date: selectedDate };
      updateTodo(modifiedItem);
      setName("");
      setSelectedDate(null);
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      addTodo(name, selectedDate);
      setName("");
      setSelectedDate(null);
    }
  };

  const handleReset = () => {
    setEditID(null);
    setIsEditing(false);
    setName("");
    setSelectedDate(null);
  };

  return (
    <TodoContext.Provider
      value={{
        alert,
        showAlert,
        todoItems,
        fetchData,
        sortTodoItems,
        addTodo,
        updateTodo,
        toggleCompleteTodo,
        removeTodo,
        editItem,
        handleSubmit,
        handleReset,
        name,
        selectedDate,
        setName,
        setSelectedDate,
        isEditing,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(TodoContext);
};

export { TodoContext, TodoProvider };
