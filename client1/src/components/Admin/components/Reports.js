import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const Reports = () => {
  const [reportData, setReportData] = useState({
    totalUsers: 0,
    totalFreelancers: 0,
    totalClients: 0,
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/Reports`);
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchData();
  }, []);

  const {
    totalUsers,
    totalFreelancers,
    totalClients,
    totalJobs,
    activeJobs,
    completedJobs,
  } = reportData;

  return (
    <div className="p-6 max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6">System Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ReportCard
          title="Total Users"
          value={totalUsers}
          color="bg-blue-100"
        />
        <ReportCard
          title="Freelancers"
          value={totalFreelancers}
          color="bg-green-100"
        />
        <ReportCard
          title="Clients"
          value={totalClients}
          color="bg-purple-100"
        />
        <ReportCard
          title="Total Jobs"
          value={totalJobs}
          color="bg-yellow-100"
        />
        <ReportCard
          title="Active Jobs"
          value={activeJobs}
          color="bg-orange-100"
        />
        <ReportCard
          title="Completed Jobs"
          value={completedJobs}
          color="bg-teal-100"
        />
      </div>
    </div>
  );
};

const ReportCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow ${color}`}>
    <h2 className="text-lg font-medium text-gray-700">{title}</h2>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Reports;
