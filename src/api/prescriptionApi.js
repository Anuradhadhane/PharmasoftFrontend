import axios from "axios";

const API_URL = "http://localhost:9000/api/prescriptions"; // adjust port/path if needed

export const getAllPrescriptions = () => axios.get(API_URL);

export const getPrescriptionById = (id) => axios.get(`${API_URL}/${id}`);

export const uploadPrescription = (data) => {
  const formData = new FormData();
  formData.append("patientName", data.patientName);
  formData.append("doctorName", data.doctorName);
  formData.append("file", data.file);

  return axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePrescription = (id) => axios.delete(`${API_URL}/${id}`);
