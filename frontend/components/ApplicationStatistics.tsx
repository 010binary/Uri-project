"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type JobApplication = {
  id: number;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
};

type ApplicationStatisticsProps = {
  applications: JobApplication[];
};

export default function ApplicationStatistics({
  applications,
}: ApplicationStatisticsProps) {
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);


  // Calculate specific counts
  const acceptedCount = applications.filter(app => app.status.toLowerCase() === 'accepted').length;
  const rejectedCount = applications.filter(app => app.status.toLowerCase() === 'rejected').length;
  const pendingCount = applications.filter(app => app.status.toLowerCase() === 'pending').length;


  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(202, 138, 4, 0.4)",
          "rgba(220, 38, 38, 0.4)",
          "rgba(22, 163, 74, 0.4)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Application Status Breakdown",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 w-full">
       <h2 className="text-2xl font-bold mb-4">Application Statistics</h2>
      
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-sm">Total Applications</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-gray-600 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-gray-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
