import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const PrintBill = () => {
  const location = useLocation();
  const billData = location.state;   // GET DATA FROM BILLING PAGE
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (!billData) return <h2>No bill data found!</h2>;

  return (
    <div style={{ padding: "40px" }}>
      
      {/* PRINT AREA */}
      <div ref={printRef} style={{ width: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>PHARMACY BILL</h2>
        <hr />

        <p><strong>Name:</strong> {billData.patientName}</p>
        <p><strong>Phone:</strong> {billData.phone}</p>
        <p><strong>Email:</strong> {billData.email}</p>
        <p><strong>Date:</strong> {billData.billDate}</p>

        <table border="1" width="100%" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {billData.billItems.map((item, i) => (
              <tr key={i}>
                <td>{item.medicineName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: "10px" }}>Total: ₹{billData.totalBill}</h3>
      </div>

      {/* PRINT BUTTON */}
      <button 
        onClick={handlePrint} 
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Print
      </button>
    </div>
  );
};

export default PrintBill;
