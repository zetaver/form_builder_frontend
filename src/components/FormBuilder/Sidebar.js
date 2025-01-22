// src/components/FormBuilder/Sidebar.js
import React from "react";
import { useDrag } from "react-dnd";

const fields = [
  { type: "Text Field", id: "text-field" },
  { type: "Button", id: "button" },
  { type: "Checkbox", id: "checkbox" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      {fields.map((field) => (
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
