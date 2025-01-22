import React, { useState } from "react";
import { useDrag } from "react-dnd";
import "../../styles/sidebar.css";

const fields = [
  { type: "Text Field", id: "text-field" },
  { type: "Button", id: "button" },
  { type: "Checkbox", id: "checkbox" },
  { type: "Radio Button", id: "radio-button" },
  { type: "Textarea", id: "textarea" },
  { type: "Dropdown", id: "dropdown" },
  { type: "Date Picker", id: "date-picker" },
  { type: "File Upload", id: "file-upload" },
  { type: "Range Slider", id: "range-slider" },
  { type: "Password Field", id: "password-field" },
  { type: "Number Field", id: "number-field" },
  { type: "Email Field", id: "email-field" },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter fields based on search term
  const filteredFields = fields.filter((field) =>
    field.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      {/* Search input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search elements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h3>Form Elements</h3>
      {filteredFields.map((field) => (
        <DraggableField key={field.id} field={field} />
      ))}
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
      {field.type}
    </div>
  );
};

export default Sidebar;
