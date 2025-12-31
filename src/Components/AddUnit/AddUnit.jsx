"use client";

import { useState } from "react";
import {
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./AddUnit.css";

const AddUnit = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    make: "",
    number: "",
    customerName: "",
    quantity: "",
    vinNumber: "",
    lotNumber: "",
    purchaseAuction: "",
    purchaseAmount: "",
    expenses: "",
    purchaseDate: "",
    taxAmount: "",
    saleAuction: "",
    saleAmount: "",
    saleDate: "",
    status: "",
    investors: [""],
  });

  const handleInvestorChange = (index, value) => {
    const updatedInvestors = [...formData.investors];
    updatedInvestors[index] = value;
    setFormData({ ...formData, investors: updatedInvestors });
  };

  const addInvestor = () => {
    setFormData({
      ...formData,
      investors: [...formData.investors, ""],
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      make: "",
      number: "",
      customerName: "",
      quantity: "",
      vinNumber: "",
      lotNumber: "",
      purchaseAuction: "",
      purchaseAmount: "",
      expenses: "",
      purchaseDate: "",
      taxAmount: "",
      saleAuction: "",
      saleAmount: "",
      saleDate: "",
      status: "",
      investors: [""],
    });
  };

  return (
    <div className="addunit-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`addunit-main ${
          sidebarOpen ? "addunit-sidebar-open" : "addunit-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="addunit-header">
          <div className="addunit-header-left">
            <button
              className="addunit-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="addunit-page-title">Add Unit</h1>
          </div>

          <div className="addunit-header-actions">
            <button className="addunit-icon-btn">
              <MdSearch />
            </button>
            <button className="addunit-icon-btn">
              <MdSettings />
            </button>
            <button className="addunit-icon-btn addunit-notification-btn">
              <MdNotifications />
              <span className="addunit-notification-dot"></span>
            </button>
            <div className="addunit-user-profile">
              <div className="addunit-user-info">
                <span className="addunit-user-name">Abram Schleifer</span>
                <span className="addunit-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="addunit-page">
          <div className="addunit-form-container">
            <form onSubmit={handleSubmit}>
              <div className="addunit-form-actions-top">
                <button
                  type="button"
                  className="addunit-btn-remove"
                  onClick={handleReset}
                >
                  Remove
                </button>
                <button type="submit" className="addunit-btn-add">
                  Add Unit
                </button>
              </div>

              <div className="addunit-form-section">
                <h2 className="addunit-section-heading">Car Details</h2>
                <div className="addunit-form-grid">
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Title:</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="addunit-form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Make</label>
                    <select
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      className="addunit-form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="audi">Audi</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="ford">Ford</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="nissan">Nissan</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="kia">Kia</option>
                    </select>
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Enter Number"
                      value={formData.number}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Quantity:</label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="addunit-form-input"
                      min="1"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">
                      Customer/Trademark Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Enter Name"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Vin Number:</label>
                    <input
                      type="text"
                      name="vinNumber"
                      placeholder="Enter VIN"
                      value={formData.vinNumber}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Lot Number</label>
                    <input
                      type="text"
                      name="lotNumber"
                      placeholder="Enter Lot Number"
                      value={formData.lotNumber}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">
                      Purchase Auction
                    </label>
                    <select
                      name="purchaseAuction"
                      value={formData.purchaseAuction}
                      onChange={handleChange}
                      className="addunit-form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="auction1">Auction 1</option>
                      <option value="auction2">Auction 2</option>
                      <option value="auction3">Auction 3</option>
                      <option value="private_sale">Private Sale</option>
                    </select>
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">
                      Purchase Amount
                    </label>
                    <input
                      type="number"
                      name="purchaseAmount"
                      placeholder="Enter Amount"
                      value={formData.purchaseAmount}
                      onChange={handleChange}
                      className="addunit-form-input"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Purchase Date</label>
                    <input
                      type="date"
                      name="purchaseDate"
                      placeholder="DD/MM/YYYY"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="addunit-form-input"
                      required
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Expenses</label>
                    <input
                      type="number"
                      name="expenses"
                      placeholder="Enter Amount"
                      value={formData.expenses}
                      onChange={handleChange}
                      className="addunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Sale Auction</label>
                    <select
                      name="saleAuction"
                      value={formData.saleAuction}
                      onChange={handleChange}
                      className="addunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="auction1">Auction 1</option>
                      <option value="auction2">Auction 2</option>
                      <option value="auction3">Auction 3</option>
                      <option value="private_sale">Private Sale</option>
                    </select>
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Tax Amount</label>
                    <input
                      type="number"
                      name="taxAmount"
                      placeholder="Enter Amount"
                      value={formData.taxAmount}
                      onChange={handleChange}
                      className="addunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Sale Amount</label>
                    <input
                      type="number"
                      name="saleAmount"
                      placeholder="Enter Amount"
                      value={formData.saleAmount}
                      onChange={handleChange}
                      className="addunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="addunit-form-group">
                    <label className="addunit-form-label">Sale Date</label>
                    <input
                      type="date"
                      name="saleDate"
                      placeholder="DD/MM/YYYY"
                      value={formData.saleDate}
                      onChange={handleChange}
                      className="addunit-form-input"
                    />
                  </div>
                </div>

                <div className="addunit-upload-sections">
                  <div className="addunit-upload-box">
                    <button type="button" className="addunit-upload-btn">
                      <MdUpload /> Upload Involve
                    </button>
                    <div className="addunit-upload-area">
                      <p className="addunit-upload-text">Click to browse or</p>
                      <p className="addunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="addunit-upload-hint">Max file size: 10MB</p>
                    </div>
                  </div>
                  <div className="addunit-upload-box">
                    <button type="button" className="addunit-upload-btn">
                      <MdUpload /> Upload Cars Pictures
                    </button>
                    <div className="addunit-upload-area">
                      <p className="addunit-upload-text">Click to browse or</p>
                      <p className="addunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="addunit-upload-hint">Max file size: 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="addunit-form-section">
                <h2 className="addunit-section-heading">Investor Details</h2>

                <div className="addunit-form-grid">
                  {formData.investors.map((investor, index) => (
                    <div className="addunit-form-group" key={index}>
                      <label className="addunit-form-label">
                        Investor {index + 1}
                      </label>
                      <select
                        value={investor}
                        onChange={(e) =>
                          handleInvestorChange(index, e.target.value)
                        }
                        className="addunit-form-select"
                      >
                        <option value="">Select</option>
                        <option value="investor1">Investor 1</option>
                        <option value="investor2">Investor 2</option>
                        <option value="investor3">Investor 3</option>
                        <option value="investor4">Investor 4</option>
                      </select>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="addunit-add-investor-btn"
                  onClick={addInvestor}
                >
                  Add Another Investor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;
