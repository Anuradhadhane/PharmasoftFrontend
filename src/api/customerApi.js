// src/api/customerApi.js
import axios from "axios";

const API_URL = "http://localhost:9000/api/customers";

// Get all customers
export const getAllCustomers = () => axios.get(API_URL);

// Get customer by ID
export const getCustomerById = (id) => axios.get(`${API_URL}/${id}`);

// Add new customer
export const addCustomer = (customer) => axios.post(API_URL, customer);

// Update customer
export const updateCustomer = (id, customer) => axios.put(`${API_URL}/${id}`, customer);

// Delete customer
export const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`);
