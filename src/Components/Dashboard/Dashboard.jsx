"use client";

import { useState } from "react";
import {
  MdDirectionsCar,
  MdAttachMoney,
  MdPeople,
  MdReceipt,
  MdMenu,
  MdSearch,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Total Cars",
      value: "89 Cars",
      icon: <MdDirectionsCar />,
      color: "#3b82f6",
    },
    {
      title: "Cars Sold (MTD)",
      value: "18",
      icon: <MdDirectionsCar />,
      color: "#10b981",
    },
    {
      title: "Total Profit",
      value: "$19,200",
      icon: <MdAttachMoney />,
      color: "#f59e0b",
    },
    {
      title: "Expenses",
      value: "$2,500",
      icon: <MdReceipt />,
      color: "#ef4444",
    },
    {
      title: "Car In Stock",
      value: "7",
      icon: <MdDirectionsCar />,
      color: "#8b5cf6",
    },
    {
      title: "Total Tax",
      value: "$800",
      icon: <MdAttachMoney />,
      color: "#06b6d4",
    },
    {
      title: "Total Investor",
      value: "4",
      icon: <MdPeople />,
      color: "#ec4899",
    },
    {
      title: "Total Investment",
      value: "$45,890",
      icon: <MdAttachMoney />,
      color: "#14b8a6",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`dashboard-main ${
          sidebarOpen ? "dashboard-open" : "dashboard-closed"
        }`}
      >
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button
              className="dashboard-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MdMenu />
            </button>
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          <div className="dashboard-header-actions">
            <button className="dashboard-icon-btn" aria-label="Search">
              <MdSearch />
            </button>
            <button className="dashboard-icon-btn" aria-label="Settings">
              <MdSettings />
            </button>
            <button
              className="dashboard-icon-btn dashboard-notification-btn"
              aria-label="Notifications"
            >
              <MdNotifications />
              <span className="dashboard-notification-dot"></span>
            </button>
            <div className="dashboard-user-info">
              <strong className="dashboard-user-name">Abram Schleifer</strong>
              <small className="dashboard-user-role">Admin</small>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="dashboard-content">
          <div className="dashboard-stats-grid">
            {stats.map((item, index) => (
              <div
                className="dashboard-stat-card"
                key={index}
                style={{ "--stat-color": item.color }}
              >
                <div className="dashboard-stat-icon">{item.icon}</div>
                <div className="dashboard-stat-content">
                  <p className="dashboard-stat-title">{item.title}</p>
                  <h3 className="dashboard-stat-value">{item.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
