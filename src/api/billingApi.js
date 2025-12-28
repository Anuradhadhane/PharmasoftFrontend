import axios from "axios";

const API_URL = "http://localhost:9000/bills";

export const addBill = (bill) => axios.post(API_URL, bill);

export const getAllBills = () => axios.get(API_URL);

export const getBillById = (id) => axios.get(`${API_URL}/${id}`);

export const deleteBill = (id) => axios.delete(`${API_URL}/${id}`);

export const updateBill = (id, bill) => axios.put(`${API_URL}/${id}`, bill);