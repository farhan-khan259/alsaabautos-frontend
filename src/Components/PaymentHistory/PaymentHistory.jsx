import { useEffect, useState } from "react";
import {
  MdFilterList,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { paymentsApi } from "../services/api";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInvestor, setFilterInvestor] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentsApi.getAll();
      setPayments(response.data.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.remarks && payment.remarks.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesInvestor =
      filterInvestor === "All" || payment.investor === filterInvestor;

    const matchesMethod =
      filterMethod === "All" || payment.method === filterMethod;

    return matchesSearch && matchesInvestor && matchesMethod;
  });

  const handleSavePayment = () => {
    navigate("/payments");
  };

  // Get unique investors and methods for filters
  const investors = ["All", ...new Set(payments.map(p => p.investor))];
  const methods = ["All", ...new Set(payments.map(p => p.method))];

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
                {loading ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
                ) : (
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
                        <tr key={payment._id}>
                          <td className="paymenthistory-payment-id">
                            {payment._id.substring(0, 8)}...
                          </td>
                          <td className="paymenthistory-payment-date">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="paymenthistory-payment-investor">
                            {payment.investor}
                          </td>
                          <td className="paymenthistory-payment-source">
                            {payment.source}
                          </td>
                          <td className="paymenthistory-payment-amount">
                            ${payment.amount?.toLocaleString()}
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
                )}
              </div>

              {/* Pagination */}
              <div className="paymenthistory-pagination-container">
                <div className="paymenthistory-pagination-info">
                  Showing {filteredPayments.length} of {payments.length}{" "}
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
