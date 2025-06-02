import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    Fname: "",
    Lname: "",
    phone: "",
    age: "",
    gender: "",
    usertype: "",
    username: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", form, {
        withCredentials: true,
      });
      setMsg("Registered! You can now login.");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary">
      <div
        className="bg-white p-3 rounded m-1 overflow-auto"
        style={{ height: "500px" }}
      >
        <h2>Register</h2>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="Fname">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="Fname"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="Lname">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="Lname"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="username">
              <strong>username</strong>
            </label>
            <input
              type="text"
              placeholder="username"
              name="username"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="phone">
              <strong>Phone</strong>
            </label>
            <input
              type="Number"
              placeholder="Phone"
              name="phone"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="age">
              <strong>Age</strong>
            </label>
            <input
              type="Number"
              placeholder="Age"
              name="age"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />
            <label htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <select
              name="gender"
              className="form-control rounded-0"
              onChange={onChange}
              required
            >
              <option value="0" disabled selected>
                choose gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label htmlFor="usertype">
              <strong>User Type</strong>
            </label>
            <select
              name="usertype"
              className="form-control rounded-0"
              onChange={onChange}
              required
            >
              <option value="0" disabled selected>
                choose usertype
              </option>
              <option value="Client">Client</option>
              <option value="Freelancer">Freelancer</option>
            </select>

            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control rounded-0"
              onChange={onChange}
              required
            />

            <label htmlFor="confirmPassword">
              <strong>confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="confirm Password"
              name="confirmPassword"
              className="form-control rounded-0"
              title="repeat the password you just entered"
              onChange={onChange}
              required
            />

            <button className="btn btn-primary mt-3" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
