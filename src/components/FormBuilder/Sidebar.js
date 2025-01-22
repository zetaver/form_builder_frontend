import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaTextWidth, FaPencilAlt, FaCheckSquare, FaDotCircle, FaFileAlt, FaSlidersH, FaRegCalendarAlt, FaUpload, FaKey, FaHashtag, FaEnvelope, FaSearch } from "react-icons/fa"; // Added FaSearch
import "../../styles/sidebar.css";

const fields = [
  { type: "Text Field", id: "text-field", icon: <FaTextWidth /> },
  { type: "Button", id: "button", icon: <FaPencilAlt /> },
  { type: "Checkbox", id: "checkbox", icon: <FaCheckSquare /> },
  { type: "Radio Button", id: "radio-button", icon: <FaDotCircle /> },
  { type: "Textarea", id: "textarea", icon: <FaFileAlt /> },
  { type: "Dropdown", id: "dropdown", icon: <FaSlidersH /> },
  { type: "Date Picker", id: "date-picker", icon: <FaRegCalendarAlt /> },
  { type: "File Upload", id: "file-upload", icon: <FaUpload /> },
  { type: "Range Slider", id: "range-slider", icon: <FaSlidersH /> },
  { type: "Password Field", id: "password-field", icon: <FaKey /> },
  { type: "Number Field", id: "number-field", icon: <FaHashtag /> },
  { type: "Email Field", id: "email-field", icon: <FaEnvelope /> },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [formTitle, setFormTitle] = useState(""); // Added state for form title

  const filteredFields = fields.filter((field) =>
    field.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="title-container">
        {/* Title input with label */}
        <label htmlFor="form-title" className="title-label">
          Title
        </label>
        <input
          id="form-title"
          type="text"
          className="form-title-input"
          placeholder="Enter form title..."
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>

      <div className="search-container">
        {/* Search input with icon */}
        <input
          type="text"
          className="search-input"
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3>Form Elements</h3>
      <div className="field-list">
        {filteredFields.map((field) => (
          <DraggableField key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
};

const DraggableField = ({ field }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "FIELD",
    item: field,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`draggable-field ${isDragging ? "dragging" : ""}`}
    >
      <div className="field-icon">{field.icon}</div>
      <div className="field-name">{field.type}</div>
    </div>
  );
};

export default Sidebar;
