import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["citizen", "media"], default: "citizen" },
  designation: { type: String, default: "" },

});

export default mongoose.model("User", userSchema);
