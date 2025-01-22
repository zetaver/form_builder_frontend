import React from "react";
import { FaTimes, FaCog, FaCode } from "react-icons/fa"; // Import the icons
import "../../styles/field.css"; // Import the CSS file for field styles

const Field = ({ type, onCancel }) => {
  const handleCancel = () => {
    onCancel();  // Call the onCancel passed as a prop
  };

  return (
    <div className="field-container" style={{ position: "relative" }}>
      {/* Action icons on the top-right corner */}
      <div className="field-actions" style={{ position: "absolute", top: 0, right: 0 }}>
        <FaTimes className="action-icon cancel_icon" onClick={handleCancel} />
        <FaCog className="action-icon setting_icon" />
        <FaCode className="action-icon embeded_icon" />
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
