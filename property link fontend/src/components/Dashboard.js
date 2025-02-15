import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProperty } from "../services/propertyService";
import "../styles/Dashboard.css"; // Import external CSS

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newProperty, setNewProperty] = useState({
        username: user?.email || "",
        bhkType: "",
        depositPrice: "",
        location: "",
        description: "",
        ownerName: "",
        ownerContact: "",
        propertyStatus: "Available",
        image: null,
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchProperties();
    }, [user, navigate]);

    const fetchProperties = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/properties/all`);
            const data = await response.json();
            setProperties(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching properties:", error);
            setProperties([]);
        }
    };

    const handleChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setNewProperty({ ...newProperty, image: e.target.files[0] });
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProperty).forEach((key) => {
            formData.append(key, newProperty[key]);
        });

        try {
            const response = await fetch("http://localhost:8080/api/properties/create", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Property added successfully!");
                fetchProperties();
            } else {
                const errorMessage = await response.text();
                alert("Failed to add property: " + errorMessage);
            }
        } catch (error) {
            console.error("Error adding property:", error);
            alert("Failed to add property due to a network error");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await deleteProperty(id, user.email);
                alert("Property deleted successfully!");
                fetchProperties();
            } catch (error) {
                console.error(error);
                alert("Failed to delete property");
            }
        }
    };

    const filteredProperties = properties.filter((property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome, {user.email}!</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {/* Add Property Form */}
            <div className="property-form">
                <h2>Add New Property</h2>
                <form onSubmit={handleAddProperty}>
                    <input type="text" name="bhkType" placeholder="BHK Type (e.g., 2BHK)" onChange={handleChange} required />
                    <input type="number" name="depositPrice" placeholder="Deposit Price" onChange={handleChange} required />
                    <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                    <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
                    <input type="number" name="ownerContact" placeholder="Owner Contact" onChange={handleChange} required />
                    <select name="propertyStatus" onChange={handleChange}>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                    </select>
                    <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                    <button type="submit" className="submit-btn">Add Property</button>
                </form>
            </div>

            {/* Property Listings */}
            <h2 className="property-title">Your Properties</h2>
            <div className="property-list">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <div key={property.id} className="property-card">
                            <h3>{property.bhkType}</h3>
                            <p>Location: {property.location}</p>
                            <p>Price: ${property.depositPrice}</p>
                            <p className={`status ${property.propertyStatus.toLowerCase()}`}>
                                Status: {property.propertyStatus}
                            </p>
                            <div className="buttons">
                                <button onClick={() => navigate(`/edit-property/${property.id}`)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(property.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-properties">No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
