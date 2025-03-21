import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 

// Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/api/products", productData);
    return response.data;
  } catch (error) {
  
    console.error("Error creating product:", error);
    throw error;
  }
};

// Add a review to a product
export const addReview = async (productId, reviewData) => {
  try {
    const response = await api.post(`/api/products/${productId}/review`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export default api;
