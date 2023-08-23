/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  paginate
}: PaginationProps) => (
  <div className="flex justify-center mt-4">
    <nav className="bg-white px-4 py-3 rounded-lg shadow-md">
      <ul className="flex gap-2">
        <li>
          <Button
            variant="outline"
            className="text-indigo-500"
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <Button
              variant={`${currentPage === index + 1 ? "default" : "outline"}`}
              className={`text-indigo-500 ${
                currentPage === index + 1 ? "font-semibold" : ""
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant="outline"
            className="text-indigo-500"
            onClick={handleNextPage}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  </div>
);

export default Pagination;
