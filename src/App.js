import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import FormBuilder from "./pages/FormBuilder";
import FormSubmission from "./components/Submission";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <FormBuilder />
          <FormSubmission />
        </div>
        <div></div>
      </div>
    </DndProvider>
  );
};

export default App;
