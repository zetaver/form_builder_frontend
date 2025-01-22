import React from "react";
import { FaTimes, FaCog, FaCode } from "react-icons/fa"; // Import the icons
import "../../styles/field.css"; // Import the CSS file for field styles

const Field = ({ type }) => {
  const handleCancel = () => {
    console.log("Cancel action");
  };

  const handleSettings = () => {
    console.log("Settings action");
  };

  const handleJson = () => {
    console.log("JSON action");
  };

  return (
    <div className="field-container">
      {/* Action icons on the top-right corner */}
      <div className="field-actions">
        <FaTimes className="action-icon" onClick={handleCancel} />
        <FaCog className="action-icon" onClick={handleSettings} />
        <FaCode className="action-icon" onClick={handleJson} />
      </div>

      {/* Render the field based on the type */}
      {type === "Text Field" && (
        <input type="text" className="field-input" placeholder="Enter text" />
      )}
      {type === "Button" && <button className="field-button">Click Me</button>}
      {type === "Checkbox" && (
        <label className="field-checkbox">
          <input type="checkbox" /> Checkbox
        </label>
      )}
      {type === "Radio Button" && (
        <label className="field-radio">
          <input type="radio" /> Radio Button
        </label>
      )}
      {type === "Textarea" && (
        <textarea className="field-textarea" placeholder="Enter details"></textarea>
      )}
      {type === "Dropdown" && (
        <select className="field-dropdown">
          <option>Select an option</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      )}
    </div>
  );
};

export default Field;
