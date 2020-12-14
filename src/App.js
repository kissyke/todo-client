import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TodoItemList from "./components/TodoItemList/TodoItemList";
import EditForm from "./components/EditForm/EditForm";
import { useGlobalContext } from "./context/TodoContext";

function App() {
  const { fetchData } = useGlobalContext();

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [fetchData]);

  return (
    <main className="app">
      <article className="todo-list">
        <Header />
        <TodoItemList />
        <EditForm />
      </article>
    </main>
  );
}

export default App;
