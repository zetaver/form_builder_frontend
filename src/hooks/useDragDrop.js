import { useState } from "react";

export const useDragDrop = () => {
  const [fields, setFields] = useState([]);

  const handleDrop = (item) => {
    setFields([...fields, { ...item, id: fields.length }]);
  };

  return { fields, handleDrop };
};
