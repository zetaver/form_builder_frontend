// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Builder from "./components/FormBuilder/Builder";
import LoginPage from "./pages/LoginPage";
import FormsPage from "./pages/FormPage";
import Header from "./components/UI/Header";

const App = () => {
  // Check if the user is logged in by verifying the presence of an auth token
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <Router>
      <div className="builder-page">
        {/* Only show the Header if the user is logged in */}
        {isLoggedIn && <Header />}
        <Routes>
          {/* Redirect to /login if the user is not logged in */}
          <Route
            path="/forms"
            element={
              isLoggedIn ? <FormsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/builder"
            element={
              isLoggedIn ? (
                <DndProvider backend={HTML5Backend}>
                  <Builder />
                </DndProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/forms" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
