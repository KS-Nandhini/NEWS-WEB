import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CitizenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // navigation hook

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      if (user.role === "citizen") {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/upload"); // go to upload page
      } else {
        alert("Only citizens can upload from this page.");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data || "Server error"));
    }
  };

  return (
    <div>
      <h2>Citizen Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
