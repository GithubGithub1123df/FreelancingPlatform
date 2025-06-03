import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
function ManageJobs() {
  const [Jobs, setJobs] = useState([]);

  const [ActiveJobs, setActiveJobs] = useState(null);
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/ManageJobs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Deleted successfully");

        setJobs((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting announcement");
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/ManageJobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const [form, setForm] = useState({
    title: "",
    announce: "",
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/ManageJobs`, form, {
        withCredentials: true,
      });
      setMsg("Feedback Received");
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  // this is for the search part
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/ManageJobs`)
      .then((res) => res.json())
      .then((Jobs) => {
        setData(Jobs);
        setResults(Jobs);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((job) =>
      [job.title, job.announce].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setResults(filtered);
  }, [searchTerm, data]);
  return (
    <>
      <div>
        {/* opened Announcement Section */}
        {ActiveJobs && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "90%",
                position: "relative",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
            >
              <h5>{ActiveJobs.title}</h5>
              <p>{ActiveJobs.announce}</p>
              <button
                className="btn btn-danger h-75 d-flex align-items-center"
                style={{
                  fontSize: "12px",
                  zIndex: 2000,
                }}
                onClick={() => {
                  deleteJob(ActiveJobs._id);
                  setActiveJobs(null);
                }}
              >
                Delete
              </button>
              <span
                className="position-absolute bottom-0 m-2"
                style={{ fontSize: "12px", right: "10px", marginBottom: "7px" }}
              >
                {ActiveJobs.CreatedAt + " " + ActiveJobs.timestamp}
              </span>
              <small style={{ color: "#777" }}>{ActiveJobs.date}</small>
              <button
                onClick={() => setActiveJobs(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-secondary vh-100 w-75 position-absolute end-0 p-3">
        <div className="w-100 d-flex align-items-center justify-content-center position-relative">
          <h1>Job Categories</h1>

          <div className="position-absolute end-0 m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
          </div>
        </div>
        {/* sending Announcement place */}
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h3>Add New Job</h3>
          <form
            className="w-75 d-flex align-items-center flex-column"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="title"
              name="title"
              onChange={onChange}
            />

            <textarea
              name="announce"
              id="announce"
              className="w-75 m-2"
              onChange={onChange}
            ></textarea>
            <button className="btn btn-success" type="submit">
              Send
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-center">Registered Jobs</h2>
          {Jobs.length === 0 ? (
            <p>No Jobs has been found.</p>
          ) : (
            <ul>
              {results.map((announce, idx) => (
                <li
                  onClick={() => setActiveJobs(announce)}
                  key={announce._id}
                  style={{ cursor: "pointer" }}
                  className="w-75 bg-primary mt-2 p-2 rounded-5 fw-bold text-white w-75 position-relative overflow-hidden"
                >
                  <span>{announce.title}</span>
                  <span
                    className="position-absolute bottom-0 mb-0 m-2 text-muted"
                    style={{ fontSize: "10px", right: "70px" }}
                  >
                    {announce.CreatedAt + " " + announce.timestamp}
                  </span>
                  <span>
                    <button
                      className="btn btn-danger btn-sm position-absolute p-1 end-0 me-2 top-0 mt-1"
                      onClick={() => deleteJob(announce._id)}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageJobs;
