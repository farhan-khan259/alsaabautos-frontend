"use client";

import { useState } from "react";
import {
  MdAdd,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./EditReport.css";

const EditReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [investors, setInvestors] = useState(3); // Start with 3 investors for edit mode
  const [formData, setFormData] = useState({
    carId: "101",
    customerName: "Mangal Trader",
    purchasePrice: "5000",
    salesPrice: "7200",
  });

  const [investorData, setInvestorData] = useState({
    investor1: { name: "Usman", profit: "" },
    investor2: { name: "Adeel", profit: "" },
    investor3: { name: "Farhan", profit: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInvestorChange = (investorNum, field, value) => {
    setInvestorData((prev) => ({
      ...prev,
      [`investor${investorNum}`]: {
        ...prev[`investor${investorNum}`],
        [field]: value,
      },
    }));
  };

  const addInvestor = () => {
    if (investors < 5) {
      // Limit to 5 investors max
      setInvestors(investors + 1);
      // Initialize new investor data
      setInvestorData((prev) => ({
        ...prev,
        [`investor${investors + 1}`]: { name: "", profit: "" },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      investors: Object.keys(investorData).reduce((acc, key) => {
        if (parseInt(key.replace("investor", "")) <= investors) {
          acc[key] = investorData[key];
        }
        return acc;
      }, {}),
    };
    console.log("Updated Data:", submissionData);
  };

  return (
    <div className="editreport-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`editreport-main ${
          sidebarOpen ? "editreport-sidebar-open" : "editreport-sidebar-closed"
        }`}
      >
        {/* HEADER */}
        <div className="editreport-header">
          <div className="editreport-header-left">
            <button
              className="editreport-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="editreport-page-title">Edit Report</h1>
          </div>

          <div className="editreport-header-actions">
            <button className="editreport-icon-btn">
              <MdSearch />
            </button>
            <button className="editreport-icon-btn">
              <MdSettings />
            </button>
            <button className="editreport-icon-btn editreport-notification-btn">
              <MdNotifications />
              <span className="editreport-notification-dot"></span>
            </button>

            <div className="editreport-user">
              <strong className="editreport-user-name">Abram Schleifer</strong>
              <small className="editreport-user-role">Admin</small>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="editreport-content">
          <form className="editreport-card" onSubmit={handleSubmit}>
            <div className="editreport-card-header">
              <h2 className="editreport-card-title">Details</h2>

              <div className="editreport-actions">
                <button type="button" className="editreport-discard">
                  Discard
                </button>
                <button type="submit" className="editreport-save">
                  Save
                </button>
              </div>
            </div>

            {/* GRID */}
            <div className="editreport-grid">
              <div className="editreport-field">
                <label className="editreport-field-label">Car Id</label>
                <input
                  name="carId"
                  value={formData.carId}
                  onChange={handleChange}
                  className="editreport-field-input"
                />
              </div>

              <div className="editreport-field">
                <label className="editreport-field-label">Customer Name</label>
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="editreport-field-input"
                />
              </div>

              {/* Investor 1 */}
              <div className="editreport-field">
                <label className="editreport-field-label">Investor 1</label>
                <select
                  name="investor1"
                  value={investorData.investor1.name}
                  onChange={(e) =>
                    handleInvestorChange(1, "name", e.target.value)
                  }
                  className="editreport-field-select"
                >
                  <option value="Usman">Usman</option>
                  <option value="Adeel">Adeel</option>
                  <option value="Farhan">Farhan</option>
                </select>
              </div>

              {/* Investor 1 Profit */}
              <div className="editreport-field">
                <label className="editreport-field-label">
                  Investor 1 Profit %
                </label>
                <input
                  type="number"
                  placeholder="Enter Profit %"
                  value={investorData.investor1.profit}
                  onChange={(e) =>
                    handleInvestorChange(1, "profit", e.target.value)
                  }
                  className="editreport-field-input"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              {/* Investor 2 */}
              <div className="editreport-field">
                <label className="editreport-field-label">Investor 2</label>
                <select
                  name="investor2"
                  value={investorData.investor2.name}
                  onChange={(e) =>
                    handleInvestorChange(2, "name", e.target.value)
                  }
                  className="editreport-field-select"
                >
                  <option value="Adeel">Adeel</option>
                  <option value="Usman">Usman</option>
                  <option value="Farhan">Farhan</option>
                </select>
              </div>

              {/* Investor 2 Profit */}
              <div className="editreport-field">
                <label className="editreport-field-label">
                  Investor 2 Profit %
                </label>
                <input
                  type="number"
                  placeholder="Enter Profit %"
                  value={investorData.investor2.profit}
                  onChange={(e) =>
                    handleInvestorChange(2, "profit", e.target.value)
                  }
                  className="editreport-field-input"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              {/* Investor 3 */}
              <div className="editreport-field">
                <label className="editreport-field-label">Investor 3</label>
                <select
                  name="investor3"
                  value={investorData.investor3.name}
                  onChange={(e) =>
                    handleInvestorChange(3, "name", e.target.value)
                  }
                  className="editreport-field-select"
                >
                  <option value="Farhan">Farhan</option>
                  <option value="Usman">Usman</option>
                  <option value="Adeel">Adeel</option>
                </select>
              </div>

              {/* Investor 3 Profit */}
              <div className="editreport-field">
                <label className="editreport-field-label">
                  Investor 3 Profit %
                </label>
                <input
                  type="number"
                  placeholder="Enter Profit %"
                  value={investorData.investor3.profit}
                  onChange={(e) =>
                    handleInvestorChange(3, "profit", e.target.value)
                  }
                  className="editreport-field-input"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              {/* Additional investors (4, 5) */}
              {investors >= 4 && (
                <>
                  <div className="editreport-field">
                    <label className="editreport-field-label">Investor 4</label>
                    <select
                      value={investorData.investor4?.name || ""}
                      onChange={(e) =>
                        handleInvestorChange(4, "name", e.target.value)
                      }
                      className="editreport-field-select"
                    >
                      <option value="">Select</option>
                      <option value="Usman">Usman</option>
                      <option value="Adeel">Adeel</option>
                      <option value="Farhan">Farhan</option>
                    </select>
                  </div>

                  <div className="editreport-field">
                    <label className="editreport-field-label">
                      Investor 4 Profit %
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Profit %"
                      value={investorData.investor4?.profit || ""}
                      onChange={(e) =>
                        handleInvestorChange(4, "profit", e.target.value)
                      }
                      className="editreport-field-input"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </>
              )}

              {investors >= 5 && (
                <>
                  <div className="editreport-field">
                    <label className="editreport-field-label">Investor 5</label>
                    <select
                      value={investorData.investor5?.name || ""}
                      onChange={(e) =>
                        handleInvestorChange(5, "name", e.target.value)
                      }
                      className="editreport-field-select"
                    >
                      <option value="">Select</option>
                      <option value="Usman">Usman</option>
                      <option value="Adeel">Adeel</option>
                      <option value="Farhan">Farhan</option>
                    </select>
                  </div>

                  <div className="editreport-field">
                    <label className="editreport-field-label">
                      Investor 5 Profit %
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Profit %"
                      value={investorData.investor5?.profit || ""}
                      onChange={(e) =>
                        handleInvestorChange(5, "profit", e.target.value)
                      }
                      className="editreport-field-input"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </>
              )}

              {/* Add Investor Button */}
              <div className="editreport-field">
                <button
                  type="button"
                  className="editreport-add-investor"
                  onClick={addInvestor}
                  disabled={investors >= 5}
                >
                  <MdAdd /> Add Another Investor
                </button>
              </div>

              {/* Empty column for alignment */}
              <div className="editreport-field"></div>

              {/* Purchase and Sales Prices */}
              <div className="editreport-field">
                <label className="editreport-field-label">Purchase Price</label>
                <input
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  className="editreport-field-input"
                />
              </div>

              <div className="editreport-field">
                <label className="editreport-field-label">Sales Price</label>
                <input
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleChange}
                  className="editreport-field-input"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
