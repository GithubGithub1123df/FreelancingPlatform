import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import FEEDBACK from "./models/Feedback.js";
import FAQ from "./models/FAQ.js";
import AdminAnnouncement from "./models/AdminAnnouncement.js";
import Jobs from "./models/Jobs.js";
import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://freelancingplatform-1.onrender.com", // your deployed frontend
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3001;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("MongoDB connected");

app.post("/register", async (req, res) => {
  try {
    const {
      Fname,
      username,
      password,
      confirmPassword,
      Lname,
      phone,
      email,
      age,
      gender,
      usertype,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(401).json({ message: "password doesn't match" });
    if (Fname.length < 4 || Fname.length > 15)
      return res.status(401).json({
        message:
          "First Name must be longer than 3 characters and less than 15 characters",
      });
    if (Lname.length < 4 || Lname.length > 15)
      return res.status(401).json({
        message:
          "Last Name must be longer than 3 characters and less than 15 characters",
      });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      Fname,
      username,
      Lname,
      phone,
      email,
      age,
      gender,
      usertype,
      password: hash,
    });
    res.status(201).json({
      message: "Registered",
      user: {
        Fname,
        Lname,
        username,
        email,
        phone,
        age,
        _id: user._id,
        gender,
        usertype,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (unique field)
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exist` });
    }

    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    const users = await User.find({});
    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        Fname: user.Fname,
        Lname: user.Lname,
        phone: user.phone,
        age: user.age,
        usertype: user.usertype,
        gender: user.gender,
      },
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

app.post("/Chatbot", (req, res) => {
  const responseDictionary = {
    where:
      "you can find freelancers and clients on this platform based on the role you registered\n you can find freelancers list if you register as a client \n and clients list if",
    services:
      "We offer services on the client demand and serve a good services.",
    electronics:
      "Electronics service is one of the services we provide. we can track electricians around your area and make them track reachout to you",
    plumbing:
      "Plumbing is one of the services we provide, we can track and nearby service providers and make them reachout for you",
    admin:
      "this platform only assigns admins by admins no other users can register as admins but freelancer or client only.",
    ai: "we have an AI for chatbot like we are communicating right now, i can make you go through the website easily and make it easy to navigate",
    client:
      "client can view freelancers nearby and communicate with them here easily",
    freelancer:
      "You can find freelancers by category, skills, or rating. What service do you need?",
    mission:
      "Our mission is to provide a seamless experience for clients seeking top-notch professionals while empowering freelancers to showcase their skills and grow their careers. We understand that finding the right freelancer for the job can be challenging, which is why we’ve developed an advanced matching system to help clients easily find qualified freelancers based on job requirements, rank, and prior performance.",
    about:
      "about page can tell you more about our services and the aim and goal of the website and other details.",
    contact:
      "on the contact link you can find a contact page that can make you easily reach out to us using your name, email, subject and the message you want to send to us.",
    features:
      "Our platform offers features like instant messaging, real-time chat moderation powered by AI, and advanced ranking systems, so clients can confidently make informed decisions about the freelancers they hire. Our admin dashboard includes a comprehensive suite of management tools to ensure smooth operations for both freelancers and clients. From monitoring rankings to managing freelancer profiles, our platform is designed to make the freelance hiring process as transparent and user-friendly as possible.",
  };

  const { message } = req.body;
  const userMessage = message.toLowerCase();

  let reply =
    "Sorry, I couldn't understand. Can you please clarify your request?";

  for (const keyword in responseDictionary) {
    if (userMessage.includes(keyword)) {
      reply = responseDictionary[keyword];
      break;
    }
  }

  res.json({ reply });
});
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, msg } = req.body;
    const feedback = await FEEDBACK.create({
      name,
      email,
      subject,
      msg,
    });
    res.status(201).json({
      message: "feedback received",
      feedback: {
        name,
        email,
        subject,
        msg,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
app.post("/AdminAnnouncement", async (req, res) => {
  try {
    const { title, announce } = req.body;
    const Announcement = await AdminAnnouncement.create({
      title,
      announce,
    });
    res.status(201).json({
      message: "Announcements posted",
      feedback: {
        title,
        announce,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.get("/AllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
app.get("/ManageFreelancers", async (req, res) => {
  try {
    const users = await User.find({ usertype: "Freelancer" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Freelancers" });
  }
});
app.get("/AllClients", async (req, res) => {
  try {
    const users = await User.find({ usertype: "Client" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Clients" });
  }
});
app.get("/Client", async (req, res) => {
  try {
    const users = await User.find({ usertype: "Freelancer" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Freelancers" });
  }
});
app.get("/AdminAnnouncement", async (req, res) => {
  try {
    const Announcements = await AdminAnnouncement.find();
    res.json(Announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Announcements" });
  }
});
app.delete("/AdminAnnouncement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await AdminAnnouncement.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting announcement", error: err });
  }
});
app.post("/ManageJobs", async (req, res) => {
  try {
    const { title, announce } = req.body;
    const Announcement = await Jobs.create({
      title,
      announce,
    });
    res.status(201).json({
      message: "Job is posted",
      feedback: {
        title,
        announce,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
app.get("/ManageJobs", async (req, res) => {
  try {
    const Job = await Jobs.find();
    res.json(Job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});
app.delete("/ManageJobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Jobs.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err });
  }
});
app.get("/Reports", async (req, res) => {
  const users = await User.find();
  const jobs = await Jobs.find();

  const freelancers = users.filter((u) => u.usertype === "Freelancer");
  const clients = users.filter((u) => u.usertype === "Client");

  const activeJobs = await Notification.countDocuments({
    status: "accepted",
  });
  const completedJobs = await Notification.countDocuments({
    status: "completed",
  });
  const CancelledJobs = await Notification.countDocuments({
    status: "cancelled",
  });
  const PendingJobs = await Notification.countDocuments({
    status: "pending",
  });
  const DeclinedJobs = await Notification.countDocuments({
    status: "declined",
  });

  res.json({
    totalUsers: users.length,
    totalFreelancers: freelancers.length,
    totalClients: clients.length,
    totalJobs: jobs.length,
    activeJobs: activeJobs,
    completedJobs: completedJobs,
    CancelledJobs: CancelledJobs,
    PendingJobs: PendingJobs,
    DeclinedJobs: DeclinedJobs,
  });
});

app.get("/notifications", async (req, res) => {
  try {
    const Announcements = await AdminAnnouncement.find();
    res.json(Announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Announcements" });
  }
});
app.get("/Freelancer", async (req, res) => {
  try {
    const users = await User.find({ usertype: "Client" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Freelancers" });
  }
});
app.get("/FAQ", async (req, res) => {
  try {
    const Announcements = await FEEDBACK.find();
    res.json(Announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Announcements" });
  }
});
app.delete("/FAQ/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await FEEDBACK.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting FAQs", error: err });
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Ensure you're using Mongoose
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/profile/:id", async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    if (updates.username) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (unique field)
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exist` });
    }

    res.status(500).json({ message: "failed to update user" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 171234123.jpg
  },
});

const upload = multer({ storage });

app.put(
  "/profile/:id/upload",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const imagePath = `/uploads/${req.file.filename}`;
      await User.findByIdAndUpdate(userId, { profileImage: imagePath });
      res
        .status(200)
        .json({ message: "Image uploaded", profileImage: imagePath });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image", error });
    }
  }
);
app.put(
  "/profile/:id/upload",

  async (req, res) => {
    try {
      const userId = req.params.id;
      const professions = `${req.body.profession}`;
      await User.findByIdAndUpdate(userId, { profession: professions });
      res
        .status(200)
        .json({ message: "profession updated uploaded", profession });
    } catch (error) {
      res.status(500).json({ message: "Failed to update profession", error });
    }
  }
);
app.get("/admin", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Notification.countDocuments();
    const activeJobs = await Notification.countDocuments({
      status: "accepted",
    });
    const completedJobs = await Notification.countDocuments({
      status: "completed",
    });
    const CancelledJobs = await Notification.countDocuments({
      status: "cancelled",
    });
    const PendingJobs = await Notification.countDocuments({
      status: "pending",
    });
    const DeclinedJobs = await Notification.countDocuments({
      status: "declined",
    });

    res.json({
      totalUsers,
      totalJobs,
      activeJobs,
      completedJobs,
      CancelledJobs,
      PendingJobs,
      DeclinedJobs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

import Notification from "./models/Notification.js";

app.post("/notif", async (req, res) => {
  try {
    const { senderId, receiverId, message, category, note } = req.body;

    const newNotif = new Notification({
      senderId,
      receiverId,
      message,
      category,
      note,
      createdAt: new Date(),
    });

    await newNotif.save();
    res.status(201).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error("Notification POST failed:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/notif/:receiverId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.params.receiverId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
app.get("/notif/:senderId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      senderId: req.params.senderId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.put("/ManageJobs/:jobId/status", async (req, res) => {
  const { jobId } = req.params;
  const { status } = req.body;

  try {
    const updatedJob = await Notification.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job status", error });
  }
});

import nodemailer from "nodemailer";

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bini6126@gmail.com",
        pass: "xembdtmvmbigkapf",
      },
    });

    const mailOptions = {
      from: "bini6126@gmail.com", // 🔁 Same as above
      to: email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p><a href="http://localhost:3000/reset-password?email=${email}">Click here to reset your password</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset link sent successfully" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Handle Reset Password Submission
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
});

// server.js (Express)
app.put("/IDScanner/:id", async (req, res) => {
  const { id } = req.params;
  const { nationalId } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { nationalId } },
      { new: true } // returns updated document
    );

    if (!updatedUser) return res.status(404).send("User not found");

    res.json(updatedUser);
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).send("Failed to update ID");
  }
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
