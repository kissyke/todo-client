import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header>
      <h2>My To-do list</h2>
      {props.children}
    </header>
  );
}

export default Header;
