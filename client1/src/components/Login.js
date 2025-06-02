import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/login", formData);
      const user = res.data.user;
      const users = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", user.usertype);
      localStorage.setItem("isLoggedIn", true);
      if (user.usertype === "Admin") {
        const allUsers = res.data.users;
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/admin", { state: { user, allUsers } });
      } else if (user.usertype === "Freelancer") {
        navigate("/Freelancer", { state: { user } });
      } else {
        navigate("/client", { state: { user } });
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
      </form>
    </div>
  );
}
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [err, setErr] = useState("");
//   const nav = useNavigate();

//   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     try {
//       const res = await axios.post("http://localhost:3001/login", form, {
//         withCredentials: true,
//       });
//       const user = res.data.user;

//       window.localStorage.setItem("token", user);
//       window.localStorage.setItem("usertype", user.usertype);
//       window.localStorage.setItem("isLoggedIn", true);

//       // Navigate based on user type
//       if (user.usertype === "Client") {
//         nav("/Client", { state: { user } });
//       } else if (user.usertype === "Admin") {
//         nav("/Admin", { state: { user } });
//       } else {
//         nav("/Freelancer", { state: { user } });
//       }
//     } catch (err) {
//       setErr(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 400 }}>
//       <h2>Login</h2>
//       {err && <div className="alert alert-danger">{err}</div>}
//       <form onSubmit={onSubmit}>
//         <input
//           name="username"
//           className="form-control mb-2"
//           placeholder="Username or Email"
//           onChange={onChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           className="form-control mb-2"
//           placeholder="Password"
//           onChange={onChange}
//           required
//         />
//         <button className="btn btn-primary w-100">Login</button>
//       </form>
//     </div>
//   );
// }
