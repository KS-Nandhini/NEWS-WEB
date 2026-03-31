import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function MediaDashboard() {
  const [tab, setTab] = useState("verify");
  const [pendingNews, setPendingNews] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "general",
    type: "normal",
  });

  const [mediaNews, setMediaNews] = useState({
    title: "",
    description: "",
    category: "general",
    type: "normal",
    file: null,
  });

  const token = localStorage.getItem("token");

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  // ✅ FETCH (FIXED with useCallback)
  const fetchPendingNews = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingNews(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (tab === "verify") {
      fetchPendingNews();
    }
  }, [tab, fetchPendingNews]);

  // ✅ VERIFY
  const handleVerify = async (id) => {
    await axios.put(
      `http://localhost:5000/api/news/verify/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPendingNews();
  };

  // ✅ REJECT
  const handleReject = async (id) => {
    await axios.put(
      `http://localhost:5000/api/news/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPendingNews();
  };

  // ✅ START EDIT
  const handleEdit = (news) => {
    setEditId(news._id);
    setEditData({
      title: news.title,
      description: news.description,
      category: news.category || "general",
      type: news.type || "normal",
    });
  };

  // ✅ SUBMIT EDIT
  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/news/edit-verify/${editId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Updated & Verified!");
      setEditId(null);
      fetchPendingNews();
    } catch (err) {
      console.error(err);
      alert("❌ Edit failed");
    }
  };

  // ✅ UPLOAD
  const handleMediaUpload = async () => {
    if (!mediaNews.title || !mediaNews.description || !mediaNews.file) {
      return alert("Fill all fields");
    }

    const formData = new FormData();
    formData.append("title", mediaNews.title);
    formData.append("description", mediaNews.description);
    formData.append("category", mediaNews.category);
    formData.append("type", mediaNews.type);
    formData.append("file", mediaNews.file);

    try {
      await axios.post("http://localhost:5000/api/news/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Uploaded!");

      setMediaNews({
        title: "",
        description: "",
        category: "general",
        type: "normal",
        file: null,
      });

    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* 🔵 Sidebar */}
      <aside style={sidebar}>
        <h2 style={{ marginBottom: "2rem" }}>📰 Media Panel</h2>

        <button onClick={() => setTab("verify")} style={tab === "verify" ? activeBtn : btn}>
          ✅ Verify News
        </button>

        <button onClick={() => setTab("upload")} style={tab === "upload" ? activeBtn : btn}>
          📝 Upload News
        </button>
        <br></br>
        <button onClick={handleLogout} style={logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      {/* 🟢 Main */}
      <main style={main}>

        {/* ✅ VERIFY */}
        {tab === "verify" && (
          <div>
            <h2>📋 Pending News</h2>

            {pendingNews.length === 0 ? (
              <p>No pending news</p>
            ) : (
              pendingNews.map((news) => (
                <div key={news._id} style={card}>
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <p>Category: {news.category}</p>
                  <p>Type: {news.type}</p>

                  {news.file && (
                    <img
                      src={`http://localhost:5000/uploads/${news.file}`}
                      alt="news"
                      style={{ width: "200px", borderRadius: "8px" }}
                    />
                  )}

                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => handleVerify(news._id)} style={acceptBtn}>
                      Accept
                    </button>

                    <button onClick={() => handleEdit(news)} style={editBtn}>
                      Edit
                    </button>

                    <button onClick={() => handleReject(news._id)} style={rejectBtn}>
                      Reject
                    </button>
                  </div>

                  {/* ✏️ EDIT FORM */}
                  {editId === news._id && (
                    <div style={editBox}>
                      <input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        style={input}
                      />

                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({ ...editData, description: e.target.value })
                        }
                        style={input}
                      />

                      <select
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        style={input}
                      >
                        <option value="general">General</option>
                        <option value="breaking">Breaking</option>
                        <option value="sports">Sports</option>
                        <option value="tech">Tech</option>
                        <option value="politics">Politics</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="environment">Environment</option>
                        <option value="crime">Crime</option>
                        <option value="entertainment">Entertainment</option>
                      </select>

                      <select
                        value={editData.type}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        style={input}
                      >
                        <option value="normal">Normal</option>
                        <option value="breaking">Breaking</option>
                      </select>

                      <button onClick={handleEditSubmit} style={uploadBtn}>
                        Save & Verify
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ✅ UPLOAD */}
        {tab === "upload" && (
          <div style={formCard}>
            <h2>📝 Upload News</h2>

            <input
              placeholder="Title"
              value={mediaNews.title}
              onChange={(e) =>
                setMediaNews({ ...mediaNews, title: e.target.value })
              }
              style={input}
            />

            <textarea
              placeholder="Description"
              value={mediaNews.description}
              onChange={(e) =>
                setMediaNews({ ...mediaNews, description: e.target.value })
              }
              style={input}
            />

            <select
              value={mediaNews.category}
              onChange={(e) =>
                setMediaNews({ ...mediaNews, category: e.target.value })
              }
              style={input}
            >
              <option value="general">General</option>
              <option value="breaking">Breaking</option>
              <option value="sports">Sports</option>
              <option value="tech">Tech</option>
              <option value="politics">Politics</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="crime">Crime</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <select
              value={mediaNews.type}
              onChange={(e) =>
                setMediaNews({ ...mediaNews, type: e.target.value })
              }
              style={input}
            >
              <option value="normal">Normal</option>
              <option value="breaking">Breaking</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setMediaNews({ ...mediaNews, file: e.target.files[0] })
              }
            />

            <button onClick={handleMediaUpload} style={uploadBtn}>
              Upload
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

/* 🎨 STYLES */

const sidebar = {
  width: "220px",
  background: "#1565c0",
  color: "white",
  padding: "1rem",
};

const btn = {
  background: "transparent",
  border: "none",
  color: "white",
  padding: "10px",
  paddingBottom:"10px",
  textAlign: "left",
  cursor: "pointer",
};

const activeBtn = {
  ...btn,
  background: "#0d47a1",
};

const logoutBtn = {
 background: "transparent",
  border: "none",
  color: "white",
  paddingTop: "20px",
  textAlign: "left",
  cursor: "pointer",
};

const main = {
  flex: 1,
  padding: "2rem",
  background: "#f5f7fb",
};

const card = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "10px",
  marginBottom: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const editBox = {
  marginTop: "15px",
  padding: "1rem",
  background: "#f1f5f9",
  borderRadius: "8px",
};

const formCard = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "500px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const acceptBtn = {
  background: "green",
  color: "white",
  marginRight: "10px",
};

const rejectBtn = {
  background: "red",
  color: "white",
};

const editBtn = {
  background: "orange",
  color: "white",
  marginRight: "10px",
};

const uploadBtn = {
  background: "#1565c0",
  color: "white",
  padding: "10px",
  marginTop: "10px",
};