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
  return (
    <>
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
