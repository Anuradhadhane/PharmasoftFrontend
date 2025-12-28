import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPills,
  FaUsers,
  FaTruck,
  FaFileInvoice,
  FaBell,
  FaSignOutAlt
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../assets/logo-h.png";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Expiry Alerts", path: "/expiry", icon: <FaBell /> },
    { name: "Medicines", path: "/medicines", icon: <FaPills /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
    { name: "Customers", path: "/customers", icon: <FaUsers /> },
    { name: "Billing", path: "/billing", icon: <FaFileInvoice /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-header">
        <img src={logo} alt="PharmaSoft" />
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* LOGOUT */}
      <div className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </aside>
  );
}
