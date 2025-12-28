import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedicineById, updateMedicine } from "../../services/medicineService";
import "./medicine.css";

export default function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    brand: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  useEffect(() => {
    const loadMedicine = async () => {
      try {
        const res = await getMedicineById(id);
        setMedicine(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load medicine");
      }
    };
    loadMedicine();
  }, [id]);

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedicine(id, medicine);
      navigate("/medicines");
    } catch (err) {
      console.error(err);
      alert("Failed to update medicine");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Medicine</h2>
      <form className="medicine-form" onSubmit={handleSubmit}>
        <input name="name" value={medicine.name} onChange={handleChange} required />
        <input name="brand" value={medicine.brand} onChange={handleChange} required />
        <input type="number" name="quantity" value={medicine.quantity} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" value={medicine.price} onChange={handleChange} required />
        <input type="date" name="expiryDate" value={medicine.expiryDate} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Update</button>
      </form>
    </div>
  );
}
