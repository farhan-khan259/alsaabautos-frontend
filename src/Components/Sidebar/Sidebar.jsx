"use client";
import {
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdClose,
  MdDashboard,
  MdDirectionsCar,
  MdLogout,
  MdMenu,
  MdPayments,
  MdPeople,
  MdSettings,
  MdShowChart,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

import logo from "../../Assets/Pictures/logo.png";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const menuItems = [
    { id: "dashboard", path: "/", label: t.dashboard, icon: <MdDashboard /> },
    {
      id: "units",
      path: "/units",
      label: t.units,
      icon: <MdDirectionsCar />,
      badge: null,
    },
    {
      id: "investors",
      path: "/investors",
      label: t.investors,
      icon: <MdPeople />,
    },
    {
      id: "performance",
      path: "/performance",
      label: t.performance,
      icon: <MdShowChart />,
    },
    { id: "p&l", path: "/pl", label: t.pl, icon: <MdAttachMoney /> },
    {
      id: "expenses",
      path: "/expenses",
      label: t.expenses,
      icon: <MdAccountBalanceWallet />,
    },
    {
      id: "payments",
      path: "/payments",
      label: t.payments,
      icon: <MdPayments />,
    },
    {
      id: "setting",
      path: "/setting",
      label: t.setting,
      icon: <MdSettings />,
      badge: 5,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogoClick = () => {
    navigate("/");
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? <MdClose /> : <MdMenu />}
      </button>

      <div
        className={`sidebar-main ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="sidebar-header">
          <div
            className="sidebar-logo"
            onClick={handleLogoClick}
            title="Go to Dashboard"
          >
            <img
              src={logo}
              alt="ALSAAB AUTO Logo"
              className="sidebar-logo-img"
            />
            {sidebarOpen && (
              <span className="sidebar-logo-text">ALSAAB AUTO</span>
            )}
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-nav-item ${
                isActive(item.path) ? "sidebar-active" : ""
              }`}
              onClick={handleNavClick}
              title={item.label}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="sidebar-nav-label">{item.label}</span>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="sidebar-nav-badge">{item.badge}</span>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <button
          className="sidebar-logout-btn"
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
        >
          <span className="sidebar-nav-icon">
            <MdLogout />
          </span>
          {sidebarOpen && <span className="sidebar-nav-label">{t.logout}</span>}
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
