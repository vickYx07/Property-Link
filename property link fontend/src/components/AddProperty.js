import React, { useState } from "react";
import { addProperty } from "../services/propertyService";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        username: "", // Seller's username
        bhkType: "",
        depositPrice: "",
        location: "",
        description: "",
        ownerName: "",
        ownerContact: "",
        propertyStatus: "Available",
        image: null,
    });

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProperty({ ...property, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(property).forEach((key) => {
            formData.append(key, property[key]);
        });

        try {
            await addProperty(formData);
            alert("Property added successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to add property");
        }
    };

    return (
        <div>
            <h2>Add Property</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Seller Username" onChange={handleChange} required />
                <input type="text" name="bhkType" placeholder="BHK Type (e.g., 2BHK)" onChange={handleChange} required />
                <input type="number" name="depositPrice" placeholder="Deposit Price" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
                <input type="number" name="ownerContact" placeholder="Owner Contact" onChange={handleChange} required />
                <select name="propertyStatus" onChange={handleChange}>
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                </select>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
