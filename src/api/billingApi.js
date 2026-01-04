import axios from "./axiosConfig";

// Save Bill
export const addBill = (bill) =>
  axios.post("/bills/save", bill);

// Get All Bills
export const getAllBills = () =>
  axios.get("/bills");

// Get Bill By ID
export const getBillById = (id) =>
  axios.get(`/bills/${id}`);
