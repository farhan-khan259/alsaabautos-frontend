"use client";

import { useState, useEffect } from "react";
import {
  MdAdd,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { reportsApi } from "../services/api";
import "./EditReport.css";

const EditReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [investors, setInvestors] = useState(2); // Start with at least 2 investors in UI
  const [formData, setFormData] = useState({
    carId: "",
    customerName: "",
    purchasePrice: "",
    salesPrice: "",
  });
  const [investorData, setInvestorData] = useState({
    investor1: { name: "", profit: "" },
    investor2: { name: "", profit: "" },
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await reportsApi.getOne(id);
        const data = response.data.data.report;

        setFormData({
          carId: data.carId || "",
          customerName: data.customerName || "",
          purchasePrice: data.purchasePrice || "",
          salesPrice: data.salesPrice || "",
        });

        const newInvestorData = {};
        let count = 0;
        if (data.investors && Array.isArray(data.investors)) {
          data.investors.forEach((inv, index) => {
            newInvestorData[`investor${index + 1}`] = {
              name: inv.name,
              profit: inv.profit
            };
            count = index + 1;
          });
        }
        
        // Ensure at least 2 investors are initialized for UI consistency
        if (count < 2) {
            for (let i = count + 1; i <= 2; i++) {
                newInvestorData[`investor${i}`] = { name: "", profit: "" };
            }
            count = 2;
        }

        setInvestorData(newInvestorData);
        setInvestors(count);

      } catch (error) {
        console.error("Error fetching report:", error);
        alert("Failed to fetch report details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

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
      setInvestors(investors + 1);
      setInvestorData((prev) => ({
        ...prev,
        [`investor${investors + 1}`]: { name: "", profit: "" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const investorsArray = Object.keys(investorData).reduce((acc, key) => {
        if (parseInt(key.replace("investor", "")) <= investors) {
          const inv = investorData[key];
          if (inv.name && inv.profit !== "") { // Check if valid
             acc.push({
              name: inv.name,
              profit: Number(inv.profit)
            });
          }
        }
        return acc;
      }, []);

      const payload = {
        ...formData,
        purchasePrice: Number(formData.purchasePrice),
        salesPrice: Number(formData.salesPrice),
        netProfit: Number(formData.salesPrice) - Number(formData.purchasePrice),
        investors: investorsArray,
      };

      await reportsApi.update(id, payload);
      alert("Report updated successfully!");
      navigate("/pl");
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Failed to update report");
    }
  };

  if (loading) return <div>Loading...</div>;

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
                <button type="button" className="editreport-discard" onClick={() => navigate("/pl")}>
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

              {/* Dynamic Investors Fields */}
              {Array.from({ length: investors }, (_, i) => {
                const investorKey = `investor${i + 1}`;
                return (
                  <div key={investorKey} style={{ display: 'contents' }}>
                    <div className="editreport-field">
                      <label className="editreport-field-label">Investor {i + 1}</label>
                      <select
                        name={investorKey}
                        value={investorData[investorKey]?.name || ""}
                        onChange={(e) =>
                          handleInvestorChange(i + 1, "name", e.target.value)
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
                        Investor {i + 1} Profit %
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Profit %"
                        value={investorData[investorKey]?.profit || ""}
                        onChange={(e) =>
                          handleInvestorChange(i + 1, "profit", e.target.value)
                        }
                        className="editreport-field-input"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>
                );
              })}

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

              {/* Empty column for alignment if needed, or adjust grid */}
              <div className="editreport-field"></div>

              {/* Purchase and Sales Prices */}
              <div className="editreport-field">
                <label className="editreport-field-label">Purchase Price</label>
                <input
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  className="editreport-field-input"
                  type="number"
                />
              </div>

              <div className="editreport-field">
                <label className="editreport-field-label">Sales Price</label>
                <input
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleChange}
                  className="editreport-field-input"
                  type="number"
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
