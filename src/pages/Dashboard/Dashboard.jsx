import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* HERO IMAGE */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <h1>Dashboard</h1>
          <p>Medicine overview & statistics</p>
        </div>
      </div>

      {/* OVERLAPPING GLASS CONTAINER */}
      <div className="dashboard-wrapper">
        <div className="dashboard-glass">

          {/* STATS */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="stat-box">
                <span>Total Medicines</span>
                <h2>142</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-box danger">
                <span>Expired</span>
                <h2>8</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-box">
                <span>Customers</span>
                <h2>321</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-box">
                <span>Suppliers</span>
                <h2>19</h2>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="content-box">
                <h4>Expiry Alerts</h4>
                <ul>
                  <li>Paracetamol – 5 days left</li>
                  <li>Amoxicillin – 7 days left</li>
                  <li>Vitamin C – 10 days left</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="content-box">
                <h4>Recent Activity</h4>
                <ul>
                  <li>Bill generated for customer #183</li>
                  <li>Stock updated – Paracetamol</li>
                  <li>New supplier added</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
