import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import FEEDBACK from "./models/Feedback.js";
import AdminAnnouncement from "./models/AdminAnnouncement.js";
import Jobs from "./models/Jobs.js";
const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
      Lname,
      phone,
      email,
      age,
      gender,
      usertype,
    } = req.body;
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
  const activeJobs = jobs.filter((j) => j.status === "Active");
  const completedJobs = jobs.filter((j) => j.status === "Completed");

  res.json({
    totalUsers: users.length,
    totalFreelancers: freelancers.length,
    totalClients: clients.length,
    totalJobs: jobs.length,
    activeJobs: activeJobs.length,
    completedJobs: completedJobs.length,
  });
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
