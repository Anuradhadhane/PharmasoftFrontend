import "./Splash.css";
import logo from "../../assets/logo-v.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash">
      <img src={logo} alt="Pharma Logo" className="splash-logo" />
    </div>
  );
}
