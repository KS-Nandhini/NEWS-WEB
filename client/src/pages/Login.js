import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (user.role !== activeTab) {
        setError(`This account is not registered as ${activeTab}`);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      alert("Login successful!");

      if (user.role === "citizen") {
        navigate("/upload");
      } else if (user.role === "media") {
        navigate("/media-dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "1rem" }}>Login to TruthNet</h2>

      {/* Tabs */}
      <div style={tabStyle}>
        <button
          onClick={() => {
            setActiveTab("citizen");
            setError("");
          }}
          style={activeTab === "citizen" ? activeTabStyle : inactiveTabStyle}
        >
          Citizen
        </button>
        <button
          onClick={() => {
            setActiveTab("media");
            setError("");
          }}
          style={activeTab === "media" ? activeTabStyle : inactiveTabStyle}
        >
          Media
        </button>
      </div>

      <div style={dividerStyle}></div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleLogin} style={loginBtn}>Login</button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Signup link for Citizen */}
      {activeTab === "citizen" && (
        <p style={{ marginTop: "1rem" }}>
          New Citizen?{" "}
          <span
            onClick={() => navigate("/citizen-signup")}
            style={{ color: "#1e88e5", cursor: "pointer", textDecoration: "underline" }}
          >
            Signup here
          </span>
        </p>
      )}

      {/* Signup link for Media */}
      {activeTab === "media" && (
        <p style={{ marginTop: "1rem" }}>
          New Media user?{" "}
          <span
            onClick={() => navigate("/media-signup")}
            style={{ color: "#1e88e5", cursor: "pointer", textDecoration: "underline" }}
          >
            signup here
          </span>
        </p>
      )}
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
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const loginBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#1e88e5",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const tabStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "1rem",
};

const activeTabStyle = {
  backgroundColor: "#1e88e5",
  color: "white",
  border: "none",
  padding: "10px 20px",
  marginRight: "5px",
  borderRadius: "5px",
};

const inactiveTabStyle = {
  backgroundColor: "#eee",
  color: "#333",
  border: "none",
  padding: "10px 20px",
  marginRight: "5px",
  borderRadius: "5px",
};

const dividerStyle = {
  height: "2px",
  backgroundColor: "#ccc",
  margin: "10px 0 20px",
};
