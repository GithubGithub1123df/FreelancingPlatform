import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function Notifications() {
  const [Announcements, setAnnouncements] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const deleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/AdminAnnouncement/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Deleted successfully");

        setAnnouncements((prev) => prev.filter((item) => item._id !== id));
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
      .get(`${apiUrl}/AdminAnnouncement`)
      .then((res) => setAnnouncements(res.data))
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
      await axios.post(`${apiUrl}/AdminAnnouncement`, form, {
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
    fetch(`${apiUrl}/AdminAnnouncement`)
      .then((res) => res.json())
      .then((Announcements) => {
        setData(Announcements);
        setResults(Announcements);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((announcement) =>
      [announcement.title, announcement.announce].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setResults(filtered);
  }, [searchTerm, data]);
  return (
    <>
      {/* opened Announcement Section */}
      {activeAnnouncement && (
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
            <h5>{activeAnnouncement.title}</h5>
            <p>{activeAnnouncement.announce}</p>
            <button
              className="btn btn-danger h-75 d-flex align-items-center"
              style={{
                fontSize: "12px",
              }}
              onClick={() => {
                deleteAnnouncement(activeAnnouncement._id);
                setActiveAnnouncement(null);
              }}
            >
              Delete
            </button>
            <span
              className="position-absolute bottom-0 m-2"
              style={{ fontSize: "12px", right: "10px", marginBottom: "7px" }}
            >
              {activeAnnouncement.CreatedAt +
                " " +
                activeAnnouncement.timestamp}
            </span>
            <small style={{ color: "#777" }}>{activeAnnouncement.date}</small>
            <button
              onClick={() => setActiveAnnouncement(null)}
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
      <div className="d-flex align-items-center justify-content-spaceBetween bg-white flex-column vh-100">
        <h1>Notification</h1>

        <div>
          <h2 className="text-center">Announcement</h2>
          {Announcements.length === 0 ? (
            <p>No Announcements has been found.</p>
          ) : (
            <ul>
              {results.map((announce, idx) => (
                <li
                  onClick={() => setActiveAnnouncement(announce)}
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
                      onClick={() => deleteAnnouncement(announce._id)}
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
export default Notifications;
