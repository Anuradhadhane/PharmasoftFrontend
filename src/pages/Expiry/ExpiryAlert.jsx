import { useEffect, useState } from "react";
import axios from "axios";
import "./ExpiryAlert.css";

export default function ExpiryAlert() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    const res = await axios.get("http://localhost:9000/api/expiry/all");
    setAlerts(res.data);
  };

  const markRead = async (id) => {
    await axios.put(`http://localhost:9000/api/expiry/read/${id}`);
    loadAlerts();
  };

  return (
    <div className="expiry-container">
      <h2>⚠ Expiring Medicines</h2>

      {alerts.length === 0 ? (
        <p className="empty">No expiry alerts 🎉</p>
      ) : (
        <div className="table-responsive">
        <table className="expiry-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className={!a.read ? "unread" : ""}>
                <td>{a.medicineName}</td>
                <td>{a.expiryDate}</td>
                <td>
                  {!a.read ? (
                    <button onClick={() => markRead(a.id)}>Mark Read</button>
                  ) : (
                    "Read"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
