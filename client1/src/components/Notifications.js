import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function Notifications() {
  const [Announcements, setAnnouncements] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/notifications`)
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

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
      <div className="w-100 d-flex align-items-center justify-content-spaceBetween bg-white flex-column vh-100">
        <div>
          <h1>Notification</h1>
          {Announcements.length === 0 ? (
            <p>No Notifications has been found.</p>
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
