// src/pages/Billing/ViewBill.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:9000";

const ViewBill = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  const fetchBill = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/bills/${id}`);
      setBill(res.data);
    } catch (err) { console.error(err); }
  }, [id]);

  useEffect(() => { fetchBill(); }, [fetchBill]);

  if (!bill) return <div className="container p-4">Loading...</div>;

  return (
    <div className="container p-4">
      <h2>Bill #{bill.id}</h2>
      <p><b>Customer:</b> {bill.customer ? bill.customer.name : ""}</p>
      <p><b>Date:</b> {bill.date}</p>

      <table className="table table-bordered">
        <thead><tr><th>Medicine</th><th>Price</th><th>Qty</th><th>Amount</th></tr></thead>
        <tbody>
          {bill.medicines.map((m, i) => (
            <tr key={i}>
              <td>{m.medicineName}</td>
              <td>₹{m.price}</td>
              <td>{m.quantity}</td>
              <td>₹{m.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ₹{bill.totalAmount}</h4>

      <div>
        <Link to="/billing/list" className="btn btn-secondary me-2">Back</Link>
        <Link to={`/billing/print/${bill.id}`} className="btn btn-primary">Print</Link>
      </div>
    </div>
  );
};

export default ViewBill;
