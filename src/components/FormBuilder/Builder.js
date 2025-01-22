// src/components/FormBuilder/Builder.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import "./../../styles/builder.css";

const Builder = () => {
  const [fields, setFields] = useState([]);

  const handleDrop = (item) => {
    setFields((prevFields) => [...prevFields, item]);
  };

  return (
    <div className="builder">
      <Sidebar />
      <Canvas fields={fields} onDrop={handleDrop} />
    </div>
  );
};

export default Builder;
