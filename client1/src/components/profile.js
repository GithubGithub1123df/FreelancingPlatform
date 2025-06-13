import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IDScanner from "../components/IDScanner"; // or wherever your file is
const apiUrl = process.env.REACT_APP_API_URL;
const Profile = () => {
  const userId = localStorage.getItem("userID");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const nav = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const defaultMale =
    "https://cdn-icons-png.flaticon.com/512/4139/4139955.png ";
  const defaultFemale =
    "https://cdn-icons-png.flaticon.com/512/4140/4140078.png";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${apiUrl}/PROFILE/${userId}`);
      setUser(res.data);
      setFormData(res.data);
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiUrl}/profile/${userId}`, formData);
      setUser(res.data); // Update local user data
      alert("Profile updated successfully!");
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      console.error(err);
      alert(`Failed to update profile. ${err.response.data.message}`);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please choose an image.");

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const res = await axios.put(
        `${apiUrl}/profile/${userId}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUser(res.data);
      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-secondary vh-100 p-3 d-flex flex-column align-items-center">
      <div className="text-center mb-1">
        <img
          src={
            user.profileImage
              ? `${apiUrl}${user.profileImage}`
              : user.gender === "Female"
              ? defaultFemale
              : defaultMale
          }
          alt="Profile"
          className="rounded-circle"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control mt-1"
        />
        <button onClick={handleImageUpload} className="btn btn-success mt-1">
          Upload Image
        </button>
      </div>
      <h2 className="text-center text-white">Edit Profile</h2>

      <div
        className="bg-dark p-3 rounded overflow-auto w-75"
        style={{ height: "400px" }}
      >
        <h5 className="text-white text-center">{user.usertype}</h5>
        <form onSubmit={handleUpdate} className="text-white">
          <label>First Name</label>
          <input
            type="text"
            name="Fname"
            value={formData.Fname}
            onChange={handleChange}
            placeholder="First Name"
            className="form-control mb-2"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="Lname"
            value={formData.Lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="form-control mb-2"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-2"
          />
          <label>username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            className="form-control mb-2"
          />
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-control mb-2"
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="form-control mb-2"
          />
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="gender"
            className="form-control mb-2"
          >
            <option value="0" disabled selected>
              choose gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="profession"
            className="form-control mb-2"
            autoComplete="off"
          />
          <label>National ID</label>
          <input
            type="text"
            name="NationalID"
            value={formData.nationalId}
            placeholder="National ID"
            className="form-control mb-2"
            readOnly
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control mb-2"
          />

          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
        <div className="text-white">
          <IDScanner userId={user._id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
