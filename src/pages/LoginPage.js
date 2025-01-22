import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { login } from "../services/api"; // API function
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await login(email, password);
            if (response.token) {
                localStorage.setItem("authToken", response.token);
                localStorage.setItem("admin", JSON.stringify(response.admin));
                navigate("/forms");
            } else {
                setError(response.message || "An unknown error occurred.");
            }
        } catch (err) {
            // Extract and display error message from the response
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // API-provided error message
            } else {
                setError(err.message || "An error occurred during login.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
