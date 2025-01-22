// src/components/FormBuilder/Canvas.js
import React from "react";
import { useDrop } from "react-dnd";
import Field from "./Field";

const Canvas = ({ fields, onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "FIELD",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={`canvas ${isOver ? "hover" : ""}`}>
      {fields.map((field, index) => (
        <Field key={index} type={field.type} />
      ))}
    </div>
  );
};

export default Canvas;
