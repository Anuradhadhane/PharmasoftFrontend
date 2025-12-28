import axios from "axios";

const API_URL = "http://localhost:9000/api/supplier";

export const getAllSuppliers = () => axios.get(API_URL);

export const getSupplierById = (id) => axios.get(`${API_URL}/${id}`);

export const addSupplier = (supplier) => axios.post(API_URL, supplier);

export const updateSupplier = (id, supplier) => axios.put(`${API_URL}/${id}`, supplier);

export const deleteSupplier = (id) => axios.delete(`${API_URL}/${id}`);
