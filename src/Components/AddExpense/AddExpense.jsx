import { useState } from "react";
import { MdMenu, MdNotifications, MdSearch, MdSettings } from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./AddExpense.css";

const AddExpense = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Submitted:", expenseData);
    // You can add API call here to send expenseData
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

          <div className="addexpense-header-actions">
            <button className="addexpense-icon-btn">
              <MdSearch />
            </button>
            <button className="addexpense-icon-btn">
              <MdSettings />
            </button>
            <button className="addexpense-icon-btn addexpense-notification-btn">
              <MdNotifications />
              <span className="addexpense-notification-dot"></span>
            </button>

            <div className="addexpense-user-info">
              <span className="addexpense-user-name">Abram Schleifer</span>
              <span className="addexpense-user-role">Admin</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="addexpense-content">
          <div className="addexpense-form-container">
            <div className="addexpense-form-header">
              <h2 className="addexpense-form-title">Details</h2>

              <div className="addexpense-form-actions">
                <button className="addexpense-remove-btn" type="button">
                  Remove
                </button>
                <button
                  className="addexpense-save-btn"
                  onClick={handleExpenseSubmit}
                >
                  Save
                </button>
              </div>
            </div>

            <form className="addexpense-form" onSubmit={handleExpenseSubmit}>
              {/* ROW 1 */}
              <div className="addexpense-grid">
                <div className="addexpense-field">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Enter Date"
                    value={expenseData.date}
                    onChange={handleExpenseChange}
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
                  >
                    <option value="">Select</option>
                    <option value="A">Towing</option>
                    <option value="B"> Repair</option>
                    <option value="C"> Fuel</option>
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
