import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  msg: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("feedback", feedbackSchema);
