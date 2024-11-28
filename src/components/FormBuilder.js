import React, { useEffect, useState } from "react";
import axios from "axios";
import TextInput from "./textfield"; // Import the individual component

const FormBuilder = () => {
  const [components, setComponents] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [updatedComponents, setUpdatedComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/components"
        );
        setComponents(response.data);
        setUpdatedComponents(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
    fetchComponents();
  }, []);

  const handleInputChange = (key, field, value) => {
    setUpdatedComponents((prev) =>
      prev.map((component) =>
        component.key === key ? { ...component, [field]: value } : component
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: formTitle,
      description: formDescription,
      components: updatedComponents,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forms",
        formData
      );
      console.log("Form created successfully:", response.data);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const renderComponent = (component) => {
    switch (component.type) {
      case "text":
        return (
          <TextInput
            key={component.key}
            component={component}
            handleInputChange={handleInputChange}
          />
        );
      // Add cases for other component types as needed
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 shadow-md rounded-md bg-white"
    >
      <h2 className="text-2xl font-bold mb-4">Dynamic Form Builder</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Form Title:
        </label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Form Description:
        </label>
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {updatedComponents.map((component) => renderComponent(component))}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Form
      </button>
    </form>
  );
};

export default FormBuilder;
//
