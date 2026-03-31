import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Fetch full user from DB using ID from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Attach full user object (VERY IMPORTANT)
    req.user = user;

    console.log("Authenticated User:", user); // optional debug

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};