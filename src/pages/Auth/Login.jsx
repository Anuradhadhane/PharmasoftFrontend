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
import logo from "../../assets/logo-v.png";
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
    <MDBContainer fluid className="login-bg">
      <MDBRow className="login-wrapper justify-content-center align-items-center">

        {/* LOGO */}
        <MDBCol
          lg="4"
          md="5"
          className="d-flex justify-content-center align-items-center mb-4 mb-md-0"
        >
          <img src={logo} alt="Pharmasoft Logo" className="login-logo" />
        </MDBCol>

        {/* GLASS LOGIN CARD */}
        <MDBCol
          lg="4"
          md="6"
          className="d-flex justify-content-center align-items-center"
        >
          <MDBCard className="glass-card">
            <MDBCardBody>
              <h4 className="text-center mb-4">Admin Login</h4>

              <form onSubmit={handleLogin}>
                <MDBInput
                  className="mb-3"
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
                  LOGIN
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}
