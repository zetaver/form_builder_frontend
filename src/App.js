// src/App.js
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Builder from "./components/FormBuilder/Builder";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Builder />
    </DndProvider>
  );
};

export default App;
