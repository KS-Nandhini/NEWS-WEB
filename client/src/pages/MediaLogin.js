import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MediaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Check role is media
      if (res.data.user.role !== "media") {
        alert("Not a media account");
        return;
      }

      // Save token
      localStorage.setItem("token", res.data.token);
      alert("Media login successful");

      // Navigate to media dashboard
      navigate("/media-dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Media Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login as Media</button>
      </form>
    </div>
  );
}
