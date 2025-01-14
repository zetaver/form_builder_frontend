import React, { useState, useEffect } from "react";
import axios from "axios";

const FormSubmission = ({ formId }) => {
  const [formTemplate, setFormTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formId) {
      setError("Form ID is missing. Cannot fetch form.");
      setLoading(false);
      return;
    }

    const fetchFormTemplate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${formId}`
        );
        setFormTemplate(response.data);
      } catch (err) {
        setError("Unable to load the form. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFormTemplate();
  }, [formId]);

  const handleInputChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submissions", {
        formId,
        data: formData,
      });
      alert("Form submitted successfully!");
    } catch (err) {
      alert("Form submission failed. Please try again.");
    }
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>{formTemplate.title}</h3>
      <p>{formTemplate.description}</p>
      {formTemplate.components.map((component) => (
        <div key={component.key}>
          <label>{component.label}</label>
          <input
            type={component.type}
            placeholder={component.placeholder}
            value={formData[component.key] || ""}
            onChange={(e) => handleInputChange(e, component.key)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormSubmission;
