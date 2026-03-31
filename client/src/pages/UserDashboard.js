import React from "react";

function UserDashboard() {
  return (
    <div style={container}>
      <h1 style={title}>👤 Citizen Dashboard</h1>

      <p style={subtitle}>
        Welcome! You can report news and track your submissions here.
      </p>

      <div style={cardContainer}>
        
        <div style={card}>
          <h3 style={cardTitle}>📝 Submit News</h3>
          <p style={cardText}>Upload news and media evidence.</p>
          <button style={button}>Go to Upload</button>
        </div>

        <div style={card}>
          <h3 style={cardTitle}>📊 My Reports</h3>
          <p style={cardText}>View status of your submitted news.</p>
          <button style={buttonSecondary}>View Reports</button>
        </div>

      </div>
    </div>
  );
}

/* ✅ Styles */

const container = {
  padding: "2rem",
  fontFamily: "Poppins, sans-serif",
  background: "#f5f7fb",
  minHeight: "100vh",
};

const title = {
  marginBottom: "10px",
  fontSize: "28px",
  fontWeight: "600",
};

const subtitle = {
  color: "#666",
  marginBottom: "30px",
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  flex: "1",
  minWidth: "250px",
  padding: "20px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
};

const cardTitle = {
  marginBottom: "10px",
  fontSize: "18px",
};

const cardText = {
  color: "#555",
  marginBottom: "15px",
};

const button = {
  padding: "8px 14px",
  border: "none",
  background: "#1565c0",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonSecondary = {
  ...button,
  background: "#2e7d32",
};

export default UserDashboard;