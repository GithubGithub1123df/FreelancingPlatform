import React, { useState } from "react";
import { useLocation, useEffect } from "react-router-dom";

function Freelancer() {
  const { state } = useLocation();
  const users = state?.allUsers || [];
  const user = state?.user || [];

  const [selectedService, setSelectedService] = useState("Repair");

  return (
    <>
      <div className="w-75 d-flex justify-content-end vh-100 position-absolute top-0 end-0 bg-white flex-grow-1">
        <div className="w-100 position-absolute end-0 bg-dark h-100">
          {users.length === 0 ? (
            <p>No Clients found.</p>
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
}

export default Freelancer;
