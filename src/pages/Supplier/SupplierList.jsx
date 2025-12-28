import React, { useState, useEffect } from "react";
import { getAllSuppliers, deleteSupplier } from "../../api/supplierApi.js";
import { useNavigate } from "react-router-dom";
import "./supplier.css";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await getAllSuppliers();
      setSuppliers(res.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  return (
    <div className="supplier-container">
      <h2>Suppliers</h2>
      <button className="add-supplier-btn" onClick={() => navigate("/suppliers/add")}>
        Add Supplier
      </button>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}
            className={supplier.unread ? "unread" : ""}>
              <td>{supplier.name}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>
  <div className="action-btn-group">
    <button
      className="action-btn edit-btn"
      onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
    >
      Edit
    </button>

    <button
      className="action-btn delete-btn"
      onClick={() => handleDelete(supplier.id)}
    >
      Delete
    </button>
  </div>
</td>

               
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
