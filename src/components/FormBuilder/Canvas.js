import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Field from "./Field";

const Canvas = () => {
  const [droppedFields, setDroppedFields] = useState([]);
  const dropRef = useRef(null); // Use useRef for the canvas reference

  const [{ isOver }, drop] = useDrop({
    accept: "FIELD",
    drop: (item, monitor) => {
      if (!dropRef.current) return; // Ensure dropRef is attached
      const offset = monitor.getClientOffset();
      const canvasRect = dropRef.current.getBoundingClientRect(); // Safely access getBoundingClientRect
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      const newField = {
        ...item,
        x,
        y,
        id: Date.now(), // Assign a unique ID for each field
      };
      setDroppedFields((prevFields) => [...prevFields, newField]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(dropRef);

  // Function to handle field drag and update position
  const handleFieldMove = (id, x, y) => {
    setDroppedFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, x, y } : field
      )
    );
  };

  return (
    <div
      ref={dropRef}
      className={`canvas ${isOver ? "hover" : ""}`}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {droppedFields.map((field) => (
        <DraggableField
          key={field.id}
          field={field}
          onMove={handleFieldMove}
        />
      ))}
    </div>
  );
};

// DraggableField component to make each field draggable within the canvas
const DraggableField = ({ field, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: field.x, y: field.y });
  const [currentPos, setCurrentPos] = useState({ x: field.x, y: field.y });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialPos({ x: e.clientX - currentPos.x, y: e.clientY - currentPos.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - initialPos.x;
    const newY = e.clientY - initialPos.y;
    setCurrentPos({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onMove(field.id, currentPos.x, currentPos.y); // Save the updated position
  };

  return (
    <div
      style={{
        position: "absolute",
        left: currentPos.x,
        top: currentPos.y,
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensure drag ends if mouse leaves the element
    >
      <Field type={field.type} />
    </div>
  );
};

export default Canvas;
