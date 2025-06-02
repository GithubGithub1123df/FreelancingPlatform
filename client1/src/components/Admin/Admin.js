import React, { useState } from "react";
import { useLocation, useEffect } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const serviceData = [
  { month: "Jan", Cleaning: 10, Repair: 5, Delivery: 8 },
  { month: "Feb", Cleaning: 12, Repair: 8, Delivery: 6 },
  { month: "Mar", Cleaning: 8, Repair: 7, Delivery: 10 },
  { month: "Apr", Cleaning: 15, Repair: 10, Delivery: 9 },
  { month: "May", Cleaning: 9, Repair: 6, Delivery: 7 },
  { month: "Jun", Cleaning: 14, Repair: 11, Delivery: 12 },
  { month: "Jul", Cleaning: 13, Repair: 9, Delivery: 8 },
  { month: "Aug", Cleaning: 11, Repair: 10, Delivery: 9 },
  { month: "Sep", Cleaning: 12, Repair: 7, Delivery: 6 },
  { month: "Oct", Cleaning: 10, Repair: 6, Delivery: 8 },
  { month: "Nov", Cleaning: 14, Repair: 9, Delivery: 7 },
  { month: "Dec", Cleaning: 15, Repair: 12, Delivery: 10 },
];
function Admin() {
  const { state } = useLocation();
  const users = state?.allUsers || [];
  const user = state?.user || [];

  const [selectedService, setSelectedService] = useState("Repair");

  return (
    <>
      <div className="w-75 d-flex justify-content-end vh-100 position-absolute top-0 end-0 bg-white flex-grow-1">
        <div className="w-100 position-absolute end-0 bg-dark h-100">
          <nav className="d-flex align-items-center justify-content-center flex-column">
            <div className="w-100 d-flex align-items-center justify-content-center position-relative">
              <h1>Dashboard</h1>
              <div className="position-absolute end-0 m-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <input type="text" placeholder="search" />
              </div>
            </div>
            <div className="position-relative mt-2">
              <ul className="d-flex align-items-center justify-content-center">
                <a
                  href="/ManageFreelancers"
                  className="text-decoration-none font-weight-bold"
                >
                  <li className="d-flex m-5 mt-0 mb-0 bg-primary p-3 rounded-4 text-white fw-bold">
                    Freelancers: <span className="FreelancerCount">{}</span>
                  </li>
                </a>
                <a
                  href="/AllClients"
                  className="text-decoration-none font-weight-bold"
                >
                  <li className="d-flex m-5 mt-0 mb-0 bg-primary p-3 rounded-4 text-white fw-bold">
                    Client: <span className="ClientCount">{}</span>
                  </li>
                </a>
                <a
                  href="/AllUsers"
                  className="text-decoration-none font-weight-bold"
                >
                  <li className="d-flex m-3 mt-0 mb-0 bg-primary p-3 rounded-4 text-white fw-bold">
                    All Users: <span className="fw-bold">{}</span>
                  </li>
                </a>
                <a href="" className="text-decoration-none font-weight-bold">
                  <li className="d-flex m-5 mt-0 mb-0 bg-primary p-3 rounded-4 text-white fw-bold">
                    Total Services:{" "}
                    <span className="ServicesCount">305785</span>
                  </li>
                </a>
              </ul>
            </div>
          </nav>

          <div className="h-100 w-100 d-flex align-items-center justify-content-center position-relative p-2">
            <div className="w-75">
              <div className="shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">
                  Monthly Service Report
                </h2>
                <select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Repair">Repair</option>
                  <option value="Delivery">Delivery</option>
                </select>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={selectedService} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-25 border border-2 border-black h-100">
              <h4 className="text-center position-absolute top-0">
                Top Services
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
