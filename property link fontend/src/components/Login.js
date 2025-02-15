import React, { useState } from "react";
import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";  

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ 
        username: "", 
        password: "", 
        role: "USER"  // Default role selection
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(credentials);
            if (response.data) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(response.data)); 
                navigate("/dashboard");
            } else {
                alert("Invalid login response!");
            }
        } catch (error) {
            alert("Invalid email, password, or role!");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="username" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                
                {/* Role Selection Dropdown */}
                <select name="role" value={credentials.role} onChange={handleChange} required>
                    <option value="USER">User</option>
                    <option value="SELLER">Seller</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
