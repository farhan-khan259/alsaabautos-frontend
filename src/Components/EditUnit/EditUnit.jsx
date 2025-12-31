"use client";

import { useEffect, useState } from "react";
import {
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./EditUnit.css";

const EditUnit = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "Toyota Camry 2023",
    make: "toyota",
    number: "TX1234",
    customerName: "John Doe",
    quantity: "1",
    vinNumber: "1HGCM82633A123456",
    lotNumber: "LOT7890",
    purchaseAuction: "auction1",
    purchaseAmount: "25000",
    expenses: "1500",
    purchaseDate: "2023-10-15",
    taxAmount: "1500",
    saleAuction: "auction2",
    saleAmount: "32000",
    saleDate: "2023-12-20",
    status: "sold",
    investor1: "investor1",
    investor2: "investor2",
    investor3: "",
    investor4: "",
  });

  // Simulate fetching data on component mount
  useEffect(() => {
    console.log("Fetching unit data...");
    // In a real app, you would fetch data from an API
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted for update:", formData);
    alert("Unit updated successfully!");
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      console.log("Changes discarded");
      window.location.reload();
    }
  };

  return (
    <div className="editunit-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`editunit-main ${
          sidebarOpen ? "editunit-sidebar-open" : "editunit-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="editunit-header">
          <div className="editunit-header-left">
            <button
              className="editunit-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="editunit-page-title">Edit Unit</h1>
          </div>

          <div className="editunit-header-actions">
            <button className="editunit-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="editunit-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="editunit-icon-btn editunit-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="editunit-notification-dot"></span>
            </button>
            <div className="editunit-user-profile">
              <div className="editunit-user-info">
                <span className="editunit-user-name">Abram Schleifer</span>
                <span className="editunit-user-role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="editunit-page">
          <div className="editunit-form-container">
            <form onSubmit={handleSubmit}>
              <div className="editunit-form-actions-top">
                <button
                  type="button"
                  className="editunit-btn-discard"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
                <button type="submit" className="editunit-btn-save">
                  Save Changes
                </button>
              </div>

              <div className="editunit-form-section">
                <h2 className="editunit-section-heading">Car Details</h2>
                <div className="editunit-form-grid">
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Title:</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="editunit-form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Make</label>
                    <select
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      className="editunit-form-select"
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
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Enter Number"
                      value={formData.number}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Quantity:</label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="editunit-form-input"
                      min="1"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">
                      Customer/Trademark Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Enter Name"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Vin Number:</label>
                    <input
                      type="text"
                      name="vinNumber"
                      placeholder="Enter VIN"
                      value={formData.vinNumber}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Lot Number</label>
                    <input
                      type="text"
                      name="lotNumber"
                      placeholder="Enter Lot Number"
                      value={formData.lotNumber}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">
                      Purchase Auction
                    </label>
                    <select
                      name="purchaseAuction"
                      value={formData.purchaseAuction}
                      onChange={handleChange}
                      className="editunit-form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="auction1">Auction 1</option>
                      <option value="auction2">Auction 2</option>
                      <option value="auction3">Auction 3</option>
                      <option value="private_sale">Private Sale</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">
                      Purchase Amount
                    </label>
                    <input
                      type="number"
                      name="purchaseAmount"
                      placeholder="Enter Amount"
                      value={formData.purchaseAmount}
                      onChange={handleChange}
                      className="editunit-form-input"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Purchase Date</label>
                    <input
                      type="date"
                      name="purchaseDate"
                      placeholder="DD/MM/YYYY"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="editunit-form-input"
                      required
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Expenses</label>
                    <input
                      type="number"
                      name="expenses"
                      placeholder="Enter Amount"
                      value={formData.expenses}
                      onChange={handleChange}
                      className="editunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Sale Auction</label>
                    <select
                      name="saleAuction"
                      value={formData.saleAuction}
                      onChange={handleChange}
                      className="editunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="auction1">Auction 1</option>
                      <option value="auction2">Auction 2</option>
                      <option value="auction3">Auction 3</option>
                      <option value="private_sale">Private Sale</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Tax Amount</label>
                    <input
                      type="number"
                      name="taxAmount"
                      placeholder="Enter Amount"
                      value={formData.taxAmount}
                      onChange={handleChange}
                      className="editunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Sale Amount</label>
                    <input
                      type="number"
                      name="saleAmount"
                      placeholder="Enter Amount"
                      value={formData.saleAmount}
                      onChange={handleChange}
                      className="editunit-form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Sale Date</label>
                    <input
                      type="date"
                      name="saleDate"
                      placeholder="DD/MM/YYYY"
                      value={formData.saleDate}
                      onChange={handleChange}
                      className="editunit-form-input"
                    />
                  </div>
                </div>

                <div className="editunit-upload-sections">
                  <div className="editunit-upload-box">
                    <button type="button" className="editunit-upload-btn">
                      <MdUpload /> Upload Invoice
                    </button>
                    <div className="editunit-upload-area">
                      <p className="editunit-upload-text">Click to browse or</p>
                      <p className="editunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="editunit-upload-hint">
                        Max file size: 10MB
                      </p>
                    </div>
                  </div>
                  <div className="editunit-upload-box">
                    <button type="button" className="editunit-upload-btn">
                      <MdUpload /> Upload Cars Pictures
                    </button>
                    <div className="editunit-upload-area">
                      <p className="editunit-upload-text">Click to browse or</p>
                      <p className="editunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="editunit-upload-hint">
                        Max file size: 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editunit-form-section">
                <h2 className="editunit-section-heading">Investor Details</h2>
                <div className="editunit-form-grid">
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Investor 1</label>
                    <select
                      name="investor1"
                      value={formData.investor1}
                      onChange={handleChange}
                      className="editunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="investor1">Investor 1</option>
                      <option value="investor2">Investor 2</option>
                      <option value="investor3">Investor 3</option>
                      <option value="investor4">Investor 4</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Investor 2</label>
                    <select
                      name="investor2"
                      value={formData.investor2}
                      onChange={handleChange}
                      className="editunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="investor1">Investor 1</option>
                      <option value="investor2">Investor 2</option>
                      <option value="investor3">Investor 3</option>
                      <option value="investor4">Investor 4</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Investor 3</label>
                    <select
                      name="investor3"
                      value={formData.investor3}
                      onChange={handleChange}
                      className="editunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="investor1">Investor 1</option>
                      <option value="investor2">Investor 2</option>
                      <option value="investor3">Investor 3</option>
                      <option value="investor4">Investor 4</option>
                    </select>
                  </div>
                  <div className="editunit-form-group">
                    <label className="editunit-form-label">Investor 4</label>
                    <select
                      name="investor4"
                      value={formData.investor4}
                      onChange={handleChange}
                      className="editunit-form-select"
                    >
                      <option value="">Select</option>
                      <option value="investor1">Investor 1</option>
                      <option value="investor2">Investor 2</option>
                      <option value="investor3">Investor 3</option>
                      <option value="investor4">Investor 4</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUnit;
