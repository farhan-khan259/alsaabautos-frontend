import { useEffect, useState } from "react";
import { MdMenu, MdNotifications, MdSearch, MdSettings } from "react-icons/md";
import Sidebar from "../Sidebar/Sidebar";
import "./EditExpense.css";

const EditExpense = ({ existingExpense }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [expenseData, setExpenseData] = useState({
    date: "12/10/2005",
    vehicleVin: "HJFWJ563276",
    expenseType: "Towing",
    description: "City Transport",
    amount: "150$",
  });

  // Load existing expense data into state
  useEffect(() => {
    if (existingExpense) {
      setExpenseData({
        date: existingExpense.date || "",
        vehicleVin: existingExpense.vehicleVin || "",
        expenseType: existingExpense.expenseType || "",
        description: existingExpense.description || "",
        amount: existingExpense.amount || "",
      });
    }
  }, [existingExpense]);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpenseUpdate = (e) => {
    e.preventDefault();
    console.log("Expense Updated:", expenseData);
    // Send API call here to update expense
  };

  return (
    <div className="editexpense-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`editexpense-main ${
          sidebarOpen
            ? "editexpense-sidebar-open"
            : "editexpense-sidebar-closed"
        }`}
      >
        {/* HEADER */}
        <div className="editexpense-header">
          <div className="editexpense-header-left">
            <button
              className="editexpense-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MdMenu />
            </button>
            <h1 className="editexpense-page-title">Edit Expense</h1>
          </div>

          <div className="editexpense-header-actions">
            <button className="editexpense-icon-btn">
              <MdSearch />
            </button>
            <button className="editexpense-icon-btn">
              <MdSettings />
            </button>
            <button className="editexpense-icon-btn editexpense-notification-btn">
              <MdNotifications />
              <span className="editexpense-notification-dot"></span>
            </button>

            <div className="editexpense-user-info">
              <span className="editexpense-user-name">Abram Schleifer</span>
              <span className="editexpense-user-role">Admin</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="editexpense-content">
          <div className="editexpense-form-container">
            <div className="editexpense-form-header">
              <h2 className="editexpense-form-title">Expense Details</h2>

              <div className="editexpense-form-actions">
                <button className="editexpense-remove-btn" type="button">
                  Delete
                </button>
                <button
                  className="editexpense-save-btn"
                  onClick={handleExpenseUpdate}
                >
                  Update
                </button>
              </div>
            </div>

            <form className="editexpense-form" onSubmit={handleExpenseUpdate}>
              {/* ROW 1 */}
              <div className="editexpense-grid">
                <div className="editexpense-field">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Enter Date"
                    value={expenseData.date}
                    onChange={handleExpenseChange}
                  />
                </div>

                <div className="editexpense-field">
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
              <div className="editexpense-grid">
                <div className="editexpense-field">
                  <label>Expense Type</label>
                  <select
                    name="expenseType"
                    value={expenseData.expenseType}
                    onChange={handleExpenseChange}
                  >
                    <option value="">Select</option>
                    <option value="Towing">Towing</option>
                    <option value="Repair">Repair</option>
                    <option value="Fuel">Fuel</option>
                  </select>
                </div>

                <div className="editexpense-field">
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
              <div className="editexpense-grid">
                <div className="editexpense-field">
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

export default EditExpense;
