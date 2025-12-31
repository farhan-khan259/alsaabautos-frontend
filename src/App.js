


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Components
import AddExpense from './Components/AddExpense/AddExpense';
import AddInvestor from './Components/AddInvestor/AddInvestor';
import AddReport from './Components/AddReport/AddReport';
import AddUnit from './Components/AddUnit/AddUnit';
import Dashboard from './Components/Dashboard/Dashboard';
import EditExpense from './Components/EditExpense/EditExpense';
import EditInvestor from './Components/EditInvestor/EditInvestor';
import EditReport from './Components/EditReport/EditReport';
import EditUnit from './Components/EditUnit/EditUnit';
import Expenses from './Components/Expenses/Expenses';
import Investors from './Components/Investors/Investors';
import Login from './Components/Login/Login';
import MonthlyPerformance from './Components/MonthlyPerformance/MonthlyPerformance';
import PaymentHistory from './Components/PaymentHistory/PaymentHistory';
import Payments from './Components/Payments/Payments';
import PL from './Components/PL/PL';
import Setting from './Components/Setting/Setting';
import UnitDetails from './Components/UnitDetails/UnitDetails';
import Units from './Components/Units/Units';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/units" element={<Units />} />
          <Route path="/units/add" element={<AddUnit />} />
          <Route path="/units/edit" element={<EditUnit />} />
          <Route path="/units/:id" element={<UnitDetails />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/investors/add" element={<AddInvestor />} />
          <Route path="/investors/edit/:id" element={<EditInvestor />} />
          <Route path="/performance" element={<MonthlyPerformance />} />
          <Route path="/pl" element={<PL />} />
          <Route path="/pl/addreport" element={<AddReport />} />
          <Route path="/pl/editreport" element={<EditReport />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/addexpense" element={<AddExpense />} />
          <Route path="/expenses/editexpense" element={<EditExpense />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/history" element={<PaymentHistory />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;