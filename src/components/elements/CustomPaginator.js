import React, { useState, useEffect } from "react";
import "./../../css/pagination.css";
const CustomPaginator = ({ data = [], pageSize, render }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePrevious = () => {
    const newCurrentPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newCurrentPage);

    if (newCurrentPage < startPage) {
      setStartPage(Math.max(startPage - maxPageButtons, 1));
    }
  };

  const handleNext = () => {
    const newCurrentPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newCurrentPage);

    if (newCurrentPage >= startPage + maxPageButtons) {
      setStartPage(
        Math.min(startPage + maxPageButtons, totalPages - maxPageButtons + 1)
      );
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setStartPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setStartPage(Math.max(totalPages - maxPageButtons + 1, 1));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (
      pageNumber < startPage + 2 ||
      pageNumber > startPage + maxPageButtons - 3
    ) {
      setStartPage(
        Math.max(Math.min(pageNumber - 2, totalPages - maxPageButtons + 1), 1)
      );
    }
  };
  const maxPageButtons = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);
  const pageNumbers = Array.from(
    { length: Math.min(maxPageButtons, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div>
      {render(currentPageData)}
      <div className="pagination-container">
        <div className="pagination">
          <button
            className="page-link page-item"
            title="Drag you to the first page"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>

          <button
            className="page-link page-item"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {pageNumbers.map((number) => (
            <div
              className={`page-item ${number === currentPage ? "active" : ""}`}
              key={number}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(number)}
                disabled={number === currentPage}
              >
                {number}
              </button>
            </div>
          ))}

          <button
            className="page-link page-item next-button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <button
            className="page-link page-item"
            title="Drag you to the last page"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPaginator;
