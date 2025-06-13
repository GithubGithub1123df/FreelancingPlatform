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
import Notification from "./components/Notifications";
import Chatbot from "./components/Chatbot";
import Freelancer from "./components/Freelancer/Freelancer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAnnouncement from "./components/Admin/components/AdminAnnouncement";
import AllUsers from "./components/Admin/components/AllUsers";
import ManageFreelancers from "./components/Admin/components/ManageFreelancers";
import AllClients from "./components/Admin/components/AllClients";
import ManageJobs from "./components/Admin/components/ManageJobs";
import Reports from "./components/Admin/components/Reports";

import FAQs from "./components/FAQs";
import AdminFAQ from "./components/Admin/components/AdminFAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Profile from "./components/profile";
import Hire from "./components/client/hire";
import Activity from "./components/Activity";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import IDScanner from "./components/IDScanner";
function App() {
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
            <Route path="/faq" element={<FAQs />}></Route>
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />}></Route>
          <Route path="/register" element={<Navigate to="/" />}></Route>

          {userType == "Admin" && (
            <>
              <Route path="/Admin" element={<Admin />}></Route>
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
              <Route path="/AllClients" element={<AllClients />}></Route>
              <Route path="/Reports" element={<Reports />}></Route>
              <Route path="/FAQ" element={<AdminFAQ />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/IDScanner" element={<IDScanner />}></Route>
            </>
          )}
          {userType == "Client" && (
            <>
              <Route path="/Client" element={<Client />}></Route>
              <Route path="/" element={<Client />}></Route>
              <Route path="/chatbot" element={<Chatbot />}></Route>
              <Route path="/notifications" element={<Notification />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/activity" element={<Activity />}></Route>
              <Route path="/hire/:freelancerId" element={<Hire />} />
              <Route path="/IDScanner" element={<IDScanner />}></Route>
            </>
          )}
          {userType == "Freelancer" && (
            <>
              <Route path="/Freelancer" element={<Freelancer />}></Route>
              <Route path="/" element={<Freelancer />}></Route>
              <Route path="/chatbot" element={<Chatbot />}></Route>
              <Route path="/notifications" element={<Notification />}></Route>
              <Route path="/activity" element={<Activity />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/IDScanner" element={<IDScanner />}></Route>
            </>
          )}
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
