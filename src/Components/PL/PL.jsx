import { useEffect, useState } from "react";
import {
  MdAdd,
  MdAttachMoney,
  MdCalendarToday,
  MdDelete,
  MdEdit,
  MdMenu,
  MdPerson,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { reportsApi } from "../services/api";
import "./PL.css";

const PL = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const filteredReports = reports.filter(
    (report) =>
      (report.customerName &&
        report.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.carId &&
        report.carId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (id) => {
    navigate(`/pl/editreport/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await reportsApi.delete(id);
        fetchReports();
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete report");
      }
    }
  };

  const handlePrintReport = () => {
    if (filteredReports.length === 0) {
      alert("No reports to print");
      return;
    }

    // Create a new window for printing
    const printWindow = window.open("", "PRINT", "height=600,width=900");

    // Build HTML content for printing
    let htmlContent = `
      <html>
        <head>
          <title>P&L Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; text-align: left; font-weight: bold; }
            td { padding: 10px; border: 1px solid #e2e8f0; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .total-row { background-color: #e2e8f0; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Profit & Loss Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
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
    `;

    // Add data rows
    let totalSale = 0;
    let totalProfit = 0;
    let totalInvestorProfit = 0;

    filteredReports.forEach((item) => {
      const investorProfit =
        item.investors?.reduce((acc, curr) => acc + (curr.profit || 0), 0) || 0;
      totalSale += item.salesPrice || 0;
      totalProfit += item.netProfit || 0;
      totalInvestorProfit += investorProfit;

      htmlContent += `
        <tr>
          <td>${item.carId}</td>
          <td>${item.customerName}</td>
          <td>${item.investors?.map((inv) => inv.name).join(", ")}</td>
          <td>${(item.purchasePrice || 0).toLocaleString()}</td>
          <td>${(item.salesPrice || 0).toLocaleString()}</td>
          <td>${(item.netProfit || 0).toLocaleString()}</td>
          <td>${investorProfit.toLocaleString()}</td>
        </tr>
      `;
    });

    // Add totals row
    htmlContent += `
      <tr class="total-row">
        <td colspan="3">TOTALS</td>
        <td></td>
        <td>${totalSale.toLocaleString()}</td>
        <td>${totalProfit.toLocaleString()}</td>
        <td>${totalInvestorProfit.toLocaleString()}</td>
      </tr>
    </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportToExcel = () => {
    if (filteredReports.length === 0) {
      alert("No reports to export");
      return;
    }

    // Prepare data for Excel
    const excelData = filteredReports.map((item) => ({
      "Car ID": item.carId,
      "Customer Name": item.customerName,
      Investor: item.investors?.map((inv) => inv.name).join(", ") || "",
      "Purchase Price": item.purchasePrice || 0,
      "Sale Price": item.salesPrice || 0,
      "Net Profit": item.netProfit || 0,
      "Investor Profit":
        item.investors?.reduce((acc, curr) => acc + (curr.profit || 0), 0) || 0,
    }));

    // Add totals row
    const totalsRow = {
      "Car ID": "TOTAL",
      "Customer Name": "",
      Investor: "",
      "Purchase Price": filteredReports.reduce(
        (acc, curr) => acc + (curr.purchasePrice || 0),
        0
      ),
      "Sale Price": filteredReports.reduce(
        (acc, curr) => acc + (curr.salesPrice || 0),
        0
      ),
      "Net Profit": filteredReports.reduce(
        (acc, curr) => acc + (curr.netProfit || 0),
        0
      ),
      "Investor Profit": filteredReports.reduce(
        (acc, curr) =>
          acc + (curr.investors?.reduce((a, c) => a + (c.profit || 0), 0) || 0),
        0
      ),
    };

    excelData.push(totalsRow);

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 12 },
      { wch: 18 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "P&L Report");

    // Generate filename with date
    const filename = `PL_Report_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

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
                    <button
                      className="pl-dashboard-action-btn pl-primary-btn"
                      onClick={handlePrintReport}
                      title="Print report and export to Excel"
                    >
                      <MdPrint />
                      Print Report
                    </button>
                    <button
                      className="pl-dashboard-action-btn pl-secondary-btn"
                      onClick={handleExportToExcel}
                      title="Export to Excel"
                    >
                      Export to Excel
                    </button>
                    <Link to="/pl/addreport">
                      <button className="pl-dashboard-action-btn pl-secondary-btn">
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
                  {reports
                    .reduce((acc, curr) => acc + (curr.salesPrice || 0), 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pl-stats-card pl-profit-card">
              <h3 className="pl-stats-title">Total Profit</h3>
              <div className="pl-stats-content">
                <div className="pl-stats-value">
                  {reports
                    .reduce((acc, curr) => acc + (curr.netProfit || 0), 0)
                    .toLocaleString()}
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
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Loading...
                </div>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((item) => (
                      <tr key={item._id}>
                        <td className="pl-can-id">{item.carId}</td>
                        <td className="pl-customer-name">
                          {item.customerName}
                        </td>
                        <td className="pl-investor">
                          {item.investors?.map((inv) => inv.name).join(", ")}
                        </td>
                        <td className="pl-purchase">
                          {item.purchasePrice?.toLocaleString()}
                        </td>
                        <td className="pl-sale">
                          {item.salesPrice?.toLocaleString()}
                        </td>
                        <td className="pl-net-profit">
                          {item.netProfit?.toLocaleString()}
                        </td>
                        <td className="pl-investor-profit">
                          
                          {item.investors
                            ?.reduce((acc, curr) => acc + (curr.profit || 0), 0)
                            .toLocaleString()}
                        </td>
                        <td>
                          <div className="pl-action-buttons">
                            <button
                              className="pl-action-btn pl-edit-btn"
                              onClick={() => handleEdit(item._id)}
                              title="Edit report"
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="pl-action-btn pl-delete-btn"
                              onClick={() => handleDelete(item._id)}
                              title="Delete report"
                            >
                              <MdDelete />
                            </button>
                          </div>
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
