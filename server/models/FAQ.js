import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  msg: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("FAQ", FAQSchema);
