"use client";

import { useState, useEffect } from "react";
import JobApplicationTable from "./JobApplicationTable";
import ApplicationStatistics from "./ApplicationStatistics";
import DateRangeFilter from "./DateRangeFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dateApplied");
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/applications", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    };

    fetchData();
  }, []);

  const filteredApplications = applications
    .filter((app) => {
      if (statusFilter !== "all" && app.status !== statusFilter) return false;
      if (
        dateRange.start &&
        new Date(app.dateApplied) < new Date(dateRange.start)
      )
        return false;
      if (dateRange.end && new Date(app.dateApplied) > new Date(dateRange.end))
        return false;
      return true;
    })
    .sort(
      (a, b) => new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <DateRangeFilter onDateRangeChange={setDateRange} />
        <div className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateApplied">Sort by Date</SelectItem>
              <SelectItem value="companyName">Sort by Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <JobApplicationTable applications={filteredApplications} />
      <ApplicationStatistics applications={filteredApplications} />
    </div>
  );
}
