import React, { useEffect, useState } from "react";
import "./App.css";
import items from "./data/data.js";
import Alert from "./components/Alert.js";
import TodoItem from "./components/TodoItem";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import hu from "date-fns/locale/hu";
import "react-datepicker/dist/react-datepicker.css";
setDefaultLocale("hu", hu);

function App() {
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

  const sortTodoItems = (a, b) =>
    (a.date || Number.POSITIVE_INFINITY) - (b.date || Number.POSITIVE_INFINITY);

  useEffect(() => {
    setTodoItems(items.sort(sortTodoItems));
  }, []);

  const addTodo = (text, date) => {
    const id = new Date().getTime().toString();
    const newTodos = [...todoItems, { id, text, date }];
    newTodos.sort(sortTodoItems);
    setTodoItems(newTodos);
  };

  const toggleCompleteTodo = (id) => {
    const newTodos = [...todoItems];
    const specificItem = newTodos.find((item) => item.id === id);
    specificItem.isCompleted = !specificItem.isCompleted;
    setTodoItems(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todoItems.filter((item) => item.id !== id);
    showAlert(true, "danger", "item removed");
    setTodoItems(newTodos);
  };

  const editItem = (id) => {
    const specificItem = todoItems.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.text);
    console.log(specificItem.date);
    setSelectedDate(specificItem.date || new Date());
    console.log(selectedDate);
    console.log(new Date(selectedDate));
    console.log(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setTodoItems(
        todoItems.map((item) => {
          if (item.id === editID) {
            return { ...item, text: name, date: selectedDate };
          }
          return item;
        })
      );
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

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <main className="app">
      <article className="todo-list">
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={todoItems} />
        )}
        {todoItems &&
          todoItems.length > 0 &&
          todoItems.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleCompleteTodo={toggleCompleteTodo}
              removeTodo={removeTodo}
              editItem={editItem}
            />
          ))}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-control">
            <input
              type="text"
              className="name-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What to do..."
            />
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy. MMM dd. HH:mm"
                showTimeInput
                timeFormat="HH:mm"
                locale={hu}
                placeholderText="When..."
                isClearable
              />
            </div>
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "add"}
            </button>
            <button type="reset" className="reset-btn">
              cancel
            </button>
          </div>
        </form>
      </article>
    </main>
  );
}

export default App;
