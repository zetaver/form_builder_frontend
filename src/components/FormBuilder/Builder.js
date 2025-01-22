import React from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import "./builder.css";

const Builder = () => {
  return (
    <div className="builder">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Builder;
