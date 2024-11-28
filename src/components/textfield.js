import React from "react";
//
const TextInput = ({ component, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={component.key}
      >
        {component.label}
      </label>
      <input
        type="text"
        id={component.key}
        placeholder={component.placeholder}
        defaultValue={component.defaultValue}
        required={component.required}
        onChange={(e) =>
          handleInputChange(component.key, "defaultValue", e.target.value)
        }
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />
      {component.tooltip && (
        <p className="text-xs text-gray-500 mt-1">{component.tooltip}</p>
      )}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">
          Label:
        </label>
        <input
          type="text"
          value={component.label}
          onChange={(e) =>
            handleInputChange(component.key, "label", e.target.value)
          }
          className="w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">
          Placeholder:
        </label>
        <input
          type="text"
          value={component.placeholder}
          onChange={(e) =>
            handleInputChange(component.key, "placeholder", e.target.value)
          }
          className="w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default TextInput;
