// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";

import Landing from "./Landing";
import Contact from "./Contact";
import About from "./About";
import Admin from "./components/Admin/Admin";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Client from "./components/client/Client";
import Notification from "./components/UserNotification";
import Chatbot from "./components/Chatbot";
import Freelancer from "./components/Freelancer/Freelancer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAnnouncement from "./components/Admin/components/AdminAnnouncement";
import AllUsers from "./components/Admin/components/AllUsers";
import ManageFreelancers from "./components/Admin/components/ManageFreelancers";
import ManageJobs from "./components/Admin/components/ManageJobs";
import Reports from "./components/Admin/components/Reports";
import Settings from "./components/Admin/components/Settings";

function App() {
  // const [user, setUser] = useState(JSON.parse(Cookies.get("user") || "null"));

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const user = window.localStorage.getItem("user");
  const userType = window.localStorage.getItem("userType");
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userType={userType} />

      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/chatbot" element={<Chatbot />}></Route>
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />}></Route>
          <Route path="/register" element={<Navigate to="/" />}></Route>

          {userType == "Admin" && (
            <>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/" element={<Admin />}></Route>
              <Route
                path="/AdminAnnouncement"
                element={<AdminAnnouncement />}
              ></Route>
              <Route
                path="/ManageFreelancers"
                element={<ManageFreelancers />}
              ></Route>
              <Route path="/AllUsers" element={<AllUsers />}></Route>
              <Route path="/ManageJobs" element={<ManageJobs />}></Route>
              <Route path="/Reports" element={<Reports />}></Route>
              <Route path="/Settings" element={<Settings />}></Route>
            </>
          )}
          {userType == "Client" && (
            <>
              <Route path="/" element={<Navigate to="/Client" />}></Route>
              <Route path="/chatbot" element={<Chatbot />}></Route>
              <Route
                path="/UserNotification"
                element={<Notification />}
              ></Route>
            </>
          )}
          {userType == "Freelancer" && (
            <>
              <Route path="/" element={<Navigate to="/Freelancer" />}></Route>
              <Route path="/chatbot" element={<Chatbot />}></Route>
              <Route
                path="/UserNotification"
                element={<Notification />}
              ></Route>
            </>
          )}

          <Route path="/client" element={<Client />}></Route>
          <Route path="/admin" element={<Admin />}></Route>

          <Route path="/Freelancer" element={<Freelancer />}></Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
