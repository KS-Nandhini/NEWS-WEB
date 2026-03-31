/* 

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  file: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: String,
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
export default News; */

// models/News.js
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  file: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: String,
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
export default News;
 

/* // models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  file: String, // Filename of uploaded image
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: String, // optional
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);
 */