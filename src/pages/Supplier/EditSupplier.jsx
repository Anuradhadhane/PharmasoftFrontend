import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../../api/supplierApi";
import "./supplier.css";

export default function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({ name: "", contact: "", email: "", address: "" });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await getSupplierById(id);
        setSupplier(res.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };
    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSupplier(id, supplier);
      navigate("/suppliers");
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Supplier</h2>
      <form onSubmit={handleSubmit}>
        {["name", "contact", "email", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={supplier[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">Update Supplier</button>
      </form>
    </div>
  );
}
