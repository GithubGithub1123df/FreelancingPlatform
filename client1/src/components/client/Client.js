import axios from "axios";
import { useEffect, useState } from "react";

const Client = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Client")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);
  return (
    <>
      <div className="d-flex align-items-center justify-content-spaceBetween bg-secondary flex-column vh-100 w-100">
        <h1>Freelancers List</h1>

        <div className="d-flex align-items-center list-unstyled justify-content-spaceBetween m-2 flex-wrap overflow-y-scroll overflow-hidden w-100 vh-100 ">
          {users.length === 0 ? (
            <p>No Freelancers found.</p>
          ) : (
            <div className="d-flex align-items-center flex-wrap">
              {users.map((u, idx) => (
                <li
                  key={u._id}
                  className="m-4 bg-dark text-white border border-2 border-danger rounded-5 overflow-hidden p-2 text-center"
                  style={{ width: "270px", height: "270px" }}
                >
                  <div className="img">{/* <img href="" /> */}</div>
                  <div className="bottom-0">
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

export default Client;
