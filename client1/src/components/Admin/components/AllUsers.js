import React, { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const AllUsers = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [activeUsers, setActiveUsers] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/AllUsers`)
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
    <div>
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
              maxWidth: "500px",
              width: "90%",
              position: "relative",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h5 className="text-center">{activeUsers.usertype}</h5>
            <p>Full Name: {activeUsers.Fname + " " + activeUsers.Lname}</p>
            <p>username: {activeUsers.username}</p>
            <p>email: {activeUsers.email}</p>
            <p>Phone: {activeUsers.phone}</p>
            <p>Age: {activeUsers.age}</p>
            <p>Gender: {activeUsers.gender}</p>

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
      <h2 className="text-center">All Users</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      {results.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="w-100 table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>username</th>
              </tr>
            </thead>
            <tbody>
              {results.map((u) => (
                <tr onClick={() => setActiveUsers(u)} key={u._id}>
                  <td>{u.Fname + " " + u.Lname}</td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
