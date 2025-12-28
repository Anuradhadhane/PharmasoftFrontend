import React, { useEffect, useState } from "react";
import { getAllMedicines, deleteMedicine } from "../../services/medicineService";
import { Link } from "react-router-dom";
import "./medicine.css"; // CSS import

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const res = await getAllMedicines();
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load medicines. Please check backend.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id);
        loadMedicines();
      } catch (err) {
        console.error(err);
        alert("Failed to delete medicine");
      }
    }
  };

  return (
    <div className="medicine-container">
      <h2>Medicines</h2>

      <Link to="/add-medicine">
        <button className="add-btn">Add Medicine</button>
      </Link>

      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id}
            className={m.unread ? "unread" : ""}>
              <td>{m.name}</td>
              <td>{m.brand}</td>
              <td>{m.quantity}</td>
              <td>₹{m.price}</td>
              <td>{m.expiryDate}</td>
              <td>
                <Link to={`/edit-medicine/${m.id}`}>
                  <button className="action-btn edit-btn">Edit</button>
                </Link>
                <button className="action-btn delete-btn" onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

