import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#e3f2fd"
    }}>
      <div style={{
        background: "#fff",
        padding: 40,
        borderRadius: 10,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        width: 320
      }}>
        <h2 style={{ textAlign: "center" }}>Teacher Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 20, padding: 8 }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: "#1976d2",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
