"use client";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { investorsApi } from "../services/api";
import "./AddInvestor.css";

const AddInvestor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    investorId: "",
    name: "",
    contactNo: "",
    email: "",
    joinDate: "",
    status: "",
    initialInvestment: "",
    profitShare: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        initialInvestment: Number(formData.initialInvestment),
        profitShare: Number(formData.profitShare),
      };
      await investorsApi.create(payload);
      alert("Investor added successfully!");
      navigate("/investors");
    } catch (error) {
      console.error("Error creating investor:", error);
      alert("Failed to add investor. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      investorId: "",
      name: "",
      contactNo: "",
      email: "",
      joinDate: "",
      status: "",
      initialInvestment: "",
      profitShare: "",
    });
  };

  return (
    <div className="addinvestor-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`addinvestor-main ${
          sidebarOpen
            ? "addinvestor-sidebar-open"
            : "addinvestor-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="addinvestor-header">
          <div className="addinvestor-header-left">
            <button
              className="addinvestor-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="addinvestor-page-title">Add Investor</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="addinvestor-page">
          <div className="addinvestor-page-header">
            <div className="addinvestor-breadcrumb-container">
              <span className="addinvestor-breadcrumb">
                Dashboard / Investors / Add Investor
              </span>
            </div>
            <div className="addinvestor-page-actions">
              <button
                type="button"
                className="addinvestor-btn addinvestor-btn-outline"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="addinvestor-btn addinvestor-btn-primary"
                form="add-investor-form"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <form id="add-investor-form" onSubmit={handleSubmit}>
            <div className="addinvestor-card addinvestor-form-section">
              <h3 className="addinvestor-section-title">Investor Details</h3>

              <div className="addinvestor-form-grid">
                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">Investor Id:</label>
                  <input
                    type="text"
                    name="investorId"
                    className="addinvestor-form-input"
                    placeholder="Enter Id"
                    value={formData.investorId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">
                    Investor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="addinvestor-form-input"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">Contact No:</label>
                  <input
                    type="tel"
                    name="contactNo"
                    className="addinvestor-form-input"
                    placeholder="Enter Number"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10,11}"
                    title="Please enter a valid phone number (10-11 digits)"
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="addinvestor-form-input"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">Join Date:</label>
                  <input
                    type="date"
                    name="joinDate"
                    className="addinvestor-form-input"
                    placeholder="DD/MM/YYYY"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">Status:</label>
                  <select
                    name="status"
                    className="addinvestor-form-select"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">In Active</option>
                  </select>
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">
                    Initial Investment:
                  </label>
                  <input
                    type="number"
                    name="initialInvestment"
                    className="addinvestor-form-input"
                    placeholder="Enter Investment"
                    value={formData.initialInvestment}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="addinvestor-form-group">
                  <label className="addinvestor-form-label">
                    Profit Share%:
                  </label>
                  <input
                    type="number"
                    name="profitShare"
                    className="addinvestor-form-input"
                    placeholder="Enter Percentage"
                    value={formData.profitShare}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInvestor;
