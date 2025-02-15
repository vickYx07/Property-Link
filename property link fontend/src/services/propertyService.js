import axios from "axios";

const API_URL = "http://localhost:8080/api/properties"; // Change this if needed

// Add a property
export const addProperty = async (formData) => {
    return axios.post(`${API_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Get all properties
export const getAllProperties = async () => {
    return axios.get(`${API_URL}/all`);
};

// Get a single property by ID
export const getPropertyById = async (id) => {
    return axios.get(`${API_URL}/get/${id}`);
};

// Update a property
export const updateProperty = async (id, propertyData, username) => {
    return axios.put(`${API_URL}/update/${id}?username=${username}`, propertyData);
};

// Delete a property
export const deleteProperty = async (id, username) => {
    return axios.delete(`${API_URL}/delete/${id}?username=${username}`);
};
