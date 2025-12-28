import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../api/customerApi";
import "./customer.css";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerById(id);
        setCustomer(res.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, customer);
      navigate("/customers");
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Customer</h2>
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
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
}
