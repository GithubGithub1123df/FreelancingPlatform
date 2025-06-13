import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const Freelancer = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeUsers, setActiveUsers] = useState(null);
  const defaultMale =
    "https://cdn-icons-png.flaticon.com/512/4139/4139955.png ";
  const defaultFemale =
    "https://cdn-icons-png.flaticon.com/512/4140/4140078.png";

  useEffect(() => {
    fetch(`${apiUrl}/Freelancer`)
      .then((res) => res.json())
      .then((users) => {
        setData(users);
        setResults(users);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((user) =>
      [user.Fname, user.Lname, user.username, user.usertype].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setResults(filtered);
  }, [searchTerm, data]);
  return (
    <>
      <div className="d-flex align-items-center justify-content-spaceBetween bg-secondary flex-column vh-100 w-100">
        {activeUsers && (
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
                maxWidth: "1500px",
                width: "90%",
                height: "80%",
                position: "relative",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                overflow: "auto",
              }}
            >
              <div className="d-flex align-items-center justify-content-center mb-2">
                <img
                  src={
                    activeUsers.profileImage
                      ? `${activeUsers.profileImage}`
                      : activeUsers.gender === "Female"
                      ? defaultFemale
                      : defaultMale
                  }
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h5 className="text-center">{activeUsers.usertype}</h5>
              <p>Full Name: {activeUsers.Fname + " " + activeUsers.Lname}</p>
              <p>username: {activeUsers.username}</p>
              <p>email: {activeUsers.email}</p>
              <p>Phone: {activeUsers.phone}</p>
              <p>Age: {activeUsers.age}</p>
              <p>Gender: {activeUsers.gender}</p>

              <p>National ID: {activeUsers.nationalId}</p>

              <span
                className="position-absolute bottom-0 m-2"
                style={{ fontSize: "12px", right: "10px", marginBottom: "7px" }}
              >
                {activeUsers.CreatedAt + " " + activeUsers.timestamp}
              </span>
              <small style={{ color: "#777" }}>{activeUsers.date}</small>
              <button
                onClick={() => setActiveUsers(null)}
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
        <nav
          className="w-100"
          style={{
            height: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </nav>
        <h1 className="text-white">Clients List</h1>

        <div className="d-flex align-items-center list-unstyled justify-content-spaceBetween m-2 flex-wrap overflow-y-scroll overflow-hidden w-100 vh-100 ">
          {results.length === 0 ? (
            <p>No Freelancers found.</p>
          ) : (
            <div className="d-flex align-items-center flex-wrap">
              {results.map((u, idx) => (
                <li
                  onClick={() => setActiveUsers(u)}
                  key={u._id}
                  className="m-4 bg-dark text-white border border-2 border-danger rounded-5 overflow-hidden p-2 text-center"
                  style={{ width: "270px", height: "270px" }}
                >
                  <div className="bottom-0">
                    <img
                      src={
                        u.profileImage
                          ? `${u.profileImage}`
                          : u.gender === "Female"
                          ? defaultFemale
                          : defaultMale
                      }
                      alt="Profile"
                      className="rounded-circle mb-5"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <h5>
                      {u.Fname} {u.Lname}
                    </h5>
                    <h6>{u.usertype}</h6>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Freelancer;
