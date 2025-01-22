import React, { useState } from "react";
import "../styles/Formspage.css";

const FormsPage = () => {
    const [formName, setFormName] = useState(""); // State for form name
    const [forms, setForms] = useState([]); // State for list of forms

    const handleCreateForm = () => {
        if (formName.trim() !== "") {
            setForms([...forms, { name: formName }]);
            setFormName(""); // Clear the input field
        }
    };

    return (
        <div className="forms-screen">
            <h1>Create a New Form</h1>
            {/* Text Field to Create a Form */}
            <div className="form-creator">
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter form name..."
                    className="form-input"
                />
                <button onClick={handleCreateForm} className="create-button">
                    Create Form
                </button>
            </div>

            {/* List of Forms */}
            <div className="forms-list">
                {forms.length > 0 ? (
                    forms.map((form, index) => (
                        <div key={index} className="form-card">
                            <h3>{form.name}</h3>
                            <p>Created at: {new Date().toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No forms created yet.</p>
                )}
            </div>
        </div>
    );
};

export default FormsPage;
