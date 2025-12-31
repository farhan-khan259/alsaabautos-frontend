import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdAdd,
  MdAttachMoney,
  MdCalendarToday,
  MdMenu,
  MdNotifications,
  MdPerson,
  MdPrint,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./PL.css";

const PL = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for the table
  const plData = [
    {
      id: "101",
      customerName: "Mongal Trader",
      investor: "Ustman, Adeel/Farhan",
      purchase: 50008,
      sale: 72005,
      netProfit: 18005,
      investorProfit: 4505,
    },
    {
      id: "102",
      customerName: "ABC Corporation",
      investor: "Investor X, Investor Y",
      purchase: 45000,
      sale: 65000,
      netProfit: 20000,
      investorProfit: 5000,
    },
    {
      id: "103",
      customerName: "XYZ Enterprises",
      investor: "Smith, Johnson",
      purchase: 60000,
      sale: 85000,
      netProfit: 25000,
      investorProfit: 6250,
    },
    {
      id: "104",
      customerName: "Global Traders",
      investor: "Wilson, Brown",
      purchase: 55000,
      sale: 78000,
      netProfit: 23000,
      investorProfit: 5750,
    },
  ];

  return (
    <div className="pl-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`pl-main ${
          sidebarOpen ? "pl-sidebar-open" : "pl-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="pl-header">
          <div className="pl-header-left">
            <button
              className="pl-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="pl-page-title">Sales And Summary Reports</h1>
          </div>

          <div className="pl-header-actions">
            <button className="pl-icon-btn">
              <MdSearch />
            </button>
            <button className="pl-icon-btn">
              <MdSettings />
            </button>
            <button className="pl-icon-btn pl-notification-btn">
              <MdNotifications />
              <span className="pl-notification-dot"></span>
            </button>
            <div className="pl-user-profile">
              <div className="pl-user-info">
                <span className="pl-user-name">Abram Schleifer</span>
                <span className="pl-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pl-content">
          {/* Dashboard Section */}
          <div className="pl-dashboard-section">
            <div className="pl-dashboard-header">
              <div className="pl-dashboard-controls">
                <div className="pl-filter-group">
                  <div className="pl-filter-item">
                    <MdCalendarToday className="pl-filter-icon" />
                    <select className="pl-filter-select">
                      <option>Month</option>
                      <option>Week</option>
                      <option>Year</option>
                    </select>
                  </div>
                  <div className="pl-filter-item">
                    <MdPerson className="pl-filter-icon" />
                    <select className="pl-filter-select">
                      <option>Customer</option>
                      <option>All Customers</option>
                      <option>Regular</option>
                    </select>
                  </div>
                  <div className="pl-filter-item">
                    <MdAttachMoney className="pl-filter-icon" />
                    <select className="pl-filter-select">
                      <option>Investor</option>
                      <option>All Investors</option>
                      <option>Active</option>
                    </select>
                  </div>
                  <div className="pl-search-box">
                    <MdSearch className="pl-search-icon" />
                    <input
                      type="text"
                      placeholder="Search for client"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-search-input"
                    />
                  </div>
                  <div className="pl-dashboard-actions">
                    <button className="pl-action-btn pl-primary-btn">
                      <MdPrint />
                      Print Report
                    </button>
                    <Link to="/pl/addreport">
                      <button className="pl-action-btn pl-secondary-btn">
                        <MdAdd />
                        Add Report
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="pl-stats-section">
            <div className="pl-stats-card pl-notes-card">
              <h3 className="pl-stats-title">TOTAL SALE</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">$13000</div>
              </div>
            </div>

            <div className="pl-stats-card pl-profit-card">
              <h3 className="pl-stats-title">Total Profit</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">$3100</div>
              </div>
            </div>

            <div className="pl-stats-card pl-investor-card">
              <h3 className="pl-stats-title">Active Investor</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">06</div>
              </div>
            </div>
          </div>

          {/* P&L Table */}
          <div className="pl-table-section">
            <div className="pl-section-header">
              <h2 className="pl-section-title">P&L</h2>
            </div>
            <div className="pl-table-container">
              <table className="pl-table">
                <thead>
                  <tr>
                    <th>Car ID</th>
                    <th>Customer Name</th>
                    <th>Investor</th>
                    <th>Purchase</th>
                    <th>Sale</th>
                    <th>Net Profit</th>
                    <th>Investor Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {plData.map((item) => (
                    <tr key={item.id}>
                      <td className="pl-can-id">{item.id}</td>
                      <td className="pl-customer-name">{item.customerName}</td>
                      <td className="pl-investor">{item.investor}</td>
                      <td className="pl-purchase">
                        ${item.purchase.toLocaleString()}
                      </td>
                      <td className="pl-sale">${item.sale.toLocaleString()}</td>
                      <td className="pl-net-profit">
                        ${item.netProfit.toLocaleString()}
                      </td>
                      <td className="pl-investor-profit">
                        ${item.investorProfit.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pl-pagination-section">
            <div className="pl-pagination-info">
              <span>Results per page:</span>
              <select className="pl-pagination-select">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="pl-pagination-controls">
              <button className="pl-pagination-btn">Prev</button>
              <button className="pl-pagination-btn pl-pagination-active">
                1
              </button>
              <button className="pl-pagination-btn">2</button>
              <button className="pl-pagination-btn">3</button>
              <button className="pl-pagination-btn">4</button>
              <button className="pl-pagination-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PL;
