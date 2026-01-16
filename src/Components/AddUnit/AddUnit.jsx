"use client";

import { useState } from "react";
import { MdClose, MdMenu, MdUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unitsApi } from "../services/api";
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
  const [images, setImages] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [invoicePreview, setInvoicePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    // Create previews for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  };

  const handleInvoiceUpload = (e) => {
    const files = Array.from(e.target.files);
    setInvoices([...invoices, ...files]);

    // Create previews for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setInvoicePreview([...invoicePreview, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const removeInvoice = (index) => {
    const newInvoices = invoices.filter((_, i) => i !== index);
    const newPreviews = invoicePreview.filter((_, i) => i !== index);
    setInvoices(newInvoices);
    setInvoicePreview(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create FormData to handle files and form fields
      const formPayload = new FormData();

      // Add form fields
      Object.keys(formData).forEach((key) => {
        if (key === "investors") {
          formPayload.append(
            key,
            JSON.stringify(formData[key].filter((inv) => inv.trim() !== ""))
          );
        } else if (formData[key] !== "") {
          formPayload.append(key, formData[key]);
        }
      });

      // Convert string numbers to actual numbers
      formPayload.set("quantity", Number(formData.quantity));
      formPayload.set("purchaseAmount", Number(formData.purchaseAmount));
      formPayload.set("expenses", Number(formData.expenses));
      formPayload.set("taxAmount", Number(formData.taxAmount));
      formPayload.set("saleAmount", Number(formData.saleAmount));

      // Add image files
      images.forEach((image) => {
        formPayload.append("images", image);
      });

      // Add invoice files
      invoices.forEach((invoice) => {
        formPayload.append("invoices", invoice);
      });

      await unitsApi.createWithFiles(formPayload);
      alert("Unit added successfully!");
      navigate("/units");
    } catch (error) {
      console.error("Error adding unit:", error);
      alert("Failed to add unit. Please check your inputs.");
    } finally {
      setLoading(false);
    }
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
    setImages([]);
    setInvoices([]);
    setImagePreview([]);
    setInvoicePreview([]);
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
                  Reset
                </button>
                <button
                  type="submit"
                  className="addunit-btn-add"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Unit"}
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
                      <option value="in stock">In Stock</option>
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
                    <label
                      htmlFor="invoice-upload"
                      className="addunit-upload-btn"
                    >
                      <MdUpload /> Upload Invoice
                    </label>
                    <input
                      id="invoice-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleInvoiceUpload}
                      style={{ display: "none" }}
                    />
                    <div className="addunit-upload-area">
                      <p className="addunit-upload-text">Click to browse or</p>
                      <p className="addunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="addunit-upload-hint">Max file size: 10MB</p>
                    </div>
                    {invoicePreview.length > 0 && (
                      <div className="addunit-preview-container">
                        <h4>Invoice Files:</h4>
                        <div className="addunit-preview-grid">
                          {invoicePreview.map((preview, index) => (
                            <div key={index} className="addunit-preview-item">
                              <div className="addunit-preview-file">
                                <span className="addunit-file-name">
                                  {invoices[index]?.name || `File ${index + 1}`}
                                </span>
                              </div>
                              <button
                                type="button"
                                className="addunit-remove-btn"
                                onClick={() => removeInvoice(index)}
                              >
                                <MdClose />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="addunit-upload-box">
                    <label
                      htmlFor="image-upload"
                      className="addunit-upload-btn"
                    >
                      <MdUpload /> Upload Cars Pictures
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <div className="addunit-upload-area">
                      <p className="addunit-upload-text">Click to browse or</p>
                      <p className="addunit-upload-text">
                        drag and drop your files
                      </p>
                      <p className="addunit-upload-hint">Max file size: 10MB</p>
                    </div>
                    {imagePreview.length > 0 && (
                      <div className="addunit-preview-container">
                        <h4>Car Pictures:</h4>
                        <div className="addunit-preview-grid">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="addunit-preview-item">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="addunit-preview-image"
                              />
                              <button
                                type="button"
                                className="addunit-remove-btn"
                                onClick={() => removeImage(index)}
                              >
                                <MdClose />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                      {/* You might want to fetch the list of investors from backend to populate this select */}
                      <input
                        type="text"
                        value={investor}
                        onChange={(e) =>
                          handleInvestorChange(index, e.target.value)
                        }
                        className="addunit-form-input"
                        placeholder="Enter Investor Name"
                      />
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
