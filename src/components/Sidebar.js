import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import axios from "axios";

const ComponentCard = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: component, // Data of the dragged component
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        cursor: "grab",
      }}
    >
      <strong>{component.label}</strong>
    </div>
  );
};

const Sidebar = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Fetch available components from the backend
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/components"
        );
        setComponents(response.data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
    fetchComponents();
  }, []);

  return (
    <div
      style={{ width: "300px", padding: "10px", borderRight: "1px solid #ddd" }}
    >
      <h3>Components</h3>
      {components.map((component) => (
        <ComponentCard key={component.key} component={component} />
      ))}
    </div>
  );
};

export default Sidebar;
