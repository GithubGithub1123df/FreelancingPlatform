import React, { useState, useEffect } from "react";

const Settings = () => {
  // Profile state
  const profile = axios.put("http://localhost:3001/ManageJobs", form, {
    withCredentials: true,
  });

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = () => {
    // You can replace this with an actual API call
    console.log("Saved Profile:", profile);
    alert("Profile updated successfully!");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <div className="settings-container" style={{ padding: "2rem" }}>
      <h2>Settings</h2>

      <div className="form-group">
        <label>Username</label>
        <input
          name="username"
          value={profile.username}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email" value={profile.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input name="phone" value={profile.phone} onChange={handleChange} />
      </div>

      <button onClick={handleSave}>Save Changes</button>

      <hr style={{ margin: "2rem 0" }} />

      <div className="form-group">
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Enable Dark Mode
        </label>
      </div>

      <style>{`
        body.dark {
          background: #121212;
          color: #fff;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        input {
          display: block;
          padding: 0.5rem;
          margin-top: 0.25rem;
          width: 100%;
          max-width: 400px;
        }
        button {
          padding: 0.5rem 1rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Settings;
