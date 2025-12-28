import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../api/customerApi";
import "./customer.css";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer(customer);
      navigate("/customers");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={customer.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input type="text" name="phone" className="form-control" value={customer.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={customer.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
}
