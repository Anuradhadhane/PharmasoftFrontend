import React from "react";
import "./PageWrapper.css";

export default function PageWrapper({ title, icon, children }) {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        {icon && <span className="page-icon">{icon}</span>}
        <h2>{title}</h2>
      </div>

      <div className="page-content">
        {children}
      </div>
    </div>
  );
}
