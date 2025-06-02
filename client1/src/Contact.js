import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://freelancingplatform.onrender.com:3001/contact",
        form,
        {
          withCredentials: true,
        }
      );
      setMsg("Feedback Received");
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary position-relative vh-100">
      <div className="bg-white p-3 w-75 m-3 position-absolute top-0 rounded-5 w-50">
        <h2 className="text-center">Contact</h2>
        {msg === "Feedback Received" && (
          <div className="alert alert-success">{msg}</div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="form-control rounded-2"
              onChange={onChange}
              required
            />

            <label htmlFor="email">
              <strong>Email Address</strong>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              className="form-control rounded-3"
              onChange={onChange}
              required
            />

            <label htmlFor="Subject">
              <strong>Subject</strong>
            </label>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              className="form-control rounded-3"
              onChange={onChange}
              required
            />

            <label htmlFor="msg">
              <strong>Your Message</strong>
            </label>

            <textarea
              name="msg"
              required
              className="form-control rounded-3 border-success"
              placeholder="Your Message"
              onChange={onChange}
            ></textarea>

            <button className="btn btn-warning mt-3 form-control" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
      <div
        className="p-3 rounded-0 w-100"
        style={{ position: "absolute", bottom: "0px" }}
      >
        <ul className="mt-1 space-y-2 ">
          <a href="/faq" className="btn btn-primary form-control mb-2">
            <li className="d-flex justify-content-center">FAQs</li>
          </a>
          <a
            href="/PrivacyPolicy"
            className="btn btn-primary form-control mb-2"
          >
            <li className="d-flex justify-content-center">Privacy Policy</li>
          </a>
        </ul>
      </div>
    </div>
  );
}
