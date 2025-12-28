import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../../api/supplierApi";
import "./supplier.css";

export default function AddSupplier() {
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier(supplier);
    navigate("/suppliers");
  };

  return (
    <div className="form-container">
      <h2>Add Supplier</h2>

      <form className="supplier-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="contact" placeholder="Contact" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />

        <button type="submit" className="btn-primary">
          Add Supplier
        </button>
      </form>
    </div>
  );
}
