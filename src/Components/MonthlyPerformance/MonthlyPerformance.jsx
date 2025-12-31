"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  MdArrowBack,
  MdFileDownload,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./MonthlyPerformance.css";

const MonthlyPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const monthlyData = [
    {
      month: "January",
      carsSold: 22,
      totalProfit: "$23,534",
      totalExpense: "$12,231",
      totalTax: "$834",
      payments: "$500",
      dailyData: [
        {
          date: "Jan 1",
          carsSold: 2,
          profit: "$2,134",
          expense: "$1,045",
          tax: "$68",
          payment: "$42",
        },
        {
          date: "Jan 2",
          carsSold: 3,
          profit: "$2,456",
          expense: "$1,231",
          tax: "$72",
          payment: "$58",
        },
        {
          date: "Jan 3",
          carsSold: 1,
          profit: "$1,845",
          expense: "$945",
          tax: "$65",
          payment: "$35",
        },
        {
          date: "Jan 4",
          carsSold: 4,
          profit: "$3,234",
          expense: "$1,567",
          tax: "$89",
          payment: "$62",
        },
        {
          date: "Jan 5",
          carsSold: 2,
          profit: "$2,045",
          expense: "$1,123",
          tax: "$71",
          payment: "$45",
        },
        {
          date: "Jan 6",
          carsSold: 3,
          profit: "$2,678",
          expense: "$1,345",
          tax: "$78",
          payment: "$51",
        },
        {
          date: "Jan 7",
          carsSold: 1,
          profit: "$1,567",
          expense: "$856",
          tax: "$62",
          payment: "$38",
        },
        {
          date: "Jan 8",
          carsSold: 4,
          profit: "$3,456",
          expense: "$1,678",
          tax: "$92",
          payment: "$67",
        },
        {
          date: "Jan 9",
          carsSold: 2,
          profit: "$2,234",
          expense: "$1,134",
          tax: "$74",
          payment: "$46",
        },
        {
          date: "Jan 10",
          carsSold: 3,
          profit: "$2,789",
          expense: "$1,456",
          tax: "$81",
          payment: "$53",
        },
      ],
    },
    {
      month: "February",
      carsSold: 18,
      totalProfit: "$19,845",
      totalExpense: "$10,567",
      totalTax: "$723",
      payments: "$450",
      dailyData: [
        {
          date: "Feb 1",
          carsSold: 2,
          profit: "$2,045",
          expense: "$1,023",
          tax: "$67",
          payment: "$41",
        },
        {
          date: "Feb 2",
          carsSold: 3,
          profit: "$2,567",
          expense: "$1,345",
          tax: "$74",
          payment: "$57",
        },
        {
          date: "Feb 3",
          carsSold: 1,
          profit: "$1,734",
          expense: "$845",
          tax: "$61",
          payment: "$33",
        },
        {
          date: "Feb 4",
          carsSold: 4,
          profit: "$3,123",
          expense: "$1,456",
          tax: "$87",
          payment: "$64",
        },
        {
          date: "Feb 5",
          carsSold: 2,
          profit: "$2,134",
          expense: "$1,134",
          tax: "$69",
          payment: "$44",
        },
        {
          date: "Feb 6",
          carsSold: 3,
          profit: "$2,456",
          expense: "$1,234",
          tax: "$75",
          payment: "$52",
        },
        {
          date: "Feb 7",
          carsSold: 1,
          profit: "$1,845",
          expense: "$956",
          tax: "$63",
          payment: "$37",
        },
        {
          date: "Feb 8",
          carsSold: 2,
          profit: "$2,067",
          expense: "$1,067",
          tax: "$68",
          payment: "$45",
        },
        {
          date: "Feb 9",
          carsSold: 0,
          profit: "$0",
          expense: "$567",
          tax: "$23",
          payment: "$0",
        },
        {
          date: "Feb 10",
          carsSold: 0,
          profit: "$0",
          expense: "$345",
          tax: "$15",
          payment: "$0",
        },
      ],
    },
    {
      month: "March",
      carsSold: 25,
      totalProfit: "$28,456",
      totalExpense: "$14,789",
      totalTax: "$956",
      payments: "$625",
      dailyData: [
        {
          date: "Mar 1",
          carsSold: 3,
          profit: "$3,456",
          expense: "$1,678",
          tax: "$92",
          payment: "$67",
        },
        {
          date: "Mar 2",
          carsSold: 4,
          profit: "$4,123",
          expense: "$1,890",
          tax: "$104",
          payment: "$78",
        },
        {
          date: "Mar 3",
          carsSold: 2,
          profit: "$2,345",
          expense: "$1,234",
          tax: "$78",
          payment: "$52",
        },
        {
          date: "Mar 4",
          carsSold: 5,
          profit: "$4,567",
          expense: "$2,345",
          tax: "$123",
          payment: "$89",
        },
        {
          date: "Mar 5",
          carsSold: 3,
          profit: "$3,234",
          expense: "$1,567",
          tax: "$89",
          payment: "$67",
        },
        {
          date: "Mar 6",
          carsSold: 2,
          profit: "$2,456",
          expense: "$1,345",
          tax: "$81",
          payment: "$56",
        },
        {
          date: "Mar 7",
          carsSold: 1,
          profit: "$1,845",
          expense: "$956",
          tax: "$63",
          payment: "$45",
        },
        {
          date: "Mar 8",
          carsSold: 4,
          profit: "$3,890",
          expense: "$1,890",
          tax: "$101",
          payment: "$78",
        },
        {
          date: "Mar 9",
          carsSold: 2,
          profit: "$2,234",
          expense: "$1,134",
          tax: "$74",
          payment: "$52",
        },
        {
          date: "Mar 10",
          carsSold: 3,
          profit: "$3,067",
          expense: "$1,456",
          tax: "$86",
          payment: "$61",
        },
      ],
    },
    // ... Add similar data for other months
  ];

  const handleMonthClick = (monthData) => {
    setSelectedMonth(monthData);
    setShowDetailView(true);
  };

  const handleBackToMonthly = () => {
    setShowDetailView(false);
    setSelectedMonth(null);
  };

  const renderMonthlyView = () => (
    <>
      <div className="monthlyperformance-page-header">
        <div className="monthlyperformance-breadcrumb-container">
          <span className="monthlyperformance-breadcrumb">
            Dashboard / Monthly Performance
          </span>
        </div>
        <div className="monthlyperformance-page-controls">
          <div className="monthlyperformance-year-selector">
            <label>Year:</label>
            <div className="monthlyperformance-select-wrapper">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="monthlyperformance-year-select"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <FiChevronDown className="monthlyperformance-dropdown-icon" />
            </div>
          </div>

          <div className="monthlyperformance-header-actions">
            <button className="monthlyperformance-export-btn">
              <MdFileDownload />
              Export To Excel
            </button>
            <button className="monthlyperformance-download-btn">
              <MdFileDownload />
              Download Report PDF
            </button>
          </div>
        </div>
      </div>

      <div className="monthlyperformance-table-container">
        <div className="monthlyperformance-table-wrapper">
          <table className="monthlyperformance-performance-table">
            <thead>
              <tr>
                <th className="monthlyperformance-checkbox-cell">
                  <input type="checkbox" />
                </th>
                <th>
                  Month <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Cars Sold{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Total Profit{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Total Expense{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Total Tax{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Payments{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, index) => (
                <tr
                  key={index}
                  className="monthlyperformance-table-row"
                  onClick={() => handleMonthClick(row)}
                >
                  <td className="monthlyperformance-checkbox-cell">
                    <input type="checkbox" />
                  </td>
                  <td>{row.month}</td>
                  <td>{row.carsSold}</td>
                  <td className="monthlyperformance-profit-cell">
                    {row.totalProfit}
                  </td>
                  <td className="monthlyperformance-expense-cell">
                    {row.totalExpense}
                  </td>
                  <td className="monthlyperformance-tax-cell">
                    {row.totalTax}
                  </td>
                  <td className="monthlyperformance-payment-cell">
                    {row.payments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="monthlyperformance-table-footer">
          <div className="monthlyperformance-footer-left">
            <span className="monthlyperformance-results-label">
              Results per page
            </span>
            <select className="monthlyperformance-page-select">
              <option>12</option>
              <option>24</option>
              <option>48</option>
            </select>
          </div>
          <div className="monthlyperformance-pagination">
            <button
              className="monthlyperformance-pagination-btn monthlyperformance-pagination-prev"
              disabled
            >
              ‹ Prev
            </button>
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-active">
              1
            </button>
            <button className="monthlyperformance-pagination-btn">2</button>
            <button className="monthlyperformance-pagination-btn">3</button>
            <span className="monthlyperformance-pagination-ellipsis">...</span>
            <button className="monthlyperformance-pagination-btn">16</button>
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-next">
              Next ›
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderDetailView = () => (
    <>
      <div className="monthlyperformance-detail-header">
        <button
          className="monthlyperformance-back-btn"
          onClick={handleBackToMonthly}
        >
          <MdArrowBack />
          Back to Monthly View
        </button>
        <h2 className="monthlyperformance-detail-title">
          {selectedMonth?.month} {selectedYear} - Daily Performance
        </h2>
        <div className="monthlyperformance-detail-summary">
          <div className="monthlyperformance-summary-item">
            <span className="monthlyperformance-summary-label">
              Total Cars Sold:
            </span>
            <span className="monthlyperformance-summary-value">
              {selectedMonth?.carsSold}
            </span>
          </div>
          <div className="monthlyperformance-summary-item">
            <span className="monthlyperformance-summary-label">
              Total Profit:
            </span>
            <span className="monthlyperformance-summary-value monthlyperformance-profit-cell">
              {selectedMonth?.totalProfit}
            </span>
          </div>
          <div className="monthlyperformance-summary-item">
            <span className="monthlyperformance-summary-label">
              Total Expense:
            </span>
            <span className="monthlyperformance-summary-value monthlyperformance-expense-cell">
              {selectedMonth?.totalExpense}
            </span>
          </div>
        </div>
      </div>

      <div className="monthlyperformance-detail-table-container">
        <div className="monthlyperformance-detail-table-wrapper">
          <table className="monthlyperformance-detail-table">
            <thead>
              <tr>
                <th>
                  Date <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Cars Sold{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Profit <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Expense{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Tax <span className="monthlyperformance-sort-icon">↕</span>
                </th>
                <th>
                  Payment{" "}
                  <span className="monthlyperformance-sort-icon">↕</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedMonth?.dailyData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.carsSold}</td>
                  <td className="monthlyperformance-profit-cell">
                    {row.profit}
                  </td>
                  <td className="monthlyperformance-expense-cell">
                    {row.expense}
                  </td>
                  <td className="monthlyperformance-tax-cell">{row.tax}</td>
                  <td className="monthlyperformance-payment-cell">
                    {row.payment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="monthlyperformance-detail-footer">
          <button className="monthlyperformance-export-btn">
            <MdFileDownload />
            Export Daily Data
          </button>
          <div className="monthlyperformance-detail-pagination">
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-prev">
              ‹ Prev Week
            </button>
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-active">
              Week 1
            </button>
            <button className="monthlyperformance-pagination-btn">
              Week 2
            </button>
            <button className="monthlyperformance-pagination-btn">
              Week 3
            </button>
            <button className="monthlyperformance-pagination-btn">
              Week 4
            </button>
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-next">
              Next Week ›
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="monthlyperformance-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`monthlyperformance-main ${
          sidebarOpen
            ? "monthlyperformance-sidebar-open"
            : "monthlyperformance-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="monthlyperformance-header">
          <div className="monthlyperformance-header-left">
            <button
              className="monthlyperformance-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="monthlyperformance-page-title">
              {showDetailView
                ? `${selectedMonth?.month} ${selectedYear} Performance`
                : "Monthly Performance"}
            </h1>
          </div>

          <div className="monthlyperformance-header-actions">
            <button className="monthlyperformance-icon-btn">
              <MdSearch />
            </button>
            <button className="monthlyperformance-icon-btn">
              <MdSettings />
            </button>
            <button className="monthlyperformance-icon-btn monthlyperformance-notification-btn">
              <MdNotifications />
              <span className="monthlyperformance-notification-dot"></span>
            </button>
            <div className="monthlyperformance-user-profile">
              <div className="monthlyperformance-user-info">
                <span className="monthlyperformance-user-name">
                  Abram Schleifer
                </span>
                <span className="monthlyperformance-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="monthlyperformance">
          {showDetailView ? renderDetailView() : renderMonthlyView()}
        </div>
      </div>
    </div>
  );
};

export default MonthlyPerformance;
