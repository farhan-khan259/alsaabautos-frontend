"use client";

import { useEffect, useState } from "react";
import { MdMenu, MdUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unitsApi } from "../services/api";
import "./EditUnit.css";

const EditUnit = () => {
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
    investors: [],
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const response = await unitsApi.getOne(id);
        const data = response.data.data.unit;
        // Format dates for input type="date"
        const formatDate = (dateString) =>
          dateString ? new Date(dateString).toISOString().split("T")[0] : "";

        setFormData({
          title: data.title || "",
          make: data.make || "",
          number: data.number || "",
          customerName: data.customerName || "",
          quantity: data.quantity || "",
          vinNumber: data.vinNumber || "",
          lotNumber: data.lotNumber || "",
          purchaseAuction: data.purchaseAuction || "",
          purchaseAmount: data.purchaseAmount || "",
          expenses: data.expenses || "",
          purchaseDate: formatDate(data.purchaseDate),
          taxAmount: data.taxAmount || "",
          saleAuction: data.saleAuction || "",
          saleAmount: data.saleAmount || "",
          saleDate: formatDate(data.saleDate),
          status: data.status || "",
          investors: data.investors || [],
        });
      } catch (error) {
        console.error("Error fetching unit:", error);
        alert("Failed to fetch unit details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUnit();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        purchaseAmount: Number(formData.purchaseAmount),
        expenses: Number(formData.expenses),
        taxAmount: Number(formData.taxAmount),
        saleAmount: Number(formData.saleAmount),
        investors: formData.investors.filter((inv) => inv.trim() !== ""),
      };

      await unitsApi.update(id, payload);
      alert("Unit updated successfully!");
      navigate("/units");
    } catch (error) {
      console.error("Error updating unit:", error);
      alert("Failed to update unit");
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      navigate("/units");
    }
  };

  if (loading) return <div>Loading...</div>;

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
                      <option value="in stock">In Stock</option>
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
                  {formData.investors.map((investor, index) => (
                    <div className="editunit-form-group" key={index}>
                      <label className="editunit-form-label">
                        Investor {index + 1}
                      </label>
                      <input
                        type="text"
                        value={investor}
                        onChange={(e) =>
                          handleInvestorChange(index, e.target.value)
                        }
                        className="editunit-form-input"
                        placeholder="Enter Investor Name"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="addunit-add-investor-btn"
                  onClick={addInvestor}
                  style={{ marginTop: "10px" }}
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

export default EditUnit;
