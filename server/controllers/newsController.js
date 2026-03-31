import News from "../models/News.js";
import User from "../models/User.js";

// =====================
// ✅ Upload News
// =====================
export const uploadNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const filePath = req.file?.filename;

    // Fetch user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Strong role check
    const role = String(user.role).trim().toLowerCase();

    // Decide status
    let status = "pending";
    let approvedBy = null;

    if (role === "media") {
      status = "approved"; // ✅ media auto approved
      approvedBy = user._id;
    }

    console.log("USER ROLE:", role);
    console.log("FINAL STATUS:", status);

    const news = new News({
      title,
      description,
      category,
      file: filePath,
      status,
      uploadedBy: user._id,
      approvedBy,
    });

    await news.save();

    res.status(201).json({
      message: "News submitted successfully",
      news,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// =====================
// ✅ Get My Uploads
// =====================
export const getMyUploads = async (req, res) => {
  try {
    const news = await News.find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's news" });
  }
};

// =====================
// ✅ Get Pending News (ONLY Citizen)
// =====================
export const getPendingNews = async (req, res) => {
  try {
    const news = await News.find({ status: "pending" })
      .populate("uploadedBy", "username email role");

    // Only citizen news
    const filteredNews = news.filter(
      (n) => n.uploadedBy && n.uploadedBy.role === "citizen"
    );

    res.json(filteredNews);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// ✅ Approve News
// =====================
export const verifyNews = async (req, res) => {
  try {
    await News.findByIdAndUpdate(req.params.id, {
      status: "approved",
      approvedBy: req.user.id,
    });

    res.json({ message: "News approved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// ❌ Reject News
// =====================
export const rejectNews = async (req, res) => {
  try {
    const { reason } = req.body;

    await News.findByIdAndUpdate(req.params.id, {
      status: "rejected",
      rejectionReason: reason,
      approvedBy: req.user.id,
    });

    res.json({ message: "News rejected successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// ✏️ Edit & Approve
// =====================
export const editAndVerifyNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    await News.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status: "approved",
      approvedBy: req.user.id,
    });

    res.json({ message: "News edited and approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// 🌍 Get Approved News (HOME)
// =====================
export const getVerifiedNews = async (req, res) => {
  try {
    const news = await News.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "username");

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch approved news" });
  }
};

// =====================
// 👥 Get Citizen Reporters
// =====================
export const getReporters = async (req, res) => {
  try {
    const reporters = await User.find({ role: "citizen" });

    const reporterStats = await Promise.all(
      reporters.map(async (r) => {
        const newsCount = await News.countDocuments({
          uploadedBy: r._id,
        });

        return {
          username: r.username,
          email: r.email,
          designation: "Citizen Reporter",
          totalNews: newsCount,
        };
      })
    );

    res.json(reporterStats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reporters" });
  }
};