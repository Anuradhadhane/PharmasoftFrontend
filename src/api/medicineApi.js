// src/api/medicineApi.js
import axios from "./axiosConfig";

export const searchMedicine = (keyword) => {
  return axios.get("/medicine/search", {
    params: { keyword },
  });
};
