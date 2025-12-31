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

import logo from "../../Assets/Pictures/logo.png";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", path: "/", label: "Dashboard", icon: <MdDashboard /> },
    {
      id: "units",
      path: "/units",
      label: "Units",
      icon: <MdDirectionsCar />,
      badge: null,
    },
    {
      id: "investors",
      path: "/investors",
      label: "Investors",
      icon: <MdPeople />,
    },
    {
      id: "performance",
      path: "/performance",
      label: "Performance",
      icon: <MdShowChart />,
    },
    { id: "p&l", path: "/pl", label: "P&L", icon: <MdAttachMoney /> },
    {
      id: "expenses",
      path: "/expenses",
      label: "Expenses",
      icon: <MdAccountBalanceWallet />,
    },
    {
      id: "payments",
      path: "/payments",
      label: "Payments",
      icon: <MdPayments />,
    },
    {
      id: "setting",
      path: "/setting",
      label: "Setting",
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

  const handleLogout = () => {
    console.log("Logout clicked");
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
          {sidebarOpen && <span className="sidebar-nav-label">Logout</span>}
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
