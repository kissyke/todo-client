import React from "react";
import "./Header.css";
import Alert from "../Alert/Alert";
import { useGlobalContext } from "../../context/TodoContext";

function Header() {
  const { alert, showAlert, todoItems } = useGlobalContext();
  return (
    <header>
      <h2>My To-do list</h2>
      {alert.show && (
        <Alert {...alert} removeAlert={showAlert} list={todoItems} />
      )}
    </header>
  );
}

export default Header;
