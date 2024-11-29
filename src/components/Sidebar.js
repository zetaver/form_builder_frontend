import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import axios from "axios";

const ComponentCard = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: component, // The component data being dragged
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
        backgroundColor: "#fff",
        cursor: "grab",
      }}
    >
      {component.label}
    </div>
  );
};

const Sidebar = ({ onDrop }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Fetch components from backend
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
    <div>
      {components.map((component) => (
        <ComponentCard key={component._id} component={component} />
      ))}
    </div>
  );
};

export default Sidebar;
