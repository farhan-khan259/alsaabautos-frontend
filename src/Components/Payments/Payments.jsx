"use client";

import { useState, useEffect } from "react";
import {
  MdAdd,
  MdAttachMoney,
  MdBarChart,
  MdHistory,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
  MdTrendingUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { paymentsApi, investorsApi } from "../services/api";
import "./Payments.css";

const Payments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState("");
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    method: "",
    date: "",
    remarks: "",
    lotNumber: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await investorsApi.getAll();
        const data = response.data.data.investors;
        setInvestors(data);
        if (data.length > 0) {
          setSelectedInvestor(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };
    fetchInvestors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePayment = async () => {
    if (!selectedInvestor) {
      alert("Please select an investor");
      return;
    }
    setLoading(true);
    try {
      const selectedInv = investors.find(inv => inv._id === selectedInvestor);
      const payload = {
        ...formData,
        investor: selectedInv ? selectedInv.name : "Unknown", // Backend model stores name or ID? frontend shows ID was stored, but displaying name. Let's store name for now based on previous code, or better ID if backend supports relation. Backend model has investor: String (required). I'll send name to match visual.
        amount: Number(formData.amount)
      };
      await paymentsApi.create(payload);
      alert("Payment saved successfully!");
      navigate("/payments/history");
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate("/payments/history");
  };

  const currentInvestor = investors.find(inv => inv._id === selectedInvestor);

  return (
    <div className="payments-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`payments-main ${
          sidebarOpen ? "payments-sidebar-open" : "payments-sidebar-closed"
        }`}
      >
        {/* Header */}
        <header className="payments-header">
          <div className="payments-header-left">
            <button
              className="payments-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="payments-page-title">Payments</h1>
          </div>

          <div className="payments-header-actions">
            <button className="payments-icon-btn">
              <MdSearch />
            </button>
            <button className="payments-icon-btn">
              <MdSettings />
            </button>
            <button className="payments-icon-btn payments-notification-btn">
              <MdNotifications />
              <span className="payments-notification-dot"></span>
            </button>
            <div className="payments-user-profile">
              <div className="payments-user-info">
                <span className="payments-user-name">Abram Schleifer</span>
                <span className="payments-user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="payments-content">
          {/* Select Investor Section */}
          <section className="payments-section">
            <div className="payments-section-header">
              <h2 className="payments-section-title">Select Investor</h2>
              <div className="payments-action-buttons">
                <button
                  className="payments-action-btn payments-action-secondary"
                  onClick={handleViewHistory}
                >
                  <MdHistory />
                  <span>View History</span>
                </button>
                <button
                  className="payments-action-btn payments-action-primary"
                  onClick={handleSavePayment}
                  disabled={loading}
                >
                  <span>{loading ? "Saving..." : "Save Payment"}</span>
                </button>
              </div>
            </div>

            <div className="payments-investor-content">
              <div className="payments-investor-selector">
                <div className="payments-dynamic-investors">
                  <div className="payments-form-group">
                    <label className="payments-form-label">
                      Investor Name
                    </label>
                    <select
                      value={selectedInvestor}
                      onChange={(e) => setSelectedInvestor(e.target.value)}
                      className="payments-form-select"
                    >
                      <option value="">Select Investor</option>
                      {investors.map((investor) => (
                        <option key={investor._id} value={investor._id}>
                          {investor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="payments-stats-grid">
                <div className="payments-stat-card">
                  <div className="payments-stat-icon payments-stat-icon-initial">
                    <MdAttachMoney />
                  </div>
                  <div className="payments-stat-content">
                    <p className="payments-stat-label">Initial Investment</p>
                    <p className="payments-stat-value">
                      ${currentInvestor?.initialInvestment?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>

                <div className="payments-stat-card">
                  <div className="payments-stat-icon payments-stat-icon-profit">
                    <MdTrendingUp />
                  </div>
                  <div className="payments-stat-content">
                    <p className="payments-stat-label">Profit Share</p>
                    <p className="payments-stat-value">
                      {currentInvestor?.profitShare || 0}%
                    </p>
                  </div>
                </div>

                <div className="payments-stat-card">
                  <div className="payments-stat-icon payments-stat-icon-balance">
                    <MdBarChart />
                  </div>
                  <div className="payments-stat-content">
                    <p className="payments-stat-label">Current Balance</p>
                    <p className="payments-stat-value">
                      ${currentInvestor?.currentBalance?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Details Section */}
          <section className="payments-section">
            <h2 className="payments-section-title">Payment Details</h2>

            <div className="payments-form-grid">
              {/* Left Column */}
              <div className="payments-form-column">
                <div className="payments-form-group">
                  <label className="payments-form-label">Payment Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="payments-form-input"
                  />
                </div>

                <div className="payments-form-group">
                  <label className="payments-form-label">Method</label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className="payments-form-select"
                  >
                    <option value="">Select</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Check">Check</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>

                <div className="payments-form-group">
                  <label className="payments-form-label">Remarks</label>
                  <textarea
                    name="remarks"
                    placeholder="Enter Remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="payments-form-textarea"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="payments-form-column">
                <div className="payments-form-group">
                  <label className="payments-form-label">Payment Source</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="payments-form-select"
                  >
                    <option value="">Select</option>
                    <option value="Investment">Investment</option>
                    <option value="Profit">Profit</option>
                    <option value="Withdrawal">Withdrawal</option>
                  </select>
                </div>

                <div className="payments-form-group">
                  <label className="payments-form-label">Payment Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="payments-form-input"
                  />
                </div>

                <div className="payments-form-group">
                  <label className="payments-form-label">Lot Number</label>
                  <input
                    type="text"
                    name="lotNumber"
                    placeholder="Enter Lot Number"
                    value={formData.lotNumber}
                    onChange={handleInputChange}
                    className="payments-form-input"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Payments;
