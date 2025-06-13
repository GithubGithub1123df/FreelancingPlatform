import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
function FAQs() {
  const [Announcements, setAnnouncements] = useState([]);
  // this is for the search part
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const deleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/FAQ/${id}`, {
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
    fetch(`${apiUrl}/FAQ`)
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
  useEffect(() => {
    axios
      .get(`${apiUrl}/FAQ`)
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (
    <>
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
            <h5>{activeAnnouncement.name}</h5>
            <p>{activeAnnouncement.subject}</p>
            <p>{activeAnnouncement.msg}</p>
            <div className="d-flex align-items-center justify-content-between w-100 mb-2">
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
              <button
                className="btn btn-success h-75 d-flex align-items-center"
                style={{
                  fontSize: "12px",
                }}
                onClick={() => {
                  setActiveAnnouncement(null);
                }}
              >
                Add to FAQs
              </button>
            </div>

            <span
              className="position-absolute bottom-0 m-2"
              style={{ fontSize: "12px", right: "10px", marginBottom: "7px" }}
            >
              {activeAnnouncement.timestamp}
            </span>
            <small style={{ color: "#777" }}>{activeAnnouncement.email}</small>

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
      <div className="bg-secondary vh-100 p-3">
        <div className="w-100 d-flex align-items-center justify-content-center position-relative">
          <h1>Frequently Asked Questions</h1>
        </div>

        <div>
          {Announcements.length === 0 ? (
            <p>No FAQs has been found.</p>
          ) : (
            <ul>
              {Announcements.map((announce, idx) => (
                <li
                  key={announce._id}
                  onClick={() => setActiveAnnouncement(announce)}
                  style={{ cursor: "pointer" }}
                  className="w-75 bg-primary mt-2 p-2 rounded-5 fw-bold text-white w-75 position-relative overflow-hidden"
                >
                  <span>{announce.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default FAQs;
