import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../../api/customerApi";
import { useNavigate } from "react-router-dom";
import "./customer.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers();
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this customer?")) return;

  try {
    await deleteCustomer(id);

    // Update UI immediately
    setCustomers((prev) =>
      prev.filter((c) => c.customerId !== id)
    );

  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};


return (
  <div className="customer-page">
    <div className="customer-container">
      <h2>Customer List</h2>

      <button
        className="add-btn"
        onClick={() => navigate("/add-customer")}
      >
        Add Customer
      </button>

      <div className="table-responsive">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.customerId}>
                <td>{c.customerId}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>
                  <div className="action-cell">
                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        navigate(`/edit-customer/${c.customerId}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() =>
                        handleDelete(c.customerId)
                      }
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

    </div>
  </div>
);
}