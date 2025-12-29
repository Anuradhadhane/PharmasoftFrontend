import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./billing.css";

export default function PrintBill() {
  const { id } = useParams();
  const componentRef = useRef();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/bills/${id}`)
      .then(res => setBill(res.data))
      .catch(() => alert("Failed to load bill"));
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  if (!bill) return <h3 className="loading">Loading...</h3>;

  return (
    <div className="bill-page">
      <div className="bill-actions">
        <button onClick={handlePrint} className="print-btn">
          🖨 Print Bill
        </button>
      </div>

      <div className="bill-container" ref={componentRef}>
        {/* HEADER */}
        <div className="bill-header">
          <h1>PHARMACY BILL</h1>
          <p className="subtitle">Thank you for your purchase</p>
        </div>

        {/* CUSTOMER INFO */}
        <div className="bill-info">
          <div>
            <strong>Customer Name:</strong> {bill.customer.name}
          </div>
          <div>
            <strong>Phone:</strong> {bill.customer.phone}
          </div>
          <div>
            <strong>Bill ID:</strong> #{bill.id}
          </div>
        </div>

        {/* TABLE */}
        <table className="bill-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bill.medicines.map((m, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{m.medicineName}</td>
                <td>{m.quantity}</td>
                <td>{m.price}</td>
                <td>{m.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="bill-total">
          <span>Total Amount</span>
          <span>₹ {bill.totalAmount}</span>
        </div>

        {/* FOOTER */}
        <div className="bill-footer">
          <p>✔ Medicines once sold cannot be returned</p>
          <p>✔ Get well soon!</p>
        </div>
      </div>
    </div>
  );
}
