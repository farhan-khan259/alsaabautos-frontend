import { useState } from "react";
import {
  MdFilterList,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInvestor, setFilterInvestor] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const navigate = useNavigate();

  const paymentHistory = [
    {
      id: "PAY001",
      date: "12 Jan 2025",
      investor: "Adeel",
      source: "Investment",
      amount: "$12,231",
      method: "Bank Transfer",
      remarks: "Initial Investment",
    },
    {
      id: "PAY002",
      date: "12 Jan 2025",
      investor: "Farhan",
      source: "Profit",
      amount: "$150",
      method: "Cash",
      remarks: "Profit Share",
    },
    {
      id: "PAY003",
      date: "10 Jan 2025",
      investor: "Ali Khan",
      source: "Investment",
      amount: "$5,000",
      method: "Bank Transfer",
      remarks: "Additional Investment",
    },
    {
      id: "PAY004",
      date: "08 Jan 2025",
      investor: "Zara Motors",
      source: "Profit",
      amount: "$2,500",
      method: "Online Payment",
      remarks: "Monthly Profit",
      status: "Pending",
    },
    {
      id: "PAY005",
      date: "05 Jan 2025",
      investor: "Adeel",
      source: "Withdrawal",
      amount: "$3,000",
      method: "Bank Transfer",
      remarks: "Fund Withdrawal",
    },
    {
      id: "PAY006",
      date: "03 Jan 2025",
      investor: "Farhan",
      source: "Investment",
      amount: "$7,500",
      method: "Check",
      remarks: "New Investment",
    },
    {
      id: "PAY007",
      date: "01 Jan 2025",
      investor: "Ali Khan",
      source: "Profit",
      amount: "$1,200",
      method: "Bank Transfer",
      remarks: "Year-end Profit",
    },
    {
      id: "PAY008",
      date: "28 Dec 2024",
      investor: "Zara Motors",
      source: "Investment",
      amount: "$10,000",
      method: "Online Payment",
      remarks: "Capital Increase",
      status: "Failed",
    },
  ];

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.remarks.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesInvestor =
      filterInvestor === "All" || payment.investor === filterInvestor;

    const matchesMethod =
      filterMethod === "All" || payment.method === filterMethod;

    return matchesSearch && matchesInvestor && matchesMethod;
  });

  const handleSavePayment = () => {
    navigate("/payments");
  };

  const investors = ["All", "Adeel", "Farhan", "Ali Khan", "Zara Motors"];
  const methods = ["All", "Bank Transfer", "Cash", "Online Payment", "Check"];

  return (
    <div className="paymenthistory-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`paymenthistory-main ${
          sidebarOpen
            ? "paymenthistory-sidebar-open"
            : "paymenthistory-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="paymenthistory-header">
          <div className="paymenthistory-header-left">
            <button
              className="paymenthistory-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="paymenthistory-page-title">Payment History</h1>
          </div>

          <div className="paymenthistory-header-actions">
            <button className="paymenthistory-icon-btn">
              <MdSearch />
            </button>
            <button className="paymenthistory-icon-btn">
              <MdSettings />
            </button>
            <button className="paymenthistory-icon-btn paymenthistory-notification-btn">
              <MdNotifications />
              <span className="paymenthistory-notification-dot"></span>
            </button>
            <div className="paymenthistory-user-profile">
              <div className="paymenthistory-user-info">
                <span className="paymenthistory-user-name">
                  Abram Schleifer
                </span>
                <span className="paymenthistory-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="paymenthistory-content">
          {/* Toolbar */}
          <div className="paymenthistory-toolbar">
            <div className="paymenthistory-search-container">
              <MdSearch className="paymenthistory-search-icon" />
              <input
                type="text"
                placeholder="Search payment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="paymenthistory-search-input"
              />
            </div>

            <div className="paymenthistory-filter-container">
              <div className="paymenthistory-filter-group">
                <MdFilterList className="paymenthistory-filter-icon" />
                <select
                  value={filterInvestor}
                  onChange={(e) => setFilterInvestor(e.target.value)}
                  className="paymenthistory-filter-select"
                >
                  {investors.map((investor) => (
                    <option key={investor} value={investor}>
                      {investor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="paymenthistory-filter-group">
                <MdFilterList className="paymenthistory-filter-icon" />
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="paymenthistory-filter-select"
                >
                  {methods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="paymenthistory-save-payment-btn"
                onClick={handleSavePayment}
              >
                Save Payment
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="paymenthistory-table-container">
            <div className="paymenthistory-table-card">
              <div className="paymenthistory-table-responsive">
                <table className="paymenthistory-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Investor</th>
                      <th>Payment Source</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="paymenthistory-payment-id">
                          {payment.id}
                        </td>
                        <td className="paymenthistory-payment-date">
                          {payment.date}
                        </td>
                        <td className="paymenthistory-payment-investor">
                          {payment.investor}
                        </td>
                        <td className="paymenthistory-payment-source">
                          {payment.source}
                        </td>
                        <td className="paymenthistory-payment-amount">
                          {payment.amount}
                        </td>
                        <td className="paymenthistory-payment-method">
                          {payment.method}
                        </td>

                        <td className="paymenthistory-payment-remarks">
                          {payment.remarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="paymenthistory-pagination-container">
                <div className="paymenthistory-pagination-info">
                  Showing {filteredPayments.length} of {paymentHistory.length}{" "}
                  payments
                </div>
                <div className="paymenthistory-pagination-controls">
                  <button className="paymenthistory-pagination-btn" disabled>
                    Prev
                  </button>
                  <button className="paymenthistory-pagination-btn paymenthistory-pagination-active">
                    1
                  </button>
                  <button className="paymenthistory-pagination-btn">2</button>
                  <button className="paymenthistory-pagination-btn">3</button>
                  <button className="paymenthistory-pagination-btn">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
