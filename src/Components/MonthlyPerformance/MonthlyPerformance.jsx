"use client";

import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdArrowBack, MdFileDownload, MdMenu } from "react-icons/md";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import {
  expensesApi,
  paymentsApi,
  reportsApi,
  unitsApi,
} from "../services/api";
import "./MonthlyPerformance.css";

const MonthlyPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [loading, setLoading] = useState(true);

  const [rawData, setRawData] = useState({
    units: [],
    expenses: [],
    reports: [],
    payments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [unitsRes, expensesRes, reportsRes, paymentsRes] =
          await Promise.all([
            unitsApi.getAll(),
            expensesApi.getAll(),
            reportsApi.getAll(),
            paymentsApi.getAll(),
          ]);

        setRawData({
          units: unitsRes.data.data.units,
          expenses: expensesRes.data.data.expenses,
          reports: reportsRes.data.data.reports,
          payments: paymentsRes.data.data.payments,
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportToExcel = () => {
    if (!processedData || processedData.length === 0) {
      alert("No data to export");
      return;
    }

    // Prepare data for Excel
    const excelData = [];

    processedData.forEach((monthData) => {
      // Add month summary
      excelData.push({
        Month: monthData.month,
        "Cars Sold": monthData.carsSold,
        "Total Profit": monthData.totalProfit,
        "Total Expense": monthData.totalExpense,
        "Total Tax": monthData.totalTax,
        Payments: monthData.payments,
      });
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Performance");

    // Generate filename with date
    const filename = `Monthly_Performance_${selectedYear}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const handleDownloadPDF = () => {
    if (!processedData || processedData.length === 0) {
      alert("No data to download");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 15;

    // Add title
    doc.setFontSize(18);
    doc.text(
      `Monthly Performance Report - ${selectedYear}`,
      pageWidth / 2,
      yPosition,
      {
        align: "center",
      }
    );
    yPosition += 15;

    // Add date
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      yPosition,
      {
        align: "center",
      }
    );
    yPosition += 10;

    // Add summary for each month
    doc.setFontSize(11);
    processedData.forEach((monthData) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 15;
      }

      // Month title
      doc.setFont(undefined, "bold");
      doc.text(`${monthData.month}`, 14, yPosition);
      yPosition += 8;

      // Month data
      doc.setFont(undefined, "normal");
      const monthDetails = [
        `Cars Sold: ${monthData.carsSold}`,
        `Total Profit: ${monthData.totalProfit}`,
        `Total Expense: ${monthData.totalExpense}`,
        `Total Tax: ${monthData.totalTax}`,
        `Payments: ${monthData.payments}`,
      ];

      monthDetails.forEach((detail) => {
        doc.text(detail, 20, yPosition);
        yPosition += 6;
      });

      yPosition += 5;
    });

    // Generate filename
    const filename = `Monthly_Performance_${selectedYear}.pdf`;
    doc.save(filename);
  };

  const handleExportDailyData = () => {
    if (!selectedMonth || !processedData[selectedMonth]) {
      alert("Please select a month to export");
      return;
    }

    const monthData = processedData[selectedMonth];

    if (!monthData.dailyData || monthData.dailyData.length === 0) {
      alert("No daily data available for this month");
      return;
    }

    // Prepare daily data for Excel
    const excelData = monthData.dailyData.map((daily) => ({
      Date: daily.date,
      "Cars Sold": daily.carsSold,
      Profit: daily.profit,
      Expense: daily.expense,
      Tax: daily.tax,
      Payment: daily.payment,
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    const sheetName = monthData.month || "Daily Data";
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate filename
    const filename = `Daily_Data_${monthData.month}_${selectedYear}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const processedData = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Initialize structure for the selected year
    const dataByMonth = {};
    months.forEach((month, index) => {
      dataByMonth[index] = {
        month: month,
        monthIndex: index,
        carsSold: 0,
        totalProfit: 0,
        totalExpense: 0,
        totalTax: 0,
        payments: 0,
        dailyMap: {}, // Helper to aggregate daily data
      };
    });

    const getYearMonthDay = (dateStr) => {
      if (!dateStr) return null;
      const d = new Date(dateStr);
      return {
        year: d.getFullYear().toString(),
        month: d.getMonth(), // 0-11
        day: d.getDate(),
      };
    };

    // 1. Process Units (Cars Sold, Tax) - using saleDate
    rawData.units.forEach((unit) => {
      if (unit.status === "sold" && unit.saleDate) {
        const dateInfo = getYearMonthDay(unit.saleDate);
        if (dateInfo && dateInfo.year === selectedYear) {
          const mData = dataByMonth[dateInfo.month];
          mData.carsSold += unit.quantity || 1;
          mData.totalTax += unit.taxAmount || 0;

          // Daily aggregation
          if (!mData.dailyMap[dateInfo.day])
            mData.dailyMap[dateInfo.day] = createDailyEntry(
              dateInfo.month,
              dateInfo.day
            );
          mData.dailyMap[dateInfo.day].carsSold += unit.quantity || 1;
          mData.dailyMap[dateInfo.day].tax += unit.taxAmount || 0;
        }
      }
    });

    // 2. Process Reports (Profit) - using createdAt
    rawData.reports.forEach((report) => {
      const dateInfo = getYearMonthDay(report.createdAt);
      if (dateInfo && dateInfo.year === selectedYear) {
        const mData = dataByMonth[dateInfo.month];
        mData.totalProfit += report.netProfit || 0;

        if (!mData.dailyMap[dateInfo.day])
          mData.dailyMap[dateInfo.day] = createDailyEntry(
            dateInfo.month,
            dateInfo.day
          );
        mData.dailyMap[dateInfo.day].profit += report.netProfit || 0;
      }
    });

    // 3. Process Expenses - using date
    rawData.expenses.forEach((expense) => {
      const dateInfo = getYearMonthDay(expense.date);
      if (dateInfo && dateInfo.year === selectedYear) {
        const mData = dataByMonth[dateInfo.month];
        mData.totalExpense += expense.amount || 0;

        if (!mData.dailyMap[dateInfo.day])
          mData.dailyMap[dateInfo.day] = createDailyEntry(
            dateInfo.month,
            dateInfo.day
          );
        mData.dailyMap[dateInfo.day].expense += expense.amount || 0;
      }
    });

    // 4. Process Payments - using date
    rawData.payments.forEach((payment) => {
      const dateInfo = getYearMonthDay(payment.date);
      if (dateInfo && dateInfo.year === selectedYear) {
        const mData = dataByMonth[dateInfo.month];
        mData.payments += payment.amount || 0;

        if (!mData.dailyMap[dateInfo.day])
          mData.dailyMap[dateInfo.day] = createDailyEntry(
            dateInfo.month,
            dateInfo.day
          );
        mData.dailyMap[dateInfo.day].payment += payment.amount || 0;
      }
    });

    // Final formatting
    return Object.values(dataByMonth).map((monthData) => {
      // Convert dailyMap to array
      const dailyData = Object.values(monthData.dailyMap).sort(
        (a, b) => a.dayNum - b.dayNum
      );

      return {
        ...monthData,
        totalProfit: `${monthData.totalProfit.toLocaleString()}`,
        totalExpense: `${monthData.totalExpense.toLocaleString()}`,
        totalTax: `${monthData.totalTax.toLocaleString()}`,
        payments: `${monthData.payments.toLocaleString()}`,
        dailyData: dailyData.map((d) => ({
          date: `${monthData.month.substring(0, 3)} ${d.dayNum}`,
          carsSold: d.carsSold,
          profit: `${d.profit.toLocaleString()}`,
          expense: `${d.expense.toLocaleString()}`,
          tax: `${d.tax.toLocaleString()}`,
          payment: `${d.payment.toLocaleString()}`,
        })),
      };
    });
  }, [rawData, selectedYear]);

  function createDailyEntry(monthIndex, day) {
    return {
      dayNum: day,
      carsSold: 0,
      profit: 0,
      expense: 0,
      tax: 0,
      payment: 0,
    };
  }

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
            <button
              className="monthlyperformance-export-btn"
              onClick={handleExportToExcel}
              title="Export to Excel"
            >
              <MdFileDownload />
              Export To Excel
            </button>
            <button
              className="monthlyperformance-download-btn"
              onClick={handleDownloadPDF}
              title="Download PDF"
            >
              <MdFileDownload />
              Download Report PDF
            </button>
          </div>
        </div>
      </div>

      <div className="monthlyperformance-table-container">
        <div className="monthlyperformance-table-wrapper">
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Loading...
            </div>
          ) : (
            <table className="monthlyperformance-performance-table">
              <thead>
                <tr>
                  <th className="monthlyperformance-checkbox-cell">
                    <input type="checkbox" />
                  </th>
                  <th>
                    Month{" "}
                    <span className="monthlyperformance-sort-icon">↕</span>
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
                {processedData.map((row, index) => (
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
          )}
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
            {/* Placeholder pagination logic */}
            <button className="monthlyperformance-pagination-btn" disabled>
              2
            </button>
            <button
              className="monthlyperformance-pagination-btn monthlyperformance-pagination-next"
              disabled
            >
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
              {selectedMonth?.dailyData.length > 0 ? (
                selectedMonth.dailyData.map((row, index) => (
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No activity recorded for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="monthlyperformance-detail-footer">
          <button className="monthlyperformance-export-btn">
            <MdFileDownload />
            Export Daily Data
          </button>
          <div className="monthlyperformance-detail-pagination">
            <button
              className="monthlyperformance-pagination-btn monthlyperformance-pagination-prev"
              disabled
            >
              ‹ Prev Week
            </button>
            <button className="monthlyperformance-pagination-btn monthlyperformance-pagination-active">
              Week 1
            </button>
            <button
              className="monthlyperformance-pagination-btn monthlyperformance-pagination-next"
              disabled
            >
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
