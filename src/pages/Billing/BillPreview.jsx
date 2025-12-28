// src/pages/BillPreview.js
import React from "react";

const BillPreview = ({ bill }) => {
  if (!bill || bill.medicines?.length === 0) {
    return <p>No bill to display.</p>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "600px", margin: "auto" }}>
      <h2>Bill Preview</h2>
      <p><strong>Patient Name:</strong> {bill.patientName}</p>
      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Medicine</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Quantity</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.medicines.map((med, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{med.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{med.quantity}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{med.price}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{med.price * med.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ₹{bill.medicines.reduce((sum, med) => sum + med.price * med.quantity, 0)}
      </h3>
    </div>
  );
};

export default BillPreview;
