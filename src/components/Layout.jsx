import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-layout">
     
      <Sidebar />    {/* OVERLAYS NAVBAR */}
      
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
