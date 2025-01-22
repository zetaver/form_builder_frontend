// src/components/FormBuilder/Field.js
import React from "react";

const Field = ({ type }) => {
  switch (type) {
    case "Text Field":
      return <input type="text" placeholder="Enter text" />;
    case "Button":
      return <button>Button</button>;
    case "Checkbox":
      return (
        <label>
          <input type="checkbox" /> Checkbox
        </label>
      );
    default:
      return null;
  }
};

export default Field;
