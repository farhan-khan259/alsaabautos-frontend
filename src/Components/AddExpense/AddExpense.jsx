import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { expensesApi } from "../services/api";
import "./AddExpense.css";

const AddExpense = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState({
    date: "",
    vehicleVin: "",
    expenseType: "",
    description: "",
    amount: "",
  });

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...expenseData,
        amount: Number(expenseData.amount),
      };
      await expensesApi.create(payload);
      alert("Expense added successfully!");
      navigate("/expenses");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addexpense-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`addexpense-main ${
          sidebarOpen ? "addexpense-sidebar-open" : "addexpense-sidebar-closed"
        }`}
      >
        {/* HEADER */}
        <div className="addexpense-header">
          <div className="addexpense-header-left">
            <button
              className="addexpense-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="addexpense-page-title">Add Expense</h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="addexpense-content">
          <div className="addexpense-form-container">
            <div className="addexpense-form-header">
              <h2 className="addexpense-form-title">Details</h2>

              <div className="addexpense-form-actions">
                <button
                  className="addexpense-remove-btn"
                  type="button"
                  onClick={() => navigate("/expenses")}
                >
                  Cancel
                </button>
                <button
                  className="addexpense-save-btn"
                  onClick={handleExpenseSubmit}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            <form className="addexpense-form" onSubmit={handleExpenseSubmit}>
              {/* ROW 1 */}
              <div className="addexpense-grid">
                <div className="addexpense-field">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="Enter Date"
                    value={expenseData.date}
                    onChange={handleExpenseChange}
                    required
                  />
                </div>

                <div className="addexpense-field">
                  <label>Vehicle VIN</label>
                  <input
                    type="text"
                    name="vehicleVin"
                    placeholder="Enter Vehicle VIN"
                    value={expenseData.vehicleVin}
                    onChange={handleExpenseChange}
                    required
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="addexpense-grid">
                <div className="addexpense-field">
                  <label>Expense Type</label>
                  <select
                    name="expenseType"
                    value={expenseData.expenseType}
                    onChange={handleExpenseChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Towing">Towing</option>
                    <option value="Repair"> Repair</option>
                    <option value="Fuel"> Fuel</option>
                    <option value="Other"> Other</option>
                  </select>
                </div>

                <div className="addexpense-field">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={expenseData.description}
                    onChange={handleExpenseChange}
                  />
                </div>
              </div>

              {/* ROW 3 */}
              <div className="addexpense-grid">
                <div className="addexpense-field">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    value={expenseData.amount}
                    onChange={handleExpenseChange}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
