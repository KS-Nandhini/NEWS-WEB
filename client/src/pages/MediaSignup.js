import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MediaSignup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "media",
    designation: "", // Added designation
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Media signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.response?.data || "Server error"));
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "1rem", color: "#1e88e5" }}>Media Signup</h2>

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={inputStyle}
      />

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={inputStyle}
      />

      <select
        value={form.designation}
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
        style={inputStyle}
      >
        <option value="">Select Designation</option>
        <option value="Reporter">Reporter</option>
        <option value="Journalist">Journalist</option>
        <option value="Editor">Editor</option>
        <option value="Field Correspondent">Field Correspondent</option>
        <option value="Anchor">News Anchor</option>
        <option value="Photojournalist">Photojournalist</option>
      </select>

      <button onClick={handleSignup} style={buttonStyle}>
        Signup
      </button>
    </div>
  );
}

// Styles
const containerStyle = {
  width: "350px",
  margin: "4rem auto",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1e88e5",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
