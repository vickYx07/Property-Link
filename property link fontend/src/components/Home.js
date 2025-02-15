import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/properties/all");
            const data = await response.json();
            setProperties(data.slice(0, 6)); // 
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to PropertyLink</h1>
                <p>Your one-stop solution for buying, selling, and managing properties.</p>
            </div>
            <div className="image-section">
                <img
                    src={require('../assets/property.jpg')} 
                    alt="Property Image"
                    className="hero-image"
                />
            </div>
            <div className="buttons">
                <Link to="/login"><button className="btn-login">Login</button></Link>
                <Link to="/register"><button className="btn-register">Register</button></Link>
            </div>

            {/* Featured Properties Section */}
            <h2>Featured Properties</h2>
            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <img src={property.imageUrl} alt={property.title} />
                            <h3>{property.title}</h3>
                            <p>Location: {property.location}</p>
                            <p>Price: ${property.price}</p>
                            <button onClick={() => navigate(`/property/${property.id}`)}>View Details</button>
                        </div>
                    ))
                ) : (
                    <p>Loading properties...</p>
                )}
            </div>

            {/* View More Button */}
            <button className="btn-view-more" onClick={() => navigate("/properties")}>View More Properties</button>
        </div>
    );
};

export default Home;
