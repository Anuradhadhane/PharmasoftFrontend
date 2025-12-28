// src/App.js
import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC PAGES
import Splash from "./pages/Splash/Splash";
import Login from "./pages/Auth/Login";

// DASHBOARD
import Dashboard from "./pages/Dashboard/Dashboard";

// MEDICINE
import MedicineList from "./pages/Medicine/MedicineList";
import AddMedicine from "./pages/Medicine/AddMedicine";
import EditMedicine from "./pages/Medicine/EditMedicine";

// BILLING
import Billing from "./pages/Billing/Billing";
// import BillingList from "./pages/Billing/BillingList";
// import ViewBill from "./pages/Billing/ViewBill";
// import UpdateBill from "./pages/Billing/UpdateBill";
// import BillPreview from "./pages/Billing/BillPreview";
import PrintBill from "./pages/Billing/PrintBill";


// SUPPLIER
import SupplierList from "./pages/Supplier/SupplierList";
import AddSupplier from "./pages/Supplier/AddSupplier";
import EditSupplier from "./pages/Supplier/EditSupplier";

// CUSTOMER
import CustomerList from "./pages/Customer/CustomerList";
import AddCustomer from "./pages/Customer/AddCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";

// EXPIRY
import ExpiryAlert from "./pages/Expiry/ExpiryAlert";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        

        {/* 🌟 SPLASH (ONLY ONCE) */}
        <Route path="/splash" element={<Splash />} />

        {/* 🔓 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 PROTECTED AREA (SIDEBAR + NAVBAR) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* EXPIRY */}
          <Route path="/expiry" element={<ExpiryAlert />} />

          {/* MEDICINE */}
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/edit-medicine/:id" element={<EditMedicine />} />

          {/* BILLING */}
          <Route path="/billing" element={<Billing />} />
          {/* <Route path="/billing/list" element={<BillingList />} />
          <Route path="/billing/view/:id" element={<ViewBill />} />
          <Route path="/billing/update/:id" element={<UpdateBill />} />
          <Route path="/bill-preview" element={<BillPreview />} /> */}
          <Route path="/print-bill/:id" element={<PrintBill />} />


          {/* SUPPLIER */}
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/suppliers/add" element={<AddSupplier />} />
          <Route path="/suppliers/edit/:id" element={<EditSupplier />} />

          {/* CUSTOMER */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />
        </Route>

        {/* 🔁 DEFAULT */}
        <Route path="/" element={<Navigate to="/splash" />} />

      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App;
