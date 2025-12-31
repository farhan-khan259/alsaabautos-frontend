"use client";

import { useState } from "react";
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
import "./Payments.css";

const Payments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState("investor-1");
  const [investors, setInvestors] = useState([
    { id: "investor-1", name: "Investor 1" },
  ]);

  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentSource: "",
    method: "",
    paymentDate: "",
    remarks: "",
    lotNumber: "",
  });

  const navigate = useNavigate();

  const investorData = {
    "investor-1": {
      name: "Investor 1",
      initialInvestment: 4,
      accumulatedProfit: 4,
      currentBalance: 45890,
    },
  };

  const handleAddInvestor = () => {
    const newInvestorNumber = investors.length + 1;
    setInvestors([
      ...investors,
      {
        id: `investor-${newInvestorNumber}`,
        name: `Investor ${newInvestorNumber}`,
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePayment = () => {
    console.log("Payment saved:", {
      investor: selectedInvestor,
      ...formData,
    });
    alert("Payment saved successfully!");
  };

  const handleViewHistory = () => {
    navigate("/payments/history");
  };

  const currentInvestor = investorData[selectedInvestor];

  return (
    <div className="payments-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`payments-main ${
          sidebarOpen ? "payments-sidebar-open" : "payments-sidebar-closed"
        }`}
      >
        {/* Header - Updated to match Payment History */}
        {/* Header - Updated to match Payment History */}
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
                >
                  <span>Save Payment</span>
                </button>
              </div>
            </div>

            <div className="payments-investor-content">
              <div className="payments-investor-selector">
                <div className="payments-dynamic-investors">
                  {investors.map((investor, index) => (
                    <div key={investor.id} className="payments-form-group">
                      <label className="payments-form-label">
                        Investor {index + 1} Name
                      </label>
                      <input
                        type="text"
                        value={investor.name}
                        onChange={(e) => {
                          const updated = [...investors];
                          updated[index].name = e.target.value;
                          setInvestors(updated);
                        }}
                        className="payments-form-input"
                        placeholder="Enter investor name"
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="payments-btn payments-btn-add"
                  onClick={handleAddInvestor}
                >
                  <MdAdd />
                  <span>Add Another Investor</span>
                </button>
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
                      ${currentInvestor?.initialInvestment}
                    </p>
                  </div>
                </div>

                <div className="payments-stat-card">
                  <div className="payments-stat-icon payments-stat-icon-profit">
                    <MdTrendingUp />
                  </div>
                  <div className="payments-stat-content">
                    <p className="payments-stat-label">Accumulated Profit</p>
                    <p className="payments-stat-value">
                      ${currentInvestor?.accumulatedProfit}
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
                      ${currentInvestor?.currentBalance?.toLocaleString()}
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
                    type="text"
                    name="paymentAmount"
                    placeholder="Enter Amount"
                    value={formData.paymentAmount}
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
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="check">Check</option>
                    <option value="wire">Wire Transfer</option>
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
                    name="paymentSource"
                    value={formData.paymentSource}
                    onChange={handleInputChange}
                    className="payments-form-select"
                  >
                    <option value="">Select</option>
                    <option value="account-1">Account 1</option>
                    <option value="account-2">Account 2</option>
                    <option value="account-3">Account 3</option>
                  </select>
                </div>

                <div className="payments-form-group">
                  <label className="payments-form-label">Payment Date</label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate}
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
