"use client";

import { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdDirectionsCar,
  MdMenu,
  MdPeople,
  MdReceipt,
} from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import {
  expensesApi,
  investorsApi,
  reportsApi,
  unitsApi,
} from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState([
    {
      title: "Total Cars",
      value: "Loading...",
      icon: <MdDirectionsCar />,
      color: "#3b82f6",
    },
    {
      title: "Cars Sold",
      value: "Loading...",
      icon: <MdDirectionsCar />,
      color: "#10b981",
    },
    {
      title: "Total Profit",
      value: "Loading...",
      icon: <MdAttachMoney />,
      color: "#f59e0b",
    },
    {
      title: "Expenses",
      value: "Loading...",
      icon: <MdReceipt />,
      color: "#ef4444",
    },
    {
      title: "Car In Stock",
      value: "Loading...",
      icon: <MdDirectionsCar />,
      color: "#8b5cf6",
    },
    {
      title: "Total Tax",
      value: "Loading...",
      icon: <MdAttachMoney />,
      color: "#06b6d4",
    },
    {
      title: "Total Investor",
      value: "Loading...",
      icon: <MdPeople />,
      color: "#ec4899",
    },
    {
      title: "Total Investment",
      value: "Loading...",
      icon: <MdAttachMoney />,
      color: "#14b8a6",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsRes, expensesRes, reportsRes, investorsRes] =
          await Promise.all([
            unitsApi.getAll(),
            expensesApi.getAll(),
            reportsApi.getAll(),
            investorsApi.getAll(),
          ]);

        const units = unitsRes.data.data.units;
        const expensesList = expensesRes.data.data.expenses;
        const reports = reportsRes.data.data.reports;
        const investors = investorsRes.data.data.investors;

        // Calculate Stats
        const totalCars = units.length;
        const carsSold = units.filter(
          (u) => u.status && u.status.toLowerCase() === "sold"
        ).length;
        const carsInStock = units.filter(
          (u) => u.status && u.status.toLowerCase() === "in stock"
        ).length;
        const totalProfit = reports.reduce(
          (acc, curr) => acc + (curr.netProfit || 0),
          0
        );
        const totalExpenses = expensesList.reduce(
          (acc, curr) => acc + (curr.amount || 0),
          0
        );
        const totalTax = units.reduce(
          (acc, curr) => acc + (curr.taxAmount || 0),
          0
        );
        const totalInvestors = investors.length;
        const totalInvestment = investors.reduce(
          (acc, curr) => acc + (curr.initialInvestment || 0),
          0
        );

        setStats([
          {
            title: "Total Cars",
            value: `${totalCars} Cars`,
            icon: <MdDirectionsCar />,
            color: "#3b82f6",
          },
          {
            title: "Cars Sold",
            value: `${carsSold}`,
            icon: <MdDirectionsCar />,
            color: "#10b981",
          },
          {
            title: "Total Profit",
            value: `${totalProfit.toLocaleString()}`,
            icon: <MdAttachMoney />,
            color: "#f59e0b",
          },
          {
            title: "Expenses",
            value: `${totalExpenses.toLocaleString()}`,
            icon: <MdReceipt />,
            color: "#ef4444",
          },
          {
            title: "Car In Stock",
            value: `${carsInStock}`,
            icon: <MdDirectionsCar />,
            color: "#8b5cf6",
          },
          {
            title: "Total Tax",
            value: `${totalTax.toLocaleString()}`,
            icon: <MdAttachMoney />,
            color: "#06b6d4",
          },
          {
            title: "Total Investor",
            value: `${totalInvestors}`,
            icon: <MdPeople />,
            color: "#ec4899",
          },
          {
            title: "Total Investment",
            value: `${totalInvestment.toLocaleString()}`,
            icon: <MdAttachMoney />,
            color: "#14b8a6",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

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
