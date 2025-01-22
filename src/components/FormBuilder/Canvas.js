import React from "react";
import { useDrop } from "react-dnd";
import { useDragDrop } from "../../hooks/useDragDrop";
import Field from "./Field";

const Canvas = () => {
  const { fields, handleDrop } = useDragDrop();

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (item) => handleDrop(item),
  }));

  return (
    <div ref={drop} className="canvas">
      {fields.map((field) => (
        <Field key={field.id} type={field.type} />
      ))}
    </div>
  );
};

export default Canvas;
