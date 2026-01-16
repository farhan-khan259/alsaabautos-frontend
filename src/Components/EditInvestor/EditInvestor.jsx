"use client";

import { useEffect, useState } from "react";
import { MdDelete, MdMenu } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { investorsApi } from "../services/api";
import "./EditInvestor.css";

const EditInvestor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    investorId: "",
    name: "",
    contactNo: "",
    email: "",
    joinDate: "",
    status: "active",
    initialInvestment: "",
    profitShare: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        setLoading(true);
        const response = await investorsApi.getOne(id);
        const data = response.data.data.investor;
        const formatDate = (dateString) =>
          dateString ? new Date(dateString).toISOString().split("T")[0] : "";

        setFormData({
          investorId: data.investorId || "",
          name: data.name || "",
          contactNo: data.contactNo || "",
          email: data.email || "",
          joinDate: formatDate(data.joinDate),
          status: data.status || "active",
          initialInvestment: data.initialInvestment || "",
          profitShare: data.profitShare || "",
        });
      } catch (error) {
        console.error("Error fetching investor:", error);
        alert("Failed to fetch investor details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvestor();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        initialInvestment: Number(formData.initialInvestment),
        profitShare: Number(formData.profitShare),
      };
      await investorsApi.update(id, payload);
      alert("Investor updated successfully!");
      navigate("/investors");
    } catch (error) {
      console.error("Error updating investor:", error);
      alert("Failed to update investor");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this investor?")) {
      try {
        await investorsApi.delete(id);
        navigate("/investors");
      } catch (error) {
        console.error("Error deleting investor:", error);
        alert("Failed to delete investor");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

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
                      name="name"
                      className="editinvestor-form-input"
                      value={formData.name}
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
