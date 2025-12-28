import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";
import logo from "../../assets/logo-v.png";   // 👈 ADD THIS
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <MDBContainer fluid className="background-radial-gradient overflow-hidden">
      <MDBRow className="d-flex justify-content-center align-items-center vh-100">

        {/* LEFT TEXT */}
        <MDBCol lg="6" className="text-white px-5 ps-5">
         
              {/* 👇 LOGO */}
              <img src={logo} alt="Pharmacy Logo" className="login-logo" />
            
         
         
        </MDBCol>

        {/* LOGIN CARD */}
        <MDBCol lg="4" className="position-relative">
          <div id="radius-shape-1"></div>
          <div id="radius-shape-2"></div>

          <MDBCard className="bg-glass">
            <MDBCardBody className="px-4 py-5 text-center">


              <h3 className="mb-4">Admin Login</h3>

              <form onSubmit={handleLogin}>
                <MDBInput
                  className="mb-4"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <MDBInput
                  className="mb-4"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <MDBBtn type="submit" className="w-100" color="info">
                  Login
                </MDBBtn>
              </form>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}
