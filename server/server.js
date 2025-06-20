import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import FEEDBACK from "./models/Feedback.js";
import AdminAnnouncement from "./models/AdminAnnouncement.js";
import Jobs from "./models/Jobs.js";
import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const allowedOrigins = [
  "http://localhost:3000",
  "https://freelancingplatform-1.onrender.com",
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
    "how to hire":
      "To hire a freelancer, go to the 'Freelancers' page, click on 'View Details', and then click 'Hire'. Fill in the job title, description, and duration. The job will appear in 'Pending Jobs' until the freelancer accepts.",

    "job status":
      "Job statuses include:\n- Pending: Waiting for freelancer response\n- Accepted: Freelancer is working\n- Declined: Freelancer refused\n- Completed: Job finished\n- Cancelled: Job stopped. You can view job progress on your Activity page.",

    "profile update":
      "You can update your name, bio, contact info, and profile image from the Profile page. Your National ID is visible there but cannot be changed once submitted.",

    "profile creation":
      "To create a profile, register with your full name, email, password, and upload a profile image and national ID. This information helps other users trust you and is required for platform access.",

    "national id info":
      "Your national ID is required for verification. It is securely stored and only visible to you and the admin. After submission, it cannot be changed.",

    "id scanning":
      "The platform scans your National ID when you upload it. Make sure the image is clear. This step is required for verification before using full features like hiring or getting hired.",

    "hire button not showing":
      "If you can't see the 'Hire' button, it's because you haven’t uploaded or verified your National ID yet. Go to your Profile and upload a valid ID to unlock hiring functionality.",

    "forgot password":
      "Click on 'Forgot Password' on the login page, enter your registered email, and a reset link will be sent to your inbox. Be sure to check spam folders if you don’t see it.",

    "reset password":
      "Once you receive the password reset email, click the link, and enter a new password. Make sure it’s strong and easy to remember. You can then log in with the new password.",

    "send message":
      "To message a freelancer or client, go to their profile and click 'Message', or open the chat section from your dashboard. All chats are private and real-time.",

    notifications:
      "Notifications alert you when someone hires you, updates a job status, or sends you a message. Click the bell icon at the top to view them.",
    "contact page":
      "You can reach us through the Contact page found in the footer of every page. Fill in your name, email, subject, and message. Our team will respond as soon as possible.",

    "how to contact support":
      "To contact support, go to the Contact page or click on 'Support' in the footer. Fill out the contact form or message the admin through chat for faster assistance.",

    faq: "Our FAQ section answers common questions about hiring, job statuses, registration, verification, and using the platform. Visit the FAQ page from the footer or ask me directly!",

    "frequently asked questions":
      "You can find answers to popular questions like 'How do I hire?', 'Why can’t I see the hire button?', or 'How do I upload my ID?' on the FAQ page linked in the footer.",

    "privacy policy":
      "Our Privacy Policy explains how we handle your personal data, including your national ID and contact info. Your data is secure, not shared with third parties, and only used for platform functionality. View full details on the Privacy Policy page.",

    "terms and policy":
      "The Terms and Conditions and Privacy Policy outline how the platform works, your rights, responsibilities, and how your data is protected. You can read both in the contact page.",

    "data security":
      "We protect your data using encryption and secure storage. National IDs and messages are never visible to other users, and admins cannot access your private chats. You can read more on our Privacy Policy page.",

    "where is the faq":
      "You can find the FAQ page in the footer. It covers hiring, profile issues, ID verification, and more. You can also ask me directly and I’ll help!",

    "how is my data used":
      "Your data is only used to match clients and freelancers and ensure secure identity verification. We don’t share or sell your information. Read our Privacy Policy in the footer to learn more.",

    "how to report a problem":
      "To report issues like fake profiles, harassment, or technical problems, go to the Contact page and submit your concern. Our admin team will investigate and respond.",
    "about notification":
      "Notifications show important actions like job status changes, new hires, and messages. Each one links directly to the relevant job or chat.",

    "freelancer view jobs":
      "As a freelancer, your Activity page shows:\n- Pending Jobs: waiting for your response\n- Accepted Jobs: work in progress\n- Completed/Cancelled Jobs: history. Use the buttons to update job status in real-time.",

    "client view jobs":
      "As a client, your Activity page shows all jobs you've posted. You can track if they are pending, accepted, declined, or completed. Use this page to manage your hires.",

    "freelancers list":
      "As a client, you can view all available freelancers on the Freelancers page. Click on a profile to see details, then click 'Hire' if you're interested (after verifying your ID).",

    "clients list":
      "As a freelancer, you can browse clients from the Clients page. This helps you see who has posted jobs, their status, and message them if needed.",

    "register help":
      "To register, choose if you're a Client or Freelancer. Fill in your name, email, password, upload your profile image and National ID, then submit. You'll be logged in right after.",
    register:
      "To register, choose if you're a Client or Freelancer. Fill in your name, email, password, upload your profile image and National ID, then submit. You'll be logged in right after.",

    "contact support":
      "For help, click 'Support' in the footer or message the admin in the chat. We’re here to help you with issues like login problems, job errors, and more.",
    help: "For help, click 'Support' in the footer or message the admin in the chat. We’re here to help you with issues like login problems, job errors, and more.",

    "general greeting":
      "Hello! I'm your assistant . I can help you hire freelancers, view jobs, reset your password, manage your profile, and more. Just ask!",
    hi: "Hello! I'm your assistant . I can help you hire freelancers, view jobs, reset your password, manage your profile, and more. Just ask!",
    hello:
      "Hello! I'm your assistant . I can help you hire freelancers, view jobs, reset your password, manage your profile, and more. Just ask!",

    "freelancer verification":
      "Freelancers must upload a valid national ID and complete their profile to be verified. Only verified freelancers can be hired by clients.",

    "how payments work":
      "At this time, payments are handled off-platform. Once a job is agreed on, clients and freelancers must discuss payment methods directly and respectfully.",
    payments:
      "At this time, payments are handled off-platform. Once a job is agreed on, clients and freelancers must discuss payment methods directly and respectfully.",

    "change password":
      "To change your password while logged in, go to Profile → Change Password. Enter your current and new password. For forgotten passwords, use the 'Forgot Password' option on the login page.",

    "dashboard explanation":
      "Your dashboard gives you access to your role-specific tools:\n- Clients: manage job posts, view freelancers, hire, and check status.\n- Freelancers: view jobs, accept/decline offers, complete tasks, and chat.",

    "terms and safety":
      "Respect all users. Upload only real and clear ID images. Harassment or scams will lead to removal. All messages are private and not monitored by admins.",

    unknown:
      "Sorry, I didn’t catch that. You can ask me things like 'How to hire', 'Profile update', or 'Reset password'. Try rephrasing your question.",
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
    const user = await User.findById(req.params.id);
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
    cb(null, Date.now() + path.extname(file.originalname));
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
const apiUrl = process.env.REACT_APP_API_URL;
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
      from: "bini6126@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset for an account with an email address: ${email}.</p>
        <p><a href=${apiUrl}/reset-password?email=${email}>Click here to reset your password</a></p>
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
      { new: true }
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
