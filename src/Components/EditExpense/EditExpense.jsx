import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { expensesApi } from "../services/api";
import "./EditExpense.css";

const EditExpense = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expenseData, setExpenseData] = useState({
    date: "",
    vehicleVin: "",
    expenseType: "",
    description: "",
    amount: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Load existing expense data into state
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);
        const response = await expensesApi.getOne(id);
        const data = response.data.data.expense;
        const formatDate = (dateString) =>
          dateString ? new Date(dateString).toISOString().split("T")[0] : "";

        setExpenseData({
          date: formatDate(data.date),
          vehicleVin: data.vehicleVin || "",
          expenseType: data.expenseType || "",
          description: data.description || "",
          amount: data.amount || "",
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
        alert("Failed to fetch expense details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExpense();
    }
  }, [id]);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpenseUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...expenseData,
        amount: Number(expenseData.amount),
      };
      await expensesApi.update(id, payload);
      alert("Expense updated successfully!");
      navigate("/expenses");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await expensesApi.delete(id);
        navigate("/expenses");
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

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
        </div>

        {/* CONTENT */}
        <div className="editexpense-content">
          <div className="editexpense-form-container">
            <div className="editexpense-form-header">
              <h2 className="editexpense-form-title">Expense Details</h2>

              <div className="editexpense-form-actions">
                <button
                  className="editexpense-remove-btn"
                  type="button"
                  onClick={handleDelete}
                >
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
                    type="date"
                    name="date"
                    placeholder="Enter Date"
                    value={expenseData.date}
                    onChange={handleExpenseChange}
                    required
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
                    required
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
                    required
                  >
                    <option value="">Select</option>
                    <option value="Towing">Towing</option>
                    <option value="Repair">Repair</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Other">Other</option>
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

export default EditExpense;
