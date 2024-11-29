import React, { useState } from "react";
import { useDrop } from "react-dnd";

const Canvas = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) => addComponent(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addComponent = (component) => {
    setDroppedComponents([...droppedComponents, component]);
  };

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: isOver ? "#f8f8f8" : "#fff",
        border: "1px solid #ddd",
      }}
    >
      <h3>Form Canvas</h3>
      {droppedComponents.map((component, index) => (
        <div
          key={index}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <strong>{component.label}</strong>
          <p>{component.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
