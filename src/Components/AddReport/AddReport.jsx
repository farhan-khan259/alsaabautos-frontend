"use client";

import { useState } from "react";
import { MdAdd, MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { reportsApi } from "../services/api";
import "./AddReport.css";

const AddReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [investors, setInvestors] = useState(2); // Start with 2 investors
  const [formData, setFormData] = useState({
    carId: "",
    customerName: "",
    purchasePrice: "",
    salesPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [investorData, setInvestorData] = useState({
    investor1: { name: "", profit: "" },
    investor2: { name: "", profit: "" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Transform investorData object to array
      const investorsArray = Object.keys(investorData).reduce((acc, key) => {
        if (parseInt(key.replace("investor", "")) <= investors) {
          const inv = investorData[key];
          if (inv.name && inv.profit) {
            acc.push({
              name: inv.name,
              profit: Number(inv.profit),
            });
          }
        }
        return acc;
      }, []);

      const payload = {
        ...formData,
        purchasePrice: Number(formData.purchasePrice),
        salesPrice: Number(formData.salesPrice),
        netProfit: Number(formData.salesPrice) - Number(formData.purchasePrice), // Calculate net profit
        investors: investorsArray,
      };

      await reportsApi.create(payload);
      alert("Report added successfully!");
      navigate("/pl");
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to add report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addreport-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`addreport-main ${
          sidebarOpen ? "addreport-sidebar-open" : "addreport-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="addreport-header">
          <div className="addreport-header-left">
            <button
              className="addreport-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="addreport-page-title">Add Report</h1>
          </div>
        </div>

        {/* Content */}
        <div className="addreport-content">
          <div className="addreport-form-container">
            <div className="addreport-form-header">
              <h2 className="addreport-form-title">Details</h2>

              <div className="addreport-form-header-actions">
                <button
                  className="addreport-remove-btn"
                  type="button"
                  onClick={() => navigate("/pl")}
                >
                  Cancel
                </button>
                <button
                  className="addreport-save-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            <form className="addreport-form" onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="addreport-form-grid">
                <div className="addreport-form-group">
                  <label>Car Id</label>
                  <input
                    type="text"
                    name="carId"
                    placeholder="Enter Id"
                    value={formData.carId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="addreport-form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Investors Section */}
              {/* First two investors in grid layout */}
              <div className="addreport-form-grid">
                <div className="addreport-form-group">
                  <label>Investor 1</label>
                  <select
                    value={investorData.investor1.name}
                    onChange={(e) =>
                      handleInvestorChange(1, "name", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Usman">Usman</option>
                    <option value="Adeel">Adeel</option>
                    <option value="Farhan">Farhan</option>
                  </select>
                </div>

                <div className="addreport-form-group">
                  <label>Investor 2</label>
                  <select
                    value={investorData.investor2.name}
                    onChange={(e) =>
                      handleInvestorChange(2, "name", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Usman">Usman</option>
                    <option value="Adeel">Adeel</option>
                    <option value="Farhan">Farhan</option>
                  </select>
                </div>
              </div>

              {/* Investor Profits in grid layout */}
              <div className="addreport-form-grid">
                <div className="addreport-form-group">
                  <label>Investor 1 Profit %</label>
                  <input
                    type="number"
                    placeholder="Enter Profit %"
                    value={investorData.investor1.profit}
                    onChange={(e) =>
                      handleInvestorChange(1, "profit", e.target.value)
                    }
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>

                <div className="addreport-form-group">
                  <label>Investor 2 Profit %</label>
                  <input
                    type="number"
                    placeholder="Enter Profit %"
                    value={investorData.investor2.profit}
                    onChange={(e) =>
                      handleInvestorChange(2, "profit", e.target.value)
                    }
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Additional investors (3, 4, 5) */}
              {investors >= 3 && (
                <div className="addreport-form-grid">
                  <div className="addreport-form-group">
                    <label>Investor 3</label>
                    <select
                      value={investorData.investor3?.name || ""}
                      onChange={(e) =>
                        handleInvestorChange(3, "name", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Usman">Usman</option>
                      <option value="Adeel">Adeel</option>
                      <option value="Farhan">Farhan</option>
                    </select>
                  </div>

                  <div className="addreport-form-group">
                    <label>Investor 3 Profit %</label>
                    <input
                      type="number"
                      placeholder="Enter Profit %"
                      value={investorData.investor3?.profit || ""}
                      onChange={(e) =>
                        handleInvestorChange(3, "profit", e.target.value)
                      }
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {investors >= 4 && (
                <div className="addreport-form-grid">
                  <div className="addreport-form-group">
                    <label>Investor 4</label>
                    <select
                      value={investorData.investor4?.name || ""}
                      onChange={(e) =>
                        handleInvestorChange(4, "name", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Usman">Usman</option>
                      <option value="Adeel">Adeel</option>
                      <option value="Farhan">Farhan</option>
                    </select>
                  </div>

                  <div className="addreport-form-group">
                    <label>Investor 4 Profit %</label>
                    <input
                      type="number"
                      placeholder="Enter Profit %"
                      value={investorData.investor4?.profit || ""}
                      onChange={(e) =>
                        handleInvestorChange(4, "profit", e.target.value)
                      }
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {investors >= 5 && (
                <div className="addreport-form-grid">
                  <div className="addreport-form-group">
                    <label>Investor 5</label>
                    <select
                      value={investorData.investor5?.name || ""}
                      onChange={(e) =>
                        handleInvestorChange(5, "name", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Usman">Usman</option>
                      <option value="Adeel">Adeel</option>
                      <option value="Farhan">Farhan</option>
                    </select>
                  </div>

                  <div className="addreport-form-group">
                    <label>Investor 5 Profit %</label>
                    <input
                      type="number"
                      placeholder="Enter Profit %"
                      value={investorData.investor5?.profit || ""}
                      onChange={(e) =>
                        handleInvestorChange(5, "profit", e.target.value)
                      }
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                className="addreport-add-investor-btn"
                onClick={addInvestor}
                disabled={investors >= 5}
              >
                <MdAdd /> Add Another Investor
              </button>

              {/* Prices Row */}
              <div className="addreport-form-grid">
                <div className="addreport-form-group">
                  <label>Purchase Price</label>
                  <input
                    type="number"
                    name="purchasePrice"
                    placeholder="Enter Purchase Price"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="addreport-form-group">
                  <label>Sales Price</label>
                  <input
                    type="number"
                    name="salesPrice"
                    placeholder="Enter Sales Price"
                    value={formData.salesPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReport;
