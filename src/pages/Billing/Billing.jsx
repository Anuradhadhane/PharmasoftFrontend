import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BillForm.css";

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
      const response = await axios.post(
        "http://localhost:9000/api/bills",
        billPayload
      );

      // ✅ BACKEND RETURNS Bill WITH id
      const billId = response.data.id;
      setSavedBillId(billId);

      alert("Bill saved successfully");
    } catch (err) {
      console.error(err);
      alert("Bill saving failed");
    }
  };

  // ================= UI =================
  return (
    <div className="container">
      <h2>Billing</h2>

      {/* CUSTOMER */}
      <h4>Customer Details</h4>

      <input
        placeholder="Customer Name"
        value={customer.name}
        onChange={(e) =>
          setCustomer({ ...customer, name: e.target.value })
        }
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        placeholder="Phone"
        value={customer.phone}
        onChange={(e) =>
          setCustomer({ ...customer, phone: e.target.value })
        }
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

      <input
        placeholder="Email (optional)"
        value={customer.email}
        onChange={(e) =>
          setCustomer({ ...customer, email: e.target.value })
        }
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      {/* MEDICINE SEARCH */}
      <h4>Search Medicine</h4>
      <input
        placeholder="Type medicine name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {medicineList.length > 0 && (
        <ul>
          {medicineList.map((m) => (
            <li
              key={m.id}
              style={{ cursor: "pointer" }}
              onClick={() => addToBill(m)}
            >
              {m.name} - ₹{m.price}
            </li>
          ))}
        </ul>
      )}

      {/* BILL TABLE */}
      <table border="1" width="100%">
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

      <h3>Total Amount: ₹{totalAmount}</h3>

      <button className="btn-success" onClick={handleSaveBill}>Save Bill</button>

      {/* ✅ PRINT BILL BUTTON */}
      {savedBillId && (
        <button className="btn-success"
          
          onClick={() => navigate(`/print-bill/${savedBillId}`)}
        >
          Print Bill
        </button>
      )}
    </div>
  );
}
