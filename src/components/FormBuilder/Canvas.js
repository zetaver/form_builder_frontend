import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Field from "./Field";

const Canvas = () => {
  const [droppedFields, setDroppedFields] = useState([]);
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: "FIELD",
    drop: (item, monitor) => {
      if (!dropRef.current) return;
      const offset = monitor.getClientOffset();
      const canvasRect = dropRef.current.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      const newField = {
        ...item,
        x,
        y,
        id: Date.now(), 
      };
      setDroppedFields((prevFields) => [...prevFields, newField]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(dropRef);

  const handleCancelField = (id) => {
    setDroppedFields((prevFields) => prevFields.filter(field => field.id !== id));
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
          onCancel={handleCancelField}
        />
      ))}
    </div>
  );
};

// DraggableField component to make each field draggable within the canvas
const DraggableField = ({ field, onCancel }) => {
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
    // Optionally, save position here if needed, but for now we aren't saving it.
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
      onMouseLeave={handleMouseUp}
    >
      <Field type={field.type} onCancel={() => onCancel(field.id)} />
    </div>
  );
};

export default Canvas;
