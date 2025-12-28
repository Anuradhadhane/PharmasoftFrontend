import axios from "axios";

const API_URL = "http://localhost:9000/api/expiry-alerts";

export const getAllExpiryAlerts = () => axios.get(API_URL);

export const getExpiryAlertById = (id) => axios.get(`${API_URL}/${id}`);

export const addExpiryAlert = (alert) => axios.post(API_URL, alert);

export const updateExpiryAlert = (id, alert) => axios.put(`${API_URL}/${id}`, alert);

export const deleteExpiryAlert = (id) => axios.delete(`${API_URL}/${id}`);
