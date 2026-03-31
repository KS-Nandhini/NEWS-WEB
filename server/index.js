import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// ✅ MongoDB connection (FIXED)
mongoose
  .connect(process.env.MONGO_URI) // 🔥 removed deprecated options
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });