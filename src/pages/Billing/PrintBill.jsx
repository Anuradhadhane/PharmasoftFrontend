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

  if (!bill) return <h3>Loading...</h3>;

  return (
    <div>
      

      <div ref={componentRef}>
        <h2>Pharmacy Bill</h2>

        <p>Name: {bill.customer.name}</p>
        <p>Phone: {bill.customer.phone}</p>

        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bill.medicines.map((m, i) => (
              <tr key={i}>
                <td>{m.medicineName}</td>
                <td>{m.quantity}</td>
                <td>₹{m.price}</td>
                <td>₹{m.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total: ₹{bill.totalAmount}</h3>

        <button className="btn-success" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}
