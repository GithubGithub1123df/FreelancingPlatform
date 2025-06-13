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
    CancelledJobs: 0,
    PendingJobs: 0,
    DeclinedJobs: 0,
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
    CancelledJobs,
    PendingJobs,
    DeclinedJobs,
  } = reportData;

  return (
    <div className="p-6 max-w-5xl mx-auto mt-6 bg-secondary d-flex flex-column align-items-center">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        System Reports
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-75">
        <ReportCard title="Total Users" value={totalUsers} color="bg-white" />
        <ReportCard
          title="Freelancers"
          value={totalFreelancers}
          color="bg-white"
        />
        <ReportCard title="Clients" value={totalClients} color="bg-white" />
        <ReportCard
          title="Total Registered Jobs"
          value={totalJobs}
          color="bg-white"
        />
        <ReportCard title="Active Jobs" value={activeJobs} color="bg-white" />
        <ReportCard
          title="Completed Jobs"
          value={completedJobs}
          color="bg-white"
        />
        <ReportCard title="Pending Jobs" value={PendingJobs} color="bg-white" />
        <ReportCard
          title="Declined Jobs"
          value={DeclinedJobs}
          color="bg-white"
        />
        <ReportCard
          title="Canceled Jobs"
          value={CancelledJobs}
          color="bg-white"
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
