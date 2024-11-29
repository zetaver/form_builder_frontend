import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";

const FormBuilder = () => {
  const [formComponents, setFormComponents] = useState([]);
  const [formData, setFormData] = useState({});
  const [formId, setFormId] = useState(null);

  // Handle dropping components into the form
  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item) => {
      setFormComponents((prev) => [...prev, item]);
    },
  });

  // Handle input changes
  const handleInputChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submissions", {
        formId: formId, // Save formId for submission
        data: formData,
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle form template save
  const handleSaveTemplate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/forms", {
        components: formComponents, // Save components added to the form
      });
      setFormId(response.data._id); // Store the form ID for later use
      alert("Form template saved successfully!");
    } catch (error) {
      console.error("Error saving form template:", error);
    }
  };

  // Dynamically render components
  const renderComponent = (component) => {
    switch (component.type) {
      case "text":
        return (
          <div key={component.key}>
            <label>{component.label}</label>
            <input
              type="text"
              placeholder={component.placeholder}
              value={formData[component.key] || ""}
              onChange={(e) => handleInputChange(e, component.key)}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={component.key}>
            <label>{component.label}</label>
            <textarea
              placeholder={component.placeholder}
              value={formData[component.key] || ""}
              onChange={(e) => handleInputChange(e, component.key)}
            />
          </div>
        );
      case "number":
        return (
          <div key={component.key}>
            <label>{component.label}</label>
            <input
              type="number"
              placeholder={component.placeholder}
              value={formData[component.key] || ""}
              onChange={(e) => handleInputChange(e, component.key)}
            />
          </div>
        );
      case "email":
        return (
          <div key={component.key}>
            <label>{component.label}</label>
            <input
              type="email"
              placeholder={component.placeholder}
              value={formData[component.key] || ""}
              onChange={(e) => handleInputChange(e, component.key)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={drop} style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h3>Form Builder</h3>
      <form onSubmit={handleSubmit}>
        {formComponents.map(renderComponent)}
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleSaveTemplate}>Save Template</button>
    </div>
  );
};

export default FormBuilder;
