"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

type JobApplication = {
  id: number
  jobTitle: string
  companyName: string
  status: string
  dateApplied: string
}

type ApplicationStatisticsProps = {
  applications: JobApplication[]
  stats: {
    total: number
    pending: number
    accepted: number
    rejected: number
    byMonth: Record<string, number>
  }
}

export default function ApplicationStatistics({
  applications,
  stats,
}: ApplicationStatisticsProps) {
  const [showMonthly, setShowMonthly] = useState(false)

  const { total, pending, accepted, rejected, byMonth } = stats

  const statusData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "Number of Applications",
        data: [accepted, rejected, pending],
        backgroundColor: [
          "rgba(22, 163, 74, 0.4)",
          "rgba(220, 38, 38, 0.4)",
          "rgba(202, 138, 4, 0.4)",
        ],
      },
    ],
  }

  const monthlyData = {
    labels: Object.keys(byMonth),
    datasets: [
      {
        label: "Applications per Month",
        data: Object.values(byMonth),
        backgroundColor: "rgba(59, 130, 246, 0.4)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: showMonthly ? "Monthly Application Breakdown" : "Application Status Breakdown",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y
            }
            return label
          },
        },
      },
    },
  }

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4">Application Statistics</h2>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-sm">Total Applications</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-gray-600 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-600">{accepted}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-gray-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejected}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="chart-view"
          checked={showMonthly}
          onCheckedChange={setShowMonthly}
        />
        <Label htmlFor="chart-view">
          {showMonthly ? "Monthly View" : "Status View"}
        </Label>
      </div>

      <div className="h-64 w-full">
        <Bar data={showMonthly ? monthlyData : statusData} options={options} />
      </div>
    </div>
  )
}

