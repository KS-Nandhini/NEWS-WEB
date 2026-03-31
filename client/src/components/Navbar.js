import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left */}
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        {user?.role === "media" && (
          <Link to="/media-dashboard" style={linkStyle}>Media Panel</Link>
        )}
      </div>

      {/* Right */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>{user.username}</span>
            <button onClick={handleLogout} style={btn}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} style={btn}>Login</button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  margin: "0 10px",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const btn = {
  backgroundColor: "#1e88e5",
  border: "none",
  padding: "8px 16px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
