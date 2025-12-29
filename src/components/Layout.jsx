import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  // Track window width and update sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // always show sidebar on desktop
      } else {
        setSidebarOpen(false); // hide sidebar on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-layout">
      {/* SHOW MENU BUTTON ONLY ON MOBILE */}
      {isMobile && (
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="app-content"
        onClick={() => isMobile && setSidebarOpen(false)}
      >
        <Outlet />
      </main>
    </div>
  );
}
