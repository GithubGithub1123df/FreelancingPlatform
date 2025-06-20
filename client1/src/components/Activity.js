// NotificationPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const usertype = localStorage.getItem("userType");
const Activity = () => {
  const [Activities, setActivities] = useState([]);
  const [ActivitiesClient, setActivitiesClient] = useState([]);
  const freelancerId = JSON.parse(localStorage.getItem("user"))?._id;
  const [activeNotif, setActiveNotif] = useState(null);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${apiUrl}/notif/${freelancerId}`);
        setActivities(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [freelancerId]);

  const updateStatus = async (jobId, newStatus) => {
    try {
      const res = await axios.put(`${apiUrl}/ManageJobs/${jobId}/status`, {
        status: newStatus,
      });

      const updatedNotif = await axios.get(`${apiUrl}/notif/${freelancerId}`);
      setActivities(updatedNotif.data);
      setActiveNotif(null);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleHire = async (clientId, updatedStatus) => {
    const freelancerId = JSON.parse(localStorage.getItem("user"))?._id;

    try {
      const existingNotif = await axios.get(`${apiUrl}/notif/${freelancerId}`);

      const alreadyNotified = existingNotif.data.some(
        (n) =>
          n.receiverId === clientId &&
          n.status === updatedStatus &&
          n._id === activeNotif._id
      );

      if (!alreadyNotified) {
        await axios.post(`${apiUrl}/notif`, {
          senderId: freelancerId,
          receiverId: clientId,
          message: `The job "${activeNotif.category}" has been ${updatedStatus}`,
          note: activeNotif.note,
          status: updatedStatus,
        });
      }
    } catch (err) {
      console.error("handleHire() failed:", err);
      alert("Failed to send notification");
    }
  };

  return (
    <div className="bg-secondary vh-100 p-3">
      {activeNotif && (
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
            <h5 className="text-center">{activeNotif.category}</h5>
            <p>Message: {activeNotif.message}</p>
            <p>Note: {activeNotif.note}</p>
            <p>Status: {activeNotif.status}</p>
            <div className="d-flex justify-content-between mb-2">
              {usertype === "Freelancer" ? (
                activeNotif.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-success h-75 d-flex align-items-center"
                      style={{ fontSize: "12px", zIndex: 2000 }}
                      onClick={() => {
                        updateStatus(activeNotif._id, "accepted");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger h-75 d-flex align-items-center"
                      style={{ fontSize: "12px", zIndex: 2000 }}
                      onClick={() => {
                        updateStatus(activeNotif._id, "declined");
                      }}
                    >
                      Decline
                    </button>
                  </>
                ) : activeNotif.status === "accepted" ? (
                  <>
                    <button
                      className="btn btn-danger h-75 d-flex align-items-center"
                      style={{ fontSize: "12px", zIndex: 2000 }}
                      onClick={() => {
                        updateStatus(activeNotif._id, "cancelled");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : activeNotif.status === "declined" ? (
                  <>
                    <h3 className="text-danger">
                      You have Declined This Job Offer
                    </h3>
                  </>
                ) : activeNotif.status === "cancelled" ? (
                  <>
                    <h3 className="text-danger">You have Cancelled This Job</h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-success">
                      This Job Flagged as Completed
                    </h3>
                  </>
                )
              ) : activeNotif.status === "pending" ? (
                <>
                  <button
                    className="btn btn-danger h-75 d-flex align-items-center"
                    style={{ fontSize: "12px", zIndex: 2000 }}
                    onClick={() => {
                      updateStatus(activeNotif._id, "cancelled");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : activeNotif.status === "accepted" ? (
                <>
                  <button
                    className="btn btn-success h-75 d-flex align-items-center"
                    style={{ fontSize: "12px", zIndex: 2000 }}
                    onClick={() => {
                      updateStatus(activeNotif._id, "completed");
                    }}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-danger h-75 d-flex align-items-center"
                    style={{ fontSize: "12px", zIndex: 2000 }}
                    onClick={() => {
                      updateStatus(activeNotif._id, "cancelled");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : activeNotif.status === "declined" ? (
                <>
                  <h3 className="text-danger">
                    The freelancer Declined This Job
                  </h3>
                </>
              ) : activeNotif.status === "cancelled" ? (
                <>
                  <h3 className="text-danger">You have Cancelled This Job</h3>
                </>
              ) : (
                <>
                  <h3 className="text-success">
                    You Flagged This Job as Completed
                  </h3>
                </>
              )}
            </div>

            <span
              className="position-absolute bottom-0 m-2"
              style={{ fontSize: "12px", right: "10px", marginBottom: "7px" }}
            >
              {new Date(activeNotif.createdAt).toLocaleString()}
            </span>
            <small style={{ color: "#777" }}>{activeNotif.date}</small>
            <button
              onClick={() => setActiveNotif(null)}
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
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        Activities
      </h2>
      <div className="h-75 overflow-auto">
        {usertype === "Freelancer" && Activities.length === 0 ? (
          <p>No Activities yet.</p>
        ) : (
          <ul className="space-y-3">
            {Activities.map((notif) => (
              <li
                onClick={() => setActiveNotif(notif)}
                key={notif._id}
                style={{ cursor: "pointer" }}
                className="w-100 bg-primary mt-2 p-2 rounded-5 fw-bold text-white w-75 position-relative overflow-hidden"
              >
                <>
                  <span>{notif.message}</span>
                  <span
                    className="position-absolute bottom-0 mb-0 m-2 text-muted"
                    style={{ fontSize: "10px", right: "70px" }}
                  >
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </>
              </li>
            ))}
          </ul>
        )}
        {usertype === "Client" && ActivitiesClient.length === 0 ? (
          <p>No Activities yet.</p>
        ) : (
          <ul className="space-y-3">
            {Activities.map((notif) => (
              <li
                onClick={() => setActiveNotif(notif)}
                key={notif._id}
                style={{ cursor: "pointer" }}
                className="w-100 bg-primary mt-2 p-2 rounded-5 fw-bold text-white w-75 position-relative overflow-hidden"
              >
                <>
                  <span>{notif.message}</span>
                  <span
                    className="position-absolute bottom-0 mb-0 m-2 text-muted"
                    style={{ fontSize: "10px", right: "70px" }}
                  >
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Activity;
