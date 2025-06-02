import mongoose from "mongoose";

const AdminAnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  announce: { type: String, required: true },
  CreatedAt: {
    type: String,
    default: () => {
      const now = new Date();
      const Day = String(now.getDate()).padStart(2, "0");
      const Month = String(now.getMonth()).padStart(2, "0");
      const Year = String(now.getFullYear());
      return `${Day}-${Month}-${Year}`;
    },
  },
  timestamp: {
    type: String,
    default: () => {
      const now = new Date();
      const Hour = String(now.getHours()).padStart(2, "0");
      const Minute = String(now.getMinutes()).padStart(2, "0");
      const Second = String(now.getSeconds()).padStart(2, "0");

      return `${Hour}-${Minute}-${Second}`;
    },
  },
});

export default mongoose.model("Announcements", AdminAnnouncementSchema);
