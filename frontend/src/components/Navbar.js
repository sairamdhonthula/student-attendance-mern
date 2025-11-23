import React from "react";
import Navbar from "../components/Navbar";


function Navbar() {
  return (
    <div style={{
      background: "#1a237e",
      color: "white",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3>🎓 Attendance Management System</h3>
      <button
        style={{ background: "#f44336", color: "white", border: "none", padding: "8px 15px" }}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
