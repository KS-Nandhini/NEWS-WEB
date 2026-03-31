import { useState } from "react";
import axios from "axios";
import "./CitizenSignup.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "citizen" });

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup success! Now login.");
    } catch (err) {
      alert("Signup failed: " + err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="citizen">Citizen</option>
          <option value="media">Media</option>
        </select>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}
