import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/reset-password`, {
        email,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" bg-secondary w-100 vh-100">
      <div className="p-3 rounded overflow-auto" style={{ height: "300px" }}>
        <h2 className="text-center text-white mb-3">
          Reset Password for {email}
        </h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            className="form-control mb-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">
            Reset Password
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
