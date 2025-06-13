import React, { useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/forgot-password`, {
        email,
      });
      alert(
        res.data.message + "\n check the spam folder if you can't find it inbox"
      );
      setMessage(
        res.data.message + "\n check the spam folder if you can't find it inbox"
      );
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Failed to send reset email";
      alert(errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div className=" bg-secondary w-100 vh-100">
      <div className="p-3 rounded overflow-auto" style={{ height: "300px" }}>
        <h2 className="text-center text-white mb-3">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="form-control mb-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">
            Send Reset Link
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
