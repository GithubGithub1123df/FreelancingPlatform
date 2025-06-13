import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// blue, green, crimson red, purple, yellow
const COLORS = ["#007bff", "#28a745", "#FFFF00", "#A020F0", "#DC143C"];

const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const barData = [
    { name: "Users", count: stats.totalUsers },
    { name: "Jobs", count: stats.totalJobs },
  ];

  const pieData = [
    { name: "Active Jobs", value: stats.activeJobs },
    { name: "Completed Jobs", value: stats.completedJobs },
    { name: "pending Jobs", value: stats.PendingJobs },
    { name: "declined Jobs", value: stats.DeclinedJobs },
    { name: "cancelled Jobs", value: stats.CancelledJobs },
  ];

  return (
    <div className=" bg-secondary">
      <h2 className="mb-4 text-center fw-bold text-white">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3 bg-dark">
            <h5 className="text-center text-white">Users vs Jobs</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0076ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4 ">
          <div className="card shadow-sm p-3 bg-dark">
            <h5 className="text-center text-white">Job Status Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
