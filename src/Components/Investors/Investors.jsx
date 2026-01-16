"use client";
import { useEffect, useState } from "react";
import {
  MdArrowUpward,
  MdDelete,
  MdEdit,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { investorsApi } from "../services/api";
import "./Investors.css";

const Investors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [investorsData, setInvestorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      const response = await investorsApi.getAll();
      setInvestorsData(response.data.data.investors);
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter investors based on search term
  const filteredInvestors = investorsData.filter(
    (investor) =>
      (investor.name &&
        investor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (investor.investorId &&
        investor.investorId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (investor.contactNo && investor.contactNo.includes(searchTerm))
  );

  // Sort investors
  const sortedInvestors = [...filteredInvestors].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn];
    let bValue = b[sortColumn];

    // Handle numeric values with $ symbol (if any in future)
    // Basic sorting for now
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedInvestors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvestors = sortedInvestors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle row selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentInvestors.map((_, index) => startIndex + index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => {
    const actualIndex = startIndex + index;
    if (selectedRows.includes(actualIndex)) {
      setSelectedRows(selectedRows.filter((i) => i !== actualIndex));
    } else {
      setSelectedRows([...selectedRows, actualIndex]);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column)
      return <span className="investors-sort-icon">↕</span>;
    return sortDirection === "asc" ? (
      <MdArrowUpward className="investors-sort-icon investors-sort-active" />
    ) : (
      <MdArrowUpward className="investors-sort-icon investors-sort-active investors-rotate-180" />
    );
  };

  const handleAddInvestor = () => {
    navigate("/investors/add");
  };

  const handleEditInvestor = (id) => {
    navigate(`/investors/edit/${id}`); // Assumes backend uses _id for internal routing, but investorId for display
  };

  const handleDeleteInvestor = async (investor) => {
    if (window.confirm(`Are you sure you want to delete ${investor.name}?`)) {
      try {
        await investorsApi.delete(investor._id); // Use backend _id
        fetchInvestors();
      } catch (error) {
        console.error("Error deleting investor:", error);
        alert("Failed to delete investor");
      }
    }
  };

  return (
    <div className="investors-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`investors-main ${
          sidebarOpen ? "investors-sidebar-open" : "investors-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="investors-header">
          <div className="investors-header-left">
            <button
              className="investors-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="investors-page-title">Investors</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="investors-content">
          <div className="investors-toolbar">
            <div className="investors-search-box">
              <MdSearch className="investors-search-icon" />
              <input
                type="text"
                placeholder="Search for investor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="investors-search-input"
              />
            </div>
            <div className="investors-toolbar-actions">
              <button
                className="investors-add-investor-btn"
                onClick={handleAddInvestor}
              >
                Add Investor
              </button>
              <span className="investors-results-count">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, sortedInvestors.length)} of{" "}
                {sortedInvestors.length} results
              </span>
            </div>
          </div>

          <div className="investors-table-container">
            {loading ? (
              <div className="investors-no-results">Loading...</div>
            ) : (
              <table className="investors-table">
                <thead>
                  <tr>
                    <th className="investors-checkbox-column">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          currentInvestors.length > 0 &&
                          selectedRows.length === currentInvestors.length
                        }
                        aria-label="Select all investors"
                      />
                    </th>
                    <th
                      onClick={() => handleSort("investorId")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Investor ID {getSortIcon("investorId")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("name")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Investor Name {getSortIcon("name")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("contactNo")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Contact No {getSortIcon("contactNo")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("initialInvestment")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Initial Investment {getSortIcon("initialInvestment")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("currentBalance")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Current Balance {getSortIcon("currentBalance")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("joinDate")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Join Date {getSortIcon("joinDate")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("profitShare")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Share {getSortIcon("profitShare")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="investors-sortable"
                    >
                      <div className="investors-th-content">
                        Status {getSortIcon("status")}
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvestors.length > 0 ? (
                    currentInvestors.map((investor, index) => (
                      <tr
                        key={investor._id}
                        className={
                          selectedRows.includes(startIndex + index)
                            ? "investors-row-selected"
                            : ""
                        }
                      >
                        <td className="investors-checkbox-column">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(startIndex + index)}
                            onChange={() => handleSelectRow(index)}
                            aria-label={`Select ${investor.name}`}
                          />
                        </td>
                        <td className="investors-investor-id">
                          {investor.investorId}
                        </td>
                        <td className="investors-investor-name">
                          {investor.name}
                        </td>
                        <td className="investors-contact">
                          {investor.contactNo}
                        </td>
                        <td className="investors-initial-investment">
                          {investor.initialInvestment}
                        </td>
                        <td className="investors-current-balance">
                          {investor.currentBalance}
                        </td>
                        <td className="investors-join-date">
                          {new Date(investor.joinDate).toLocaleDateString()}
                        </td>
                        <td className="investors-share">
                          {investor.profitShare}%
                        </td>
                        <td className="investors-status-cell">
                          <span
                            className={`investors-status-badge investors-status-${investor.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {investor.status}
                          </span>
                        </td>
                        <td className="investors-action-cell">
                          <div className="investors-action-buttons">
                            <button
                              className="investors-action-btn investors-edit-btn"
                              onClick={() => handleEditInvestor(investor._id)}
                              title="Edit investor"
                              aria-label={`Edit ${investor.name}`}
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="investors-action-btn investors-delete-btn"
                              onClick={() => handleDeleteInvestor(investor)}
                              title="Delete investor"
                              aria-label={`Delete ${investor.name}`}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="investors-no-results">
                        No investors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="investors-pagination">
            <div className="investors-pagination-left">
              <span className="investors-pagination-info">
                Results per page:
              </span>
              <select
                className="investors-pagination-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
              <span className="investors-pagination-total">
                Total {sortedInvestors.length} results
              </span>
            </div>
            <div className="investors-pagination-pages">
              <button
                className="investors-pagination-btn investors-pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                if (pageNum < 1 || pageNum > totalPages) return null;

                if (i === 3 && currentPage < totalPages - 2 && totalPages > 5) {
                  return (
                    <span key="ellipsis" className="investors-pagination-dots">
                      ...
                    </span>
                  );
                }

                if (i === 4 && totalPages > 5) {
                  return (
                    <button
                      key={totalPages}
                      className={`investors-pagination-btn ${
                        currentPage === totalPages
                          ? "investors-pagination-active"
                          : ""
                      }`}
                      onClick={() => handlePageChange(totalPages)}
                      aria-label={`Page ${totalPages}`}
                    >
                      {totalPages}
                    </button>
                  );
                }

                return (
                  <button
                    key={pageNum}
                    className={`investors-pagination-btn ${
                      currentPage === pageNum
                        ? "investors-pagination-active"
                        : ""
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="investors-pagination-btn investors-pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;
