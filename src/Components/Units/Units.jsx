import { useEffect, useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdFilterList,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
  MdViewList,
  MdViewModule,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import { unitsApi } from "../services/api";
import "./Units.css";

const Units = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await unitsApi.getAll();
      setUnits(response.data.data.units);
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUnit = () => {
    navigate("/units/add");
  };

  const handleViewDetails = (unit) => {
    navigate(`/units/${unit._id}`);
  };

  const handleEdit = (unit, e) => {
    e.stopPropagation();
    navigate(`/units/edit/${unit._id}`); // Assuming frontend route uses :id
  };

  const handleDelete = async (unit, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this unit?")) {
      try {
        await unitsApi.delete(unit._id);
        fetchUnits(); // Refresh list
      } catch (error) {
        console.error("Error deleting unit:", error);
        alert("Failed to delete unit");
      }
    }
  };

  // Filter units based on search
  const filteredUnits = units.filter(
    (unit) =>
      (unit.customerName && unit.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (unit._id && unit._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (unit.title && unit.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUnits = filteredUnits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="units-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`units-main ${
          sidebarOpen ? "units-sidebar-open" : "units-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="units-header">
          <div className="units-header-left">
            <button
              className="units-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="units-page-title">Units</h1>
          </div>

          <div className="units-header-actions">
            <button className="units-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="units-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="units-icon-btn units-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="units-notification-dot"></span>
            </button>
            <div className="units-user-profile">
              <div className="units-user-info">
                <span className="units-user-name">Abram Schleifer</span>
                <span className="units-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="units-content">
          <div className="units-toolbar">
            <div className="units-search-box">
              <MdSearch className="units-search-icon" />
              <input
                type="text"
                placeholder="Search client name, car, etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="units-search-input"
              />
            </div>
            <div className="units-toolbar-actions">
              <button className="units-filter-btn">
                <MdFilterList /> Car type
              </button>
              <button className="units-filter-btn">
                <MdFilterList /> Status
              </button>
              <div className="units-view-toggle">
                <button
                  className={`units-view-btn ${
                    viewMode === "grid" ? "units-view-active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <MdViewModule />
                </button>
                <button
                  className={`units-view-btn ${
                    viewMode === "table" ? "units-view-active" : ""
                  }`}
                  onClick={() => setViewMode("table")}
                  aria-label="Table view"
                >
                  <MdViewList />
                </button>
              </div>
              <button className="units-add-unit-btn" onClick={handleAddUnit}>
                Add Unit
              </button>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : viewMode === "table" ? (
            <div className="units-table-container">
              <div className="units-table-responsive">
                <table className="units-table">
                  <thead>
                    <tr>
                      <th className="units-table-header">Title</th>
                      <th className="units-table-header">Vin Number</th>
                      <th className="units-table-header">Make</th>
                      <th className="units-table-header">Customer Name</th>
                      <th className="units-table-header">Investors</th>
                      <th className="units-table-header">Purchase</th>
                      <th className="units-table-header">Expenses</th>
                      <th className="units-table-header">Sale</th>
                      <th className="units-table-header">Profit</th>
                      <th className="units-table-header">Status</th>
                      <th className="units-table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUnits.map((unit) => {
                      const profit = (unit.saleAmount || 0) - (unit.purchaseAmount || 0) - (unit.expenses || 0) - (unit.taxAmount || 0);
                      return (
                      <tr
                        key={unit._id}
                        className="units-table-row"
                        onClick={() => handleViewDetails(unit)}
                      >
                        <td className="units-table-cell units-unit-id">
                          {unit.title}
                        </td>
                        <td className="units-table-cell units-vin-number">
                          {unit.vinNumber}
                        </td>
                        <td className="units-table-cell units-contact-no">
                          {unit.make}
                        </td>
                        <td className="units-table-cell">
                          <div className="units-customer-info">
                            {unit.customerName}
                          </div>
                        </td>
                        <td className="units-table-cell units-investor">
                          {unit.investors && unit.investors.length > 0 ? unit.investors.length : 0}
                        </td>
                        <td className="units-table-cell units-purchase">
                          ${unit.purchaseAmount?.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-expenses">
                          ${unit.expenses?.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-sale">
                          ${unit.saleAmount?.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-profit">
                          ${profit.toLocaleString()}
                        </td>
                        <td className="units-table-cell">
                          <span
                            className={`units-status-badge ${
                              unit.status === "in stock"
                                ? "units-status-instock"
                                : unit.status === "sold"
                                ? "units-status-sold"
                                : "units-status-default"
                            }`}
                          >
                            {unit.status}
                          </span>
                        </td>
                        <td className="units-table-cell units-actions">
                          <button
                            className="units-action-btn units-edit-btn"
                            onClick={(e) => handleEdit(unit, e)}
                          >
                            <MdEdit />
                            Edit
                          </button>
                          <button
                            className="units-action-btn units-delete-btn"
                            onClick={(e) => handleDelete(unit, e)}
                          >
                            <MdDelete />
                            Delete
                          </button>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="units-grid-container">
              <div className="units-grid">
                {paginatedUnits.map((unit) => (
                  <div
                    key={unit._id}
                    className="units-unit-card"
                    onClick={() => handleViewDetails(unit)}
                  >
                    <div className="units-unit-image">
                      {/* Using a placeholder or first image if available */}
                      <img src={unit.images && unit.images.length > 0 ? unit.images[0] : "https://placehold.co/600x400?text=No+Image"} alt={unit.title} />
                    </div>
                    <div className="units-unit-content">
                      <div className="units-unit-header-info">
                        <div>
                          <h3 className="units-unit-name">
                            {unit.title}
                          </h3>
                          <p className="units-unit-type">{unit.make}</p>
                        </div>
                        <div className="units-unit-price">
                          ${unit.saleAmount?.toLocaleString()}
                        </div>
                      </div>
                      <div className="units-unit-specs">
                        {/* Specs are not in backend model yet, putting placeholders or mapping available fields */}
                        <span>Vin: {unit.vinNumber}</span>
                      </div>
                      <button
                        className="units-view-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(unit);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="units-pagination">
            <div className="units-pagination-info">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredUnits.length)} of{" "}
              {filteredUnits.length} units
            </div>
            <div className="units-pagination-controls">
              <div className="units-per-page">
                <span className="units-per-page-label">Results per page:</span>
                <select
                  className="units-per-page-select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                  <option value="36">36</option>
                </select>
              </div>
              <div className="units-page-numbers">
                <button
                  className={`units-page-btn ${
                    currentPage === 1 ? "units-page-disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {/* Simplified pagination logic for now */}
                <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
                <button
                  className={`units-page-btn ${
                    currentPage === totalPages ? "units-page-disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Units;
