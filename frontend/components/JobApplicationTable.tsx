import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type JobApplication = {
  id: number;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
};

type JobApplicationTableProps = {
  applications: JobApplication[];
};

export default function JobApplicationTable({
  applications,
}: JobApplicationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.jobTitle}</TableCell>
              <TableCell>{app.companyName}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>
                {new Date(app.dateApplied).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            )}
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
