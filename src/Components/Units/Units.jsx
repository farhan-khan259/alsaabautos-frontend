import { useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdEventSeat,
  MdFilterList,
  MdLocalGasStation,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
  MdSpeed,
  MdViewList,
  MdViewModule,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import image1 from "../../Assets/Pictures/Image1.png";
import image2 from "../../Assets/Pictures/Image2.png";
import image3 from "../../Assets/Pictures/Image3.png";
import image4 from "../../Assets/Pictures/Image4.png";
import image5 from "../../Assets/Pictures/Image5.png";
import image6 from "../../Assets/Pictures/Image6.png";
import image7 from "../../Assets/Pictures/Image7.png";
import image8 from "../../Assets/Pictures/Image8.png";
import image9 from "../../Assets/Pictures/Image9.png";

import Sidebar from "../Sidebar/Sidebar";
import "./Units.css";

const Units = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const units = [
    {
      id: "RW-WZD001",
      vinNumber: "353534535",
      contactNo: "03401478382",
      customerName: "Kyle Thompson",
      investor: "Usmom, Horston",
      purchase: 12788,
      expenses: 567,
      sale: 22788,
      profit: 10000,
      status: "In Stock",
      type: "Convertible",
      seats: 2,
      fuel: "Petrol",
      transmission: "Automatic",
      image: image1,
    },
    {
      id: "RW-WZD002",
      vinNumber: "353534536",
      contactNo: "03401478383",
      customerName: "John Doe",
      investor: "Investor A",
      purchase: 15000,
      expenses: 567,
      sale: 25000,
      profit: 10000,
      status: "Sold",
      type: "Sedan",
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      image: image2,
    },
    {
      id: "RW-WZD003",
      vinNumber: "353534537",
      contactNo: "03401478384",
      customerName: "Jane Smith",
      investor: "Investor X",
      purchase: 18000,
      expenses: 567,
      sale: 28000,
      profit: 10000,
      status: "In Stock",
      type: "SUV",
      seats: 7,
      fuel: "Diesel",
      transmission: "Automatic",
      image: image3,
    },
    {
      id: "RW-WZD004",
      vinNumber: "353534538",
      contactNo: "03401478385",
      customerName: "Michael Brown",
      investor: "Investor Y",
      purchase: 22000,
      expenses: 567,
      sale: 32000,
      profit: 10000,
      status: "Sold",
      type: "SUV",
      seats: 5,
      fuel: "Diesel",
      transmission: "Automatic",
      image: image4,
    },
    {
      id: "RW-WZD005",
      vinNumber: "353534539",
      contactNo: "03401478386",
      customerName: "Emma Wilson",
      investor: "Investor Z",
      purchase: 14000,
      expenses: 567,
      sale: 21000,
      profit: 7000,
      status: "In Stock",
      type: "Hatchback",
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      image: image5,
    },
    {
      id: "RW-WZD006",
      vinNumber: "353534540",
      contactNo: "03401478387",
      customerName: "Daniel Lee",
      investor: "Investor A, Investor B",
      purchase: 26000,
      expenses: 567,
      sale: 36000,
      profit: 10000,
      status: "Sold",
      type: "Pickup",
      seats: 5,
      fuel: "Diesel",
      transmission: "Automatic",
      image: image6,
    },
    {
      id: "RW-WZD007",
      vinNumber: "353534541",
      contactNo: "03401478388",
      customerName: "Sophia Taylor",
      investor: "Investor C",
      purchase: 17000,
      expenses: 567,
      sale: 24000,
      profit: 7000,
      status: "In Stock",
      type: "Sedan",
      seats: 5,
      fuel: "Hybrid",
      transmission: "Automatic",
      image: image7,
    },
    {
      id: "RW-WZD008",
      vinNumber: "353534542",
      contactNo: "03401478389",
      customerName: "Chris Anderson",
      investor: "Investor D",
      purchase: 30000,
      expenses: 567,
      sale: 42000,
      profit: 12000,
      status: "Sold",
      type: "Luxury",
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      image: image8,
    },
    {
      id: "RW-WZD009",
      vinNumber: "353534543",
      contactNo: "03401478390",
      customerName: "Olivia Martin",
      investor: "Investor E",
      purchase: 19000,
      expenses: 567,
      sale: 27000,
      profit: 8000,
      status: "In Stock",
      type: "Crossover",
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      image: image9,
    },
  ];

  const navigate = useNavigate();

  const handleAddUnit = () => {
    navigate("/units/add");
  };

  const handleViewDetails = (unit) => {
    navigate(`/units/${unit.id}`);
  };

  const handleEdit = (unit, e) => {
    e.stopPropagation();
    navigate(`/units/edit/${unit.id}`);
  };

  const handleDelete = (unit, e) => {
    e.stopPropagation();
    console.log("Delete unit:", unit.id);
  };

  // Filter units based on search
  const filteredUnits = units.filter(
    (unit) =>
      unit.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase())
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

          {/* View Content */}
          {viewMode === "table" ? (
            <div className="units-table-container">
              <div className="units-table-responsive">
                <table className="units-table">
                  <thead>
                    <tr>
                      <th className="units-table-header">ID</th>
                      <th className="units-table-header">Vin Number</th>
                      <th className="units-table-header">Contact No</th>
                      <th className="units-table-header">Customer Name</th>
                      <th className="units-table-header">Investor</th>
                      <th className="units-table-header">Purchase</th>
                      <th className="units-table-header">Expenses</th>
                      <th className="units-table-header">Sale</th>
                      <th className="units-table-header">Profit</th>
                      <th className="units-table-header">Status</th>
                      <th className="units-table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUnits.map((unit) => (
                      <tr
                        key={unit.id}
                        className="units-table-row"
                        onClick={() => handleViewDetails(unit)}
                      >
                        <td className="units-table-cell units-unit-id">
                          {unit.id}
                        </td>
                        <td className="units-table-cell units-vin-number">
                          {unit.vinNumber}
                        </td>
                        <td className="units-table-cell units-contact-no">
                          {unit.contactNo}
                        </td>
                        <td className="units-table-cell">
                          <div className="units-customer-info">
                            {unit.customerName}
                          </div>
                        </td>
                        <td className="units-table-cell units-investor">
                          {unit.investor}
                        </td>
                        <td className="units-table-cell units-purchase">
                          ${unit.purchase.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-expenses">
                          ${unit.expenses.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-sale">
                          ${unit.sale.toLocaleString()}
                        </td>
                        <td className="units-table-cell units-profit">
                          ${unit.profit.toLocaleString()}
                        </td>
                        <td className="units-table-cell">
                          <span
                            className={`units-status-badge ${
                              unit.status === "In Stock"
                                ? "units-status-instock"
                                : unit.status === "Sold"
                                ? "units-status-sold"
                                : unit.status === "Pending"
                                ? "units-status-pending"
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="units-grid-container">
              <div className="units-grid">
                {paginatedUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className="units-unit-card"
                    onClick={() => handleViewDetails(unit)}
                  >
                    <div className="units-unit-image">
                      <img src={unit.image} alt={unit.customerName} />
                    </div>
                    <div className="units-unit-content">
                      <div className="units-unit-header-info">
                        <div>
                          <h3 className="units-unit-name">
                            {unit.customerName}
                          </h3>
                          <p className="units-unit-type">{unit.type}</p>
                        </div>
                        <div className="units-unit-price">
                          ${unit.sale.toLocaleString()}
                        </div>
                      </div>
                      <div className="units-unit-specs">
                        <div className="units-spec-item">
                          <MdSpeed />
                          <span>{unit.transmission}</span>
                        </div>
                        <div className="units-spec-item">
                          <MdEventSeat />
                          <span>{unit.seats} seats</span>
                        </div>
                        <div className="units-spec-item">
                          <MdLocalGasStation />
                          <span>{unit.fuel}</span>
                        </div>
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
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`units-page-btn ${
                          currentPage === pageNumber ? "units-page-active" : ""
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="units-page-dots">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
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
