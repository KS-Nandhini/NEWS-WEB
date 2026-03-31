import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";
import { getReporters } from "../controllers/newsController.js";

import {
  uploadNews,
  getPendingNews,
  verifyNews,
  rejectNews,
  editAndVerifyNews,
  getVerifiedNews,
} from "../controllers/newsController.js";

import User from "../models/User.js";
import News from "../models/News.js";

const router = express.Router();

// ✅ File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Citizen uploads news
router.post("/upload", verifyToken, upload.single("file"), uploadNews);

// ✅ Media verification routes
router.get("/pending", verifyToken, getPendingNews);
router.put("/verify/:id", verifyToken, verifyNews);
router.put("/reject/:id", verifyToken, rejectNews);
router.put("/edit-verify/:id", verifyToken, editAndVerifyNews);

// ✅ Public access
router.get("/verified", getVerifiedNews);

// ✅ Reporter listing
router.get("/reporters", verifyToken, getReporters);

// ✅ Media profile stats (used in dashboard)
router.get("/media/stats", verifyToken, async (req, res) => {
  try {
    const username = req.user.username;

    const uploaded = await News.countDocuments({ uploadedBy: username });
    const approved = await News.countDocuments({ approvedBy: username, status: "approved" });
    const rejected = await News.countDocuments({ approvedBy: username, status: "rejected" });
    const citizenHandled = await News.countDocuments({
      approvedBy: username,
      uploadedByRole: "citizen"
    });

    const user = await User.findOne({ username });

    res.json({
      username: user.username,
      email: user.email,
      designation: user.designation,
      role: user.role,
      uploaded,
      approved,
      rejected,
      citizenHandled,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get stats" });
  }
});

export default router;
