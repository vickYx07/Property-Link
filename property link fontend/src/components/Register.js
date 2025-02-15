import React, { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        username: "",
        password: "",
        role: "USER" // Default role
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation before sending request
        if (user.password.length !== 8) {
            alert("Password must be exactly 8 characters long.");
            return;
        }

        try {
            await registerUser(user);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={user.firstName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={user.lastName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="mobileNumber" 
                    placeholder="Mobile Number" 
                    value={user.mobileNumber} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="username" 
                    placeholder="Email" 
                    value={user.username} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password (8 characters)" 
                    value={user.password} 
                    onChange={handleChange} 
                    required 
                />

                {/* Role Selection Dropdown */}
                <select name="role" value={user.role} onChange={handleChange} required>
                    <option value="USER">User</option>
                    <option value="SELLER">Seller</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
