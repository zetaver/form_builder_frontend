import React, { useState } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";

const FormBuilder = () => {
  const [formComponents, setFormComponents] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) =>
      setFormComponents((prev) => [...prev, { ...item, id: Date.now() }]),
  });

  const handleSaveTemplate = async () => {
    if (!formTitle) {
      alert("Form title is required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/forms", {
        title: formTitle,
        description: formDescription,
        components: formComponents,
      });
      alert("Form template saved successfully!");
      setFormTitle("");
      setFormDescription("");
      setFormComponents([]);
    } catch (error) {
      console.error("Error saving form template:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h3>Form Builder</h3>
      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      <textarea
        placeholder="Form Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          height: "60px",
        }}
      />
      <div
        ref={drop}
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          minHeight: "200px",
        }}
      >
        <h4>Form Canvas</h4>
        {formComponents.map((component, index) => (
          <div
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
            }}
          >
            <strong>{component.label}</strong>
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveTemplate}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Template
      </button>
    </div>
  );
};

export default FormBuilder;
