"use client";

import { useState } from "react";
import {
  MdDelete,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./EditInvestor.css";

const EditInvestor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    investorId: "#3d5345",
    investorName: "John",
    contactNo: "03401476382",
    email: "abc1234@gmail.com",
    joinDate: "2021-03-12",
    status: "active",
    initialInvestment: "32428",
    profitShare: "5",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this investor?")) {
      console.log("Delete investor:", formData.investorId);
      // Add your delete logic here
    }
  };

  return (
    <div className="editinvestor-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`editinvestor-main ${
          sidebarOpen
            ? "editinvestor-sidebar-open"
            : "editinvestor-sidebar-closed"
        }`}
      >
        {/* Header - UPDATED TO MATCH ADD INVESTOR */}
        <div className="editinvestor-header">
          <div className="editinvestor-header-left">
            <button
              className="editinvestor-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="editinvestor-page-title">Edit Investor</h1>
          </div>

          <div className="editinvestor-header-actions">
            <button className="editinvestor-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="editinvestor-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="editinvestor-icon-btn editinvestor-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="editinvestor-notification-dot"></span>
            </button>
            <div className="editinvestor-user-profile">
              <div className="editinvestor-user-info">
                <span className="editinvestor-user-name">Abram Schleifer</span>
                <span className="editinvestor-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="editinvestor-page">
          <div className="editinvestor-page-header">
            <div className="editinvestor-breadcrumb-container">
              <span className="editinvestor-breadcrumb">
                Dashboard / Investors / Edit Investor
              </span>
            </div>
            <div className="editinvestor-page-actions">
              <button
                type="button"
                className="editinvestor-btn editinvestor-btn-outline"
                onClick={handleDelete}
              >
                <MdDelete /> Delete
              </button>
              <button
                type="submit"
                className="editinvestor-btn editinvestor-btn-primary"
                form="editinvestor-form"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="editinvestor-container">
            {/* Form Card */}
            <div className="editinvestor-form-card">
              <h3 className="editinvestor-form-title">
                Edit Investor Information
              </h3>

              <form id="editinvestor-form" onSubmit={handleSubmit}>
                <div className="editinvestor-form-grid">
                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Investor Id:
                    </label>
                    <input
                      type="text"
                      name="investorId"
                      className="editinvestor-form-input"
                      value={formData.investorId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Investor Name:
                    </label>
                    <input
                      type="text"
                      name="investorName"
                      className="editinvestor-form-input"
                      value={formData.investorName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Contact No:
                    </label>
                    <input
                      type="tel"
                      name="contactNo"
                      className="editinvestor-form-input"
                      value={formData.contactNo}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10,11}"
                      title="Please enter a valid phone number (10-11 digits)"
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="editinvestor-form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Join Date:
                    </label>
                    <input
                      type="date"
                      name="joinDate"
                      className="editinvestor-form-input"
                      value={formData.joinDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">Status:</label>
                    <select
                      name="status"
                      className="editinvestor-form-select"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">In Active</option>
                    </select>
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Initial Investment:
                    </label>
                    <input
                      type="number"
                      name="initialInvestment"
                      className="editinvestor-form-input"
                      value={formData.initialInvestment}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="editinvestor-form-group">
                    <label className="editinvestor-form-label">
                      Profit Share%:
                    </label>
                    <input
                      type="number"
                      name="profitShare"
                      className="editinvestor-form-input"
                      value={formData.profitShare}
                      onChange={handleChange}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvestor;
