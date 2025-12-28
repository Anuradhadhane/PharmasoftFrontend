// src/pages/Billing/BillingList.jsx
import React, { useEffect, useState } from "react";
import { getAllBills, deleteBill } from "../../api/billingApi";
import { Link } from "react-router-dom";
import "./billing.css";

const BillingList = () => {
  const [bills, setBills] = useState([]);

  const load = () => {
    getAllBills()
      .then((res) => setBills(res.data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete bill?")) return;
    deleteBill(id).then(() => load()).catch((e) => console.error(e));
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bills</h2>
        <Link to="/billing" className="btn btn-success">+ Create Bill</Link>
      </div>

      <table className="table table-bordered">
        <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.customer ? b.customer.name || "" : ""}</td>
              <td>₹{b.totalAmount}</td>
              <td>{b.date}</td>
              <td>
                <Link to={`/billing/view/${b.id}`} className="btn btn-sm btn-primary me-2">View</Link>
                <Link to={`/billing/update/${b.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList;
