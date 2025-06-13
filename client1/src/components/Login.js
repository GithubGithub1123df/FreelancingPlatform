import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${apiUrl}/login`, formData);
      const user = res.data.user;
      const users = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", user.usertype);
      localStorage.setItem("userID", user._id);
      localStorage.setItem("isLoggedIn", true);
      if (user.usertype === "Admin") {
        const allUsers = res.data.users;
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/Admin", { state: { user, allUsers } });
      } else if (user.usertype === "Freelancer") {
        navigate("/Freelancer", { state: { user } });
      } else {
        navigate("/Client", { state: { user } });
      }
    } catch (err) {
      // Show exact error message
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="container mt-5 vh-100" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          className="form-control mb-2"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <a href="/forgot-password" className="text-blue-600">
          Forgot Password?
        </a>
      </form>
    </div>
  );
}
