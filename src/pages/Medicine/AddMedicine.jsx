import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../../services/medicineService";
import "./medicine.css";

export default function AddMedicine() {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    brand: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(medicine);
      navigate("/medicines");
    } catch (err) {
      console.error(err);
      alert("Failed to add medicine. Please check backend.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Medicine</h2>
      <form className="medicine-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Medicine Name" onChange={handleChange} required />
        <input name="brand" placeholder="Brand" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="date" name="expiryDate" onChange={handleChange} required />
        <button type="submit" className="btn-primary">Add</button>
      </form>
    </div>
  );
}
