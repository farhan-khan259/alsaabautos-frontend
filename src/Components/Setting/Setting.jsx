"use client";

import { useEffect, useState } from "react";
import { MdMenu, MdSave, MdVisibility, MdVisibilityOff } from "react-icons/md";
import profileimage from "../../Assets/Pictures/setting image.png";
import { useLanguage } from "../../context/LanguageContext";
import Sidebar from "../Sidebar/Sidebar";
import { authApi } from "../services/api";
import "./Setting.css";

const Setting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // Optional: Don't preload for security usually, but kept for UI structure
    role: "Admin",
    language: language,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authApi.getMe();
        const user = response.data.data.user;
        setFormData({
          username: user.username || "",
          email: user.email || "",
          password: "",
          role: user.role || "Admin",
          language: user.language || "English",
        });
        // Sync context if different
        if (user.language && user.language !== language) {
          changeLanguage(user.language);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Create payload without password if empty
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await authApi.updateDetails(payload);

      // Update global language context
      changeLanguage(formData.language);

      alert(t.settingsSaved);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(t.failedSave);
    } finally {
      setLoading(false);
    }
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
            <h1 className="settingpage-page-title">{t.setting}</h1>
          </div>

          {/* <div className="settingpage-header-actions">
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
                <span className="settingpage-user-name">{formData.username}</span>
                <span className="settingpage-user-role">{formData.role}</span>
              </div>
            </div>
          </div> */}
        </header>

        {/* Main Content */}
        <div className="settingpage-content">
          <div className="settingpage-container">
            <div className="settingpage-card">
              <h2 className="settingpage-card-title">{t.profileSettings}</h2>

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
                    {t.changePhoto}
                  </button>
                </div>
              </div>

              <div className="settingpage-form">
                <div className="settingpage-form-grid">
                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">
                      {t.username}:
                    </label>
                    <div className="settingpage-form-input-wrapper">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter username"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">{t.email}:</label>
                    <div className="settingpage-form-input-wrapper">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter email"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">
                      {t.password}:
                    </label>
                    <div className="settingpage-form-input-wrapper settingpage-password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="settingpage-form-input"
                        placeholder="Enter password"
                        disabled
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
                    <label className="settingpage-form-label">{t.role}:</label>
                    <div className="settingpage-form-input-wrapper">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="settingpage-form-select"
                        disabled
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                  </div>

                  <div className="settingpage-form-group">
                    <label className="settingpage-form-label">
                      {t.language}:
                    </label>
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
                      </select>
                    </div>
                  </div>
                </div>

                <div className="settingpage-form-actions">
                  <button
                    className="settingpage-save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <MdSave />
                    {loading ? "Saving..." : t.save}
                  </button>
                  <button className="settingpage-cancel-btn">{t.cancel}</button>
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
