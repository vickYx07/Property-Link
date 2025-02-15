import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProperty.css"; 

const EditProperty = () => {
    const { id } = useParams(); // Get property ID from URL
    const navigate = useNavigate();
    const [property, setProperty] = useState({
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
        fetchPropertyDetails();
    }, []);

    const fetchPropertyDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/properties/${id}`);
            const data = await response.json();
            setProperty(data);
        } catch (error) {
            console.error("Error fetching property details:", error);
        }
    };

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProperty({ ...property, image: e.target.files[0] });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(property).forEach((key) => {
            formData.append(key, property[key]);
        });

        try {
            const response = await fetch(`http://localhost:8080/api/properties/update/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                alert("Property updated successfully!");
                navigate("/dashboard");
            } else {
                const errorMessage = await response.text();
                alert("Failed to update property: " + errorMessage);
            }
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Failed to update property due to a network error");
        }
    };

    return (
        <div className="edit-container">
            <h2>Edit Property</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="bhkType" value={property.bhkType} onChange={handleChange} required />
                <input type="number" name="depositPrice" value={property.depositPrice} onChange={handleChange} required />
                <input type="text" name="location" value={property.location} onChange={handleChange} required />
                <input type="text" name="ownerName" value={property.ownerName} onChange={handleChange} required />
                <input type="number" name="ownerContact" value={property.ownerContact} onChange={handleChange} required />
                <select name="propertyStatus" value={property.propertyStatus} onChange={handleChange}>
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                </select>
                <textarea name="description" value={property.description} onChange={handleChange}></textarea>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
};

export default EditProperty;
