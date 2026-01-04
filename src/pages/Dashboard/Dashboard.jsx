import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState({ expiryAlerts: [], recentActivity: [] });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await axios.get("http://localhost:9000/api/dashboard/stats");
      const alertsRes = await axios.get("http://localhost:9000/api/dashboard/alerts");

      setStats(statsRes.data);
      setAlerts(alertsRes.data);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <h1>Dashboard</h1>
          <p>Medicine overview & statistics</p>
        </div>
      </div>

      <div className="dashboard-wrapper">
        <div className="dashboard-glass">

          {/* STATS */}
          <div className="row g-4 mb-4">
            <Stat title="Total Medicines" value={stats.totalMedicines} />
            <Stat title="Expired" value={stats.expiredMedicines} danger />
            <Stat title="Customers" value={stats.customers} />
            <Stat title="Suppliers" value={stats.suppliers} />
          </div>

          {/* CONTENT */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="content-box">
                <h4>Expiry Alerts</h4>
                <ul>
                  {alerts.expiryAlerts.map(med => (
                    <li key={med.id}>
                      {med.name} – expires on {med.expiryDate}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="content-box">
                <h4>Recent Activity</h4>
                <ul>
                  {alerts.recentActivity.map(bill => (
                    <li key={bill.id}>
                      Bill #{bill.id} generated – ₹{bill.totalAmount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, danger }) {
  return (
    <div className="col-md-3">
      <div className={`stat-box ${danger ? "danger" : ""}`}>
        <span>{title}</span>
        <h2>{value ?? 0}</h2>
      </div>
    </div>
  );
}
