import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
function FAQs() {
  const [Announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/faq`)
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (
    <>
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
