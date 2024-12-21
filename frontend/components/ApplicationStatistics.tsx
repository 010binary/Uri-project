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
  id: string;
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

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
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
      <p className="mb-4">Total Applications: {applications.length}</p>
      <div className="h-64 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
