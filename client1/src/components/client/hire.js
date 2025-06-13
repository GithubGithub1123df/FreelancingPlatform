import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
function Hire() {
  const { freelancerId } = useParams();
  const [jobCategories, setJobCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/ManageJobs`)
      .then((res) => setJobCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleHireSubmit = async () => {
    if (!selectedCategory) return alert("Select a job category");

    const clientId = JSON.parse(localStorage.getItem("user"))?._id;
    try {
      await axios.post(`${apiUrl}/notif`, {
        senderId: clientId,
        receiverId: freelancerId,
        message: `You have a new job request for ${selectedCategory}`,
        category: selectedCategory,
        note,
      });
      nav("/");
      alert("Job request sent successfully!");
    } catch (err) {
      console.error("Notification send failed:", err);
      alert("Failed to send notification");
    }
  };

  return (
    <div className="bg-secondary vh-100 p-4 max-w-md mx-auto border shadow vh-100">
      <h2 className="text-xl mb-4 text-center text-white">Hire Freelancer</h2>

      <label className="mb-2 text-center text-white fw-bold">
        Select Job Category:
      </label>
      <select
        className="w-100 p-2 border rounded mb-4 m-2"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Select a job --</option>
        {jobCategories.map((job) => (
          <option key={job._id} value={job.title}>
            {job.title}
          </option>
        ))}
      </select>

      <label className="mb-2 text-center text-white  fw-bold">
        Additional Note:
      </label>
      <textarea
        className="w-100 p-2 border rounded mb-2"
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write job details here..."
      ></textarea>

      <button onClick={handleHireSubmit} className="btn btn-success w-100">
        Hire
      </button>
    </div>
  );
}

export default Hire;
