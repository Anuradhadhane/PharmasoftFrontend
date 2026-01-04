import { useEffect, useState } from "react";
import axios from "axios";
import "./ExpiryAlert.css";

export default function ExpiryAlert() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  // 🔹 Fetch unread expiry alerts
  const loadAlerts = async () => {
    const res = await axios.get(
      "http://localhost:9000/api/expiry/alerts"
    );
    setAlerts(res.data);
  };

  // 🔹 Mark alert as read
  const markRead = async (id) => {
    await axios.put(
      `http://localhost:9000/api/expiry/mark-read/${id}`
    );

    // remove from UI instantly
    setAlerts(alerts.filter(alert => alert.id !== id));
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} className="unread">
                  <td>
                    <strong>{a.name}</strong>
                    <div className="small text-muted">
                      {a.brand}
                    </div>
                  </td>

                  <td>{a.expiryDate}</td>

                  <td>
                    <button
                      className="mark-btn"
                      onClick={() => markRead(a.id)}
                    >
                      Mark Read
                    </button>
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
