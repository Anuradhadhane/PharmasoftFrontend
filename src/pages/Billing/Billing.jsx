import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BillForm.css";
import { addBill } from "../../api/billingApi";

export default function Billing() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [searchText, setSearchText] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [savedBillId, setSavedBillId] = useState(null);

  // ================= VALIDATION =================
  const validateCustomer = () => {
    const err = {};

    if (!customer.name.trim())
      err.name = "Customer name is required";

    if (!/^[6-9]\d{9}$/.test(customer.phone))
      err.phone = "Valid 10-digit phone required";

    if (
      customer.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
    )
      err.email = "Invalid email format";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= MEDICINE SEARCH =================
  useEffect(() => {
    if (!searchText || searchText.trim().length < 2) {
      setMedicineList([]);
      return;
    }

    axios
      .get("http://localhost:9000/api/medicine/search", {
        params: { keyword: searchText }
      })
      .then((res) => setMedicineList(res.data))
      .catch(() => setMedicineList([]));
  }, [searchText]);

  // ================= ADD TO BILL =================
  const addToBill = (medicine) => {
    const exists = billItems.find((i) => i.id === medicine.id);

    if (exists) {
      setBillItems(
        billItems.map((i) =>
          i.id === medicine.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setBillItems([...billItems, { ...medicine, quantity: 1 }]);
    }
  };

  // ================= UPDATE QTY =================
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setBillItems(
      billItems.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  // ================= TOTAL =================
  useEffect(() => {
    const total = billItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    setTotalAmount(total);
  }, [billItems]);

  // ================= SAVE BILL =================
  const handleSaveBill = async () => {
    if (!validateCustomer()) return;

    if (billItems.length === 0) {
      alert("Please add at least one medicine");
      return;
    }

    // ✅ BACKEND-MATCHED PAYLOAD
    const billPayload = {
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email
      },
      medicines: billItems.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity
      }))
    };

    
  try {
    const res = await addBill(billPayload);
    setSavedBillId(res.data.id);
    alert("Bill saved successfully");
  } catch (err) {
    console.error(err);
    alert("Bill save failed");
  }
};


  // ================= UI =================
 return (
  <div className="billing-page">
    <div className="billing-container">
      <h2 className="billing-title">Billing</h2>

      {/* CUSTOMER DETAILS */}
      <div className="section">
        <h4>Customer Details</h4>

        <div className="form-grid">
          <div>
            <input
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div>
            <input
              placeholder="Email (optional)"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* SEARCH MEDICINE */}
      <div className="section">
        <h4>Search Medicine</h4>

        <input
          className="search-input"
          placeholder="Type medicine name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {medicineList.length > 0 && (
          <ul className="search-list">
            {medicineList.map((m) => (
              <li key={m.id} onClick={() => addToBill(m)}>
                <span>{m.name}</span>
                <span>₹{m.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* BILL TABLE */}
      <div className="table-responsive">
        <table className="bill-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {billItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />
                </td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAL */}
      <div className="total-box">
        <span>Total Amount</span>
        <span>₹ {totalAmount}</span>
      </div>

      {/* ACTIONS */}
      <div className="billing-actions">
        <button className="primary-btn" onClick={handleSaveBill}>
          Save Bill
        </button>

        {savedBillId && (
          <button
            className="secondary-btn"
            onClick={() => navigate(`/print-bill/${savedBillId}`)}
          >
            Print Bill
          </button>
        )}
      </div>
    </div>
  </div>
);
}