import { useState, useEffect } from "react";
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
import { reportsApi } from "../services/api";
import "./PL.css";

const PL = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsApi.getAll();
      setReports(response.data.data.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => 
    (report.customerName && report.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (report.carId && report.carId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

          {/* Stats Cards - These could also be dynamic later */}
          <div className="pl-stats-section">
            <div className="pl-stats-card pl-notes-card">
              <h3 className="pl-stats-title">TOTAL SALE</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">
                  ${reports.reduce((acc, curr) => acc + (curr.salesPrice || 0), 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pl-stats-card pl-profit-card">
              <h3 className="pl-stats-title">Total Profit</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">
                  ${reports.reduce((acc, curr) => acc + (curr.netProfit || 0), 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pl-stats-card pl-investor-card">
              <h3 className="pl-stats-title">Active Investor</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">--</div> 
              </div>
            </div>
          </div>

          {/* P&L Table */}
          <div className="pl-table-section">
            <div className="pl-section-header">
              <h2 className="pl-section-title">P&L</h2>
            </div>
            <div className="pl-table-container">
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
              ) : (
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
                    {filteredReports.map((item) => (
                      <tr key={item._id}>
                        <td className="pl-can-id">{item.carId}</td>
                        <td className="pl-customer-name">{item.customerName}</td>
                        <td className="pl-investor">
                          {item.investors?.map(inv => inv.name).join(', ')}
                        </td>
                        <td className="pl-purchase">
                          ${item.purchasePrice?.toLocaleString()}
                        </td>
                        <td className="pl-sale">${item.salesPrice?.toLocaleString()}</td>
                        <td className="pl-net-profit">
                          ${item.netProfit?.toLocaleString()}
                        </td>
                        <td className="pl-investor-profit">
                          ${item.investors?.reduce((acc, curr) => acc + (curr.profit || 0), 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
