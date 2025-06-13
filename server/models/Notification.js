import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Client",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Freelancer",
  },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },

  note: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "accepted", "declined", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
