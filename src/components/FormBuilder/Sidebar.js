import React from "react";
import { useDrag } from "react-dnd";

const Sidebar = () => {
  const items = [
    { type: "text", label: "Text Field" },
    { type: "textarea", label: "Text Area" },
    { type: "number", label: "Number" },
    { type: "password", label: "Password" },
    { type: "checkbox", label: "Checkbox" },
    { type: "button", label: "Button" },
  ];

  const FieldItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "field",
      item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className="sidebar-item"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {item.label}
      </div>
    );
  };

  return (
    <div className="sidebar">
      {items.map((item) => (
        <FieldItem key={item.type} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
