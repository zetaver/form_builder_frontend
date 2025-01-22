import React from "react";

const Field = ({ type }) => {
  switch (type) {
    case "text":
      return <input type="text" placeholder="Text Field" />;
    case "textarea":
      return <textarea placeholder="Text Area"></textarea>;
    case "number":
      return <input type="number" placeholder="Number" />;
    case "password":
      return <input type="password" placeholder="Password" />;
    case "checkbox":
      return <input type="checkbox" />;
    case "button":
      return <button>Button</button>;
    default:
      return null;
  }
};

export default Field;
