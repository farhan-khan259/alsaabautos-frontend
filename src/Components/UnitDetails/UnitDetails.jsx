import { useEffect, useState } from "react";
import {
  MdArrowBack,
  MdDelete,
  MdEdit,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unitsApi } from "../services/api";
import "./UnitDetails.css";

import car1 from "../../Assets/Pictures/Image (1).png";
import car2 from "../../Assets/Pictures/Image (2).png";
import car3 from "../../Assets/Pictures/Image (3).png";
import car4 from "../../Assets/Pictures/Image (4).png";
import car5 from "../../Assets/Pictures/Image (5).png";

const images = [car1, car2, car3, car4, car5];

const UnitDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const response = await unitsApi.getOne(id);
        setUnit(response.data.data.unit);
      } catch (error) {
        console.error("Error fetching unit details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUnit();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/units/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      try {
        await unitsApi.delete(id);
        navigate("/units");
      } catch (error) {
        console.error("Error deleting unit:", error);
        alert("Failed to delete unit");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!unit) return <div>Unit not found</div>;

  const profit = (unit.saleAmount || 0) - (unit.purchaseAmount || 0) - (unit.expenses || 0) - (unit.taxAmount || 0);

  return (
    <div className="unitdetails-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`unitdetails-main ${
          sidebarOpen
            ? "unitdetails-sidebar-open"
            : "unitdetails-sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="unitdetails-header">
          <div className="unitdetails-header-left">
            <button
              className="unitdetails-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <button
              className="unitdetails-back-btn"
              onClick={() => navigate("/units")}
              aria-label="Go back to units"
            >
              <MdArrowBack />
            </button>
            <div className="unitdetails-title-container">
              <span className="unitdetails-breadcrumb">
                Units / Unit Details
              </span>
              <h1 className="unitdetails-page-title">Unit Details</h1>
            </div>
          </div>

          <div className="unitdetails-header-actions">
            <button className="unitdetails-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="unitdetails-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="unitdetails-icon-btn unitdetails-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="unitdetails-notification-dot"></span>
            </button>
            <div className="unitdetails-user-info">
              <span className="unitdetails-user-name">Abram Schleifer</span>
              <span className="unitdetails-user-role">Admin</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="unitdetails-content">
          <div className="unitdetails-container unitdetails-split-layout">
            {/* Left Column - Car Images */}
            <div className="unitdetails-left-column">
              <div className="unitdetails-image-gallery">
                <div className="unitdetails-main-image">
                  <img src={activeImage} alt={unit.title} />
                </div>
                <div className="unitdetails-thumbnail-gallery">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`unitdetails-thumbnail ${
                        activeImage === img
                          ? "unitdetails-thumbnail-active"
                          : ""
                      }`}
                      onClick={() => setActiveImage(img)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setActiveImage(img)
                      }
                      aria-label={`View image ${index + 1}`}
                    >
                      <img src={img} alt={`view ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="unitdetails-right-column">
              {/* Header Card */}
              <div className="unitdetails-details-header">
                <div className="unitdetails-header-left-content">
                  <p className="unitdetails-car-category">{unit.make}</p>
                  <h2 className="unitdetails-car-name">{unit.title}</h2>
                  <div className="unitdetails-status-badges">
                    <span className="unitdetails-badge unitdetails-badge-available">
                      {unit.status}
                    </span>
                    <span className="unitdetails-badge unitdetails-badge-audit">
                      Audit Date: {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="unitdetails-header-right-content">
                  <div className="unitdetails-price-tag">${unit.saleAmount?.toLocaleString()}</div>
                  <div className="unitdetails-action-buttons">
                    <button
                      className="unitdetails-action-btn"
                      aria-label="Edit unit"
                      onClick={handleEdit}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="unitdetails-action-btn"
                      aria-label="Delete unit"
                      onClick={handleDelete}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="unitdetails-section unitdetails-about-section">
                <h3 className="unitdetails-section-title">About:</h3>
                <p className="unitdetails-about-text">
                  {/* Placeholder description as it's not in the model yet */}
                  No description available.
                </p>
              </div>

              {/* Car Details Section */}
              <div className="unitdetails-section unitdetails-cor-details">
                <h3 className="unitdetails-section-title">Car Details:</h3>
                <div className="unitdetails-details-grid">
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">ID:</span>
                    <span className="unitdetails-detail-value">{unit._id.substring(0, 8)}</span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      VIN Number:
                    </span>
                    <span className="unitdetails-detail-value">{unit.vinNumber}</span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      Lot Number:
                    </span>
                    <span className="unitdetails-detail-value">
                      {unit.lotNumber}
                    </span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      Customer Name:
                    </span>
                    <span className="unitdetails-detail-value">
                      {unit.customerName}
                    </span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">Status:</span>
                    <span className="unitdetails-detail-value unitdetails-detail-sold">
                      {unit.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Investor Section */}
              <div className="unitdetails-section unitdetails-investor-section">
                <h3 className="unitdetails-section-title">
                  Investor Name: {unit.investors?.join(", ")}
                </h3>
                <div className="unitdetails-financial-grid">
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">
                      Purchase:
                    </span>
                    <span className="unitdetails-financial-value">${unit.purchaseAmount?.toLocaleString()}</span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">
                      Expense:
                    </span>
                    <span className="unitdetails-financial-value">${unit.expenses?.toLocaleString()}</span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">Profit:</span>
                    <span className="unitdetails-financial-value unitdetails-financial-profit">
                      ${profit.toLocaleString()}
                    </span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">Sale:</span>
                    <span className="unitdetails-financial-value">${unit.saleAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetails;
