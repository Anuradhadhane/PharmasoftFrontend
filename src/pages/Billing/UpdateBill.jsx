// src/pages/Billing/UpdateBill.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getBillById, updateBill } from "../../api/billingApi";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:9000";
const MED_SEARCH = `${API_BASE}/medicines/search`;

const UpdateBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchBill = useCallback(async () => {
    try {
      const res = await getBillById(id);
      const bill = res.data;
      setCustomerName(bill.customer ? bill.customer.name : "");
      setItems(bill.medicines || []);
      setTotalAmount(bill.totalAmount || 0);
    } catch (err) { console.error(err); }
  }, [id]);

  useEffect(() => { fetchBill(); }, [fetchBill]);

  // search
  useEffect(() => {
    const q = searchText.trim();
    if (!q) { setSearchResults([]); return; }
    const ct = axios.CancelToken.source();
    axios.get(`${MED_SEARCH}?name=${encodeURIComponent(q)}`, { cancelToken: ct.token })
      .then(res => setSearchResults(res.data || []))
      .catch(err => { if (!axios.isCancel(err)) console.error(err); });
    return () => ct.cancel();
  }, [searchText]);

  const selectMedicine = (med) => {
    const next = [...items, { medicineId: med.id, medicineName: med.name, quantity: 1, price: med.price, amount: med.price }];
    setItems(next); recalc(next);
    setSearchText(""); setSearchResults([]);
  };

  const changeQty = (idx, q) => {
    if (q < 1) q = 1;
    const next = [...items]; next[idx].quantity = q; next[idx].amount = q * next[idx].price; setItems(next); recalc(next);
  };

  const removeItem = (idx) => { const next = items.slice(); next.splice(idx,1); setItems(next); recalc(next); };

  const recalc = (list) => setTotalAmount(list.reduce((s,i) => s + (i.amount||0), 0));

  const handleSave = async () => {
    const payload = { customer: null, date: new Date().toISOString().split("T")[0], medicines: items.map(i => ({ medicineId: i.medicineId, quantity: i.quantity })) };
    try {
      await updateBill(id, payload);
      alert("Updated");
      navigate("/billing/list");
    } catch (err) { console.error(err); alert("Failed"); }
  };

  return (
    <div className="container p-4">
      <h2>Update Bill #{id}</h2>

      <div className="mb-3">
        <label>Customer name</label>
        <input className="form-control" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
      </div>

      <div className="mb-3 position-relative">
        <label>Search medicine</label>
        <input className="form-control" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
        {searchResults.length>0 && <ul className="list-group position-absolute w-100" style={{zIndex:100}}>
          {searchResults.map(m=>(
            <li key={m.id} className="list-group-item list-group-item-action" onClick={()=>selectMedicine(m)}>{m.name} — ₹{m.price}</li>
          ))}
        </ul>}
      </div>

      <table className="table table-bordered mt-3">
        <thead><tr><th>Medicine</th><th>Qty</th><th>Price</th><th>Amount</th><th></th></tr></thead>
        <tbody>
          {items.map((it, idx)=>(
            <tr key={idx}>
              <td>{it.medicineName}</td>
              <td><input type="number" min="1" className="form-control" value={it.quantity} onChange={(e)=>changeQty(idx, Number(e.target.value))} /></td>
              <td>₹{it.price}</td>
              <td>₹{it.amount}</td>
              <td><button className="btn btn-sm btn-danger" onClick={()=>removeItem(idx)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ₹{totalAmount}</h4>

      <div>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <Link to="/billing/list" className="btn btn-secondary ms-2">Back</Link>
      </div>
    </div>
  );
};

export default UpdateBill;
