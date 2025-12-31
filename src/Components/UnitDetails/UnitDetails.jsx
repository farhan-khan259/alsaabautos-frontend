import { useState } from "react";
import {
  MdArrowBack,
  MdDelete,
  MdEdit,
  MdMenu,
  MdNotifications,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
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
  const navigate = useNavigate();

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
                  <img src={activeImage} alt="Audi A6" />
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
                      <img src={img} alt={`Audi A6 view ${index + 1}`} />
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
                  <p className="unitdetails-car-category">Sedan</p>
                  <h2 className="unitdetails-car-name">Audi A6</h2>
                  <div className="unitdetails-status-badges">
                    <span className="unitdetails-badge unitdetails-badge-available">
                      Available
                    </span>
                    <span className="unitdetails-badge unitdetails-badge-audit">
                      Audit Date: 12 Unit
                    </span>
                  </div>
                </div>

                <div className="unitdetails-header-right-content">
                  <div className="unitdetails-price-tag">$57654</div>
                  <div className="unitdetails-action-buttons">
                    <button
                      className="unitdetails-action-btn"
                      aria-label="Edit unit"
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="unitdetails-action-btn"
                      aria-label="Delete unit"
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
                  Audi A6 is a luxurious and sophisticated sedan, ideal for both
                  daily commutes and extended journeys. Renowned for its
                  powerful performance and advanced technology features, the A6
                  provides a refined driving experience with exceptional
                  comfort.
                </p>
              </div>

              {/* Car Details Section */}
              <div className="unitdetails-section unitdetails-cor-details">
                <h3 className="unitdetails-section-title">Car Details:</h3>
                <div className="unitdetails-details-grid">
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">ID:</span>
                    <span className="unitdetails-detail-value">HW-W20001</span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      VIN Number:
                    </span>
                    <span className="unitdetails-detail-value">353634535</span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      Contact No:
                    </span>
                    <span className="unitdetails-detail-value">
                      03401475382
                    </span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">
                      Customer Name:
                    </span>
                    <span className="unitdetails-detail-value">
                      Kyle Thompson
                    </span>
                  </div>
                  <div className="unitdetails-detail-item">
                    <span className="unitdetails-detail-label">Status:</span>
                    <span className="unitdetails-detail-value unitdetails-detail-sold">
                      Sold
                    </span>
                  </div>
                </div>
              </div>

              {/* Investor Section */}
              <div className="unitdetails-section unitdetails-investor-section">
                <h3 className="unitdetails-section-title">
                  Investor Name: Usman, Houston, Alaq
                </h3>
                <div className="unitdetails-financial-grid">
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">
                      Purchase:
                    </span>
                    <span className="unitdetails-financial-value">$1728</span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">
                      Expense:
                    </span>
                    <span className="unitdetails-financial-value">$587</span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">Profit:</span>
                    <span className="unitdetails-financial-value unitdetails-financial-profit">
                      $1000
                    </span>
                  </div>
                  <div className="unitdetails-financial-item">
                    <span className="unitdetails-financial-label">Sale:</span>
                    <span className="unitdetails-financial-value">$2728</span>
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
