import { useEffect, useState } from "react";
import {
  MdAdd,
  MdCalendarToday,
  MdDelete,
  MdDirectionsCar,
  MdEdit,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { expensesApi } from "../services/api";
import "./Expenses.css";

const Expenses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expensesApi.getAll();
      setExpenses(response.data.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await expensesApi.delete(id);
        fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/expenses/edit/${id}`);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vehicleVin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="expenses-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`expenses-main ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* HEADER */}
        <div className="expenses-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="page-title">Expense Tracker</h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="expenses-content">
          {/* FILTER BAR */}
          <div className="dashboard-section">
            <div className="filter-group">
              <div className="filter-item">
                <MdCalendarToday className="filter-icon" />
                <select className="filter-select">
                  <option>Month</option>
                  <option>Week</option>
                  <option>Year</option>
                </select>
              </div>

              <div className="filter-item">
                <MdDirectionsCar className="filter-icon" />
                <select className="filter-select">
                  <option>Vehicle VIN</option>
                </select>
              </div>

              <div className="search-box">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for client"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="dashboard-actions">
                <button className="action-btn secondary-btn">
                  Export To Excel
                </button>
                <Link to="/expenses/addexpense">
                  <button className="action-btn primary-btn">
                    <MdAdd />
                    Add Expense
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="pl-table-section">
            <div className="section-header">
              <h2 className="section-title">Expenses</h2>
            </div>

            <div className="table-container">
              {loading ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Loading...
                </div>
              ) : (
                <table className="pl-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>VIN Number</th>
                      <th>Expense Type</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((item) => (
                      <tr key={item._id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td className="customer-name">{item.vehicleVin}</td>
                        <td className="investor">{item.expenseType}</td>
                        <td>{item.description}</td>
                        <td className="net-profit">
                          {item.amount.toLocaleString()}
                        </td>
                        <td>
                          <div className="expenses-action-buttons">
                            <button
                              className="expenses-action-btn expenses-edit-btn"
                              onClick={() => handleEdit(item._id)}
                              title="Edit expense"
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="expenses-action-btn expenses-delete-btn"
                              onClick={() => handleDelete(item._id)}
                              title="Delete expense"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* PAGINATION */}
          <div className="pagination-section">
            <div className="pagination-info">
              <span>Results per page:</span>
              <select className="pagination-select">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>

            <div className="pagination-controls">
              <button className="pagination-btn">Prev</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
