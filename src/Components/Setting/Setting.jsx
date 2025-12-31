"use client";

import { useState } from "react";
import {
  MdMenu,
  MdNotifications,
  MdSave,
  MdSearch,
  MdSettings,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import profileimage from "../../Assets/Pictures/setting image.png";
import Sidebar from "../Sidebar/Sidebar";
import "./Setting.css";

const Setting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "Abram Schleifer",
    email: "abc1234@gmail.com",
    password: "Abc123534",
    role: "Admin",
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", formData);
    // Add save logic here
    alert("Settings saved successfully!");
  };

  return (
    <div className="settingpage-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`settingpage-main ${
          sidebarOpen
            ? "settingpage-sidebar-open"
            : "settingpage-sidebar-closed"
        }`}
      >
        {/* Header */}
        <header className="settingpage-header">
          <div className="settingpage-header-left">
            <button
              className="settingpage-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="settingpage-page-title">Settings</h1>
          </div>

          <div className="settingpage-header-actions">
            <button className="settingpage-icon-btn">
              <MdSearch />
            </button>
            <button className="settingpage-icon-btn">
              <MdSettings />
            </button>
            <button className="settingpage-icon-btn settingpage-notification-btn">
              <MdNotifications />
              <span className="settingpage-notification-dot"></span>
            </button>
            <div className="settingpage-user-profile">
              <div className="settingpage-user-info">
                <span className="settingpage-user-name">Abram Schleifer</span>
                <span className="settingpage-user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="settingpage-content">
          <div className="settingpage-container">
            <div className="settingpage-card">
              <h2 className="settingpage-card-title">Account Settings</h2>

              <div className="settingpage-profile-section">
                <img
                  src={profileimage}
                  alt="Profile"
                  className="settingpage-profile-image"
                />
                <div className="settingpage-profile-info">
                  <h3 className="settingpage-profile-name">
                    {formData.username}
                  </h3>
                  <p className="settingpage-profile-email">{formData.email}</p>
                  <button className="settingpage-change-photo-btn">
                    Change Profile Photo
                  </button>
                </div>
              </div>

              <div className="settingpage-form">
                <div className="settingpage-form-grid">
                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">Username:</label>
                    <div className="settingpage-form-input-wrapper">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">Email:</label>
                    <div className="settingpage-form-input-wrapper">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">Password:</label>
                    <div className="settingpage-form-input-wrapper settingpage-password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter password"
                      />
                      <button
                        className="settingpage-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">Role:</label>
                    <div className="settingpage-form-input-wrapper">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="settingpage-form-select"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">Language:</label>
                    <div className="settingpage-form-input-wrapper">
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="settingpage-form-select"
                      >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="settingpage-form-actions">
                  <button className="settingpage-save-btn" onClick={handleSave}>
                    <MdSave />
                    Save Changes
                  </button>
                  <button className="settingpage-cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
