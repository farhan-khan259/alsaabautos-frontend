"use client";
import { useState } from "react";
import {
  MdArrowUpward,
  MdDelete,
  MdEdit,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Investors.css";

const Investors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const investorsData = [
    {
      id: "INV-WZ1001",
      name: "Kyle Thompson",
      contact: "03401476382",
      initialInvestment: "$320",
      currentBalance: "$834",
      joinDate: "12/06/2023",
      share: "10%",
      status: "Active",
    },
    {
      id: "INV-WZ1002",
      name: "Sarah Johnson",
      contact: "03401476383",
      initialInvestment: "$500",
      currentBalance: "$1,200",
      joinDate: "15/06/2023",
      share: "15%",
      status: "In Active",
    },
    {
      id: "INV-WZ1003",
      name: "Michael Chen",
      contact: "03401476384",
      initialInvestment: "$750",
      currentBalance: "$1,850",
      joinDate: "20/06/2023",
      share: "12%",
      status: "Active",
    },
    {
      id: "INV-WZ1004",
      name: "Emma Wilson",
      contact: "03401476385",
      initialInvestment: "$420",
      currentBalance: "$980",
      joinDate: "25/06/2023",
      share: "8%",
      status: "Active",
    },
    {
      id: "INV-WZ1005",
      name: "David Brown",
      contact: "03401476386",
      initialInvestment: "$600",
      currentBalance: "$1,450",
      joinDate: "30/06/2023",
      share: "18%",
      status: "In Active",
    },
    {
      id: "INV-WZ1006",
      name: "Lisa Martinez",
      contact: "03401476387",
      initialInvestment: "$280",
      currentBalance: "$650",
      joinDate: "05/07/2023",
      share: "6%",
      status: "Active",
    },
    {
      id: "INV-WZ1007",
      name: "Robert Taylor",
      contact: "03401476388",
      initialInvestment: "$900",
      currentBalance: "$2,100",
      joinDate: "10/07/2023",
      share: "20%",
      status: "Active",
    },
    {
      id: "INV-WZ1008",
      name: "Jennifer Lee",
      contact: "03401476389",
      initialInvestment: "$350",
      currentBalance: "$820",
      joinDate: "15/07/2023",
      share: "9%",
      status: "In Active",
    },
    {
      id: "INV-WZ1009",
      name: "James Wilson",
      contact: "03401476390",
      initialInvestment: "$680",
      currentBalance: "$1,550",
      joinDate: "20/07/2023",
      share: "14%",
      status: "Active",
    },
    {
      id: "INV-WZ1010",
      name: "Amanda Garcia",
      contact: "03401476391",
      initialInvestment: "$550",
      currentBalance: "$1,280",
      joinDate: "25/07/2023",
      share: "11%",
      status: "Active",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const navigate = useNavigate();

  // Filter investors based on search term
  const filteredInvestors = investorsData.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.contact.includes(searchTerm)
  );

  // Sort investors
  const sortedInvestors = [...filteredInvestors].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn];
    let bValue = b[sortColumn];

    // Handle numeric values with $ symbol
    if (sortColumn === "initialInvestment" || sortColumn === "currentBalance") {
      aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
      bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));
    }

    // Handle date values
    if (sortColumn === "joinDate") {
      aValue = new Date(aValue.split("/").reverse().join("-"));
      bValue = new Date(bValue.split("/").reverse().join("-"));
    }

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

  const handleEditInvestor = (investorId) => {
    navigate(`/investors/edit/${investorId}`);
  };

  const handleDeleteInvestor = (investor) => {
    if (window.confirm(`Are you sure you want to delete ${investor.name}?`)) {
      console.log("Delete investor:", investor);
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

          <div className="investors-header-actions">
            <button className="investors-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="investors-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="investors-icon-btn investors-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="investors-notification-dot"></span>
            </button>
            <div className="investors-user-profile">
              <div className="investors-user-info">
                <span className="investors-user-name">Abram Schleifer</span>
                <span className="investors-user-role">Admin</span>
              </div>
            </div>
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
                    onClick={() => handleSort("id")}
                    className="investors-sortable"
                  >
                    <div className="investors-th-content">
                      Investor ID {getSortIcon("id")}
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
                    onClick={() => handleSort("contact")}
                    className="investors-sortable"
                  >
                    <div className="investors-th-content">
                      Contact No {getSortIcon("contact")}
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
                    onClick={() => handleSort("share")}
                    className="investors-sortable"
                  >
                    <div className="investors-th-content">
                      Share {getSortIcon("share")}
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
                      key={investor.id}
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
                      <td className="investors-investor-id">{investor.id}</td>
                      <td className="investors-investor-name">
                        {investor.name}
                      </td>
                      <td className="investors-contact">{investor.contact}</td>
                      <td className="investors-initial-investment">
                        {investor.initialInvestment}
                      </td>
                      <td className="investors-current-balance">
                        {investor.currentBalance}
                      </td>
                      <td className="investors-join-date">
                        {investor.joinDate}
                      </td>
                      <td className="investors-share">{investor.share}</td>
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
                            onClick={() => handleEditInvestor(investor.id)}
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
