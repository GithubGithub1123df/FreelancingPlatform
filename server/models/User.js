import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Fname: { type: String, required: true },
  Lname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  usertype: { type: String, required: true },
  password: { type: String, required: true },
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

export default mongoose.model("User", userSchema);
