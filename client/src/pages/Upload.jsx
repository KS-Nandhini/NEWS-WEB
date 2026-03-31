import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!token) return alert("Please login first!");
    if (!title || !description || !file)
      return alert("Please fill all fields and select a file.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);

    try {
      setUploading(true);
      await axios.post("http://localhost:5000/api/news/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ News submitted successfully!");
      setTitle("");
      setDescription("");
      setCategory("general");
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setMessage("❌ Failed to submit news.");
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* ✅ SAME SIDEBAR STYLE */}
      <aside style={sidebar}>
        <h2 style={logo}>📰 Dashboard</h2>

        <button style={activeSide}>📤 Upload</button>

        <button onClick={handleLogout} style={normalSide}>
          🚪 Logout
        </button>
      </aside>

      {/* ✅ MAIN CONTENT (same style as media dashboard) */}
      <main style={main}>
        <h2>Upload News</h2>

        <div style={formBox}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...input, height: "100px" }}
          />

          

          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br/><br/>
          <button onClick={handleUpload} style={uploadBtn}>
            {uploading ? "Uploading..." : "Submit"}
          </button>

          {message && <p>{message}</p>}
        </div>
      </main>
    </div>
  );
}

/* ✅ SAME STYLE PATTERN AS MEDIA DASHBOARD */

const sidebar = {
  width: "200px",
  background: "#1565c0",
  color: "white",
  padding: "1rem",
};

const logo = {
  textAlign: "center",
};

const normalSide = {
  background: "transparent",
  color: "white",
  border: "none",
  padding: "10px",
  display: "block",
  width: "100%",
  textAlign: "left",
};

const activeSide = {
  ...normalSide,
  background: "#0d47a1",
};

const main = {
  flex: 1,
  padding: "2.5rem",
  background: "#f5f7fb",
};

const formBox = {
  Width: "1000px",
  background: "#fff",
  padding: "50px",
  borderRadius: "10px",
  alignItems:"center",
  marginTop: "20px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const uploadBtn = {
  padding: "10px",
  background: "#1565c0",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};