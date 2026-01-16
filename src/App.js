


// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import { LanguageProvider } from './context/LanguageContext';

// // Components
// import AddExpense from './Components/AddExpense/AddExpense';
// import AddInvestor from './Components/AddInvestor/AddInvestor';
// import AddReport from './Components/AddReport/AddReport';
// import AddUnit from './Components/AddUnit/AddUnit';
// import Dashboard from './Components/Dashboard/Dashboard';
// import EditExpense from './Components/EditExpense/EditExpense';
// import EditInvestor from './Components/EditInvestor/EditInvestor';
// import EditReport from './Components/EditReport/EditReport';
// import EditUnit from './Components/EditUnit/EditUnit';
// import Expenses from './Components/Expenses/Expenses';
// import Investors from './Components/Investors/Investors';
// import Login from './Components/Login/Login';
// import MonthlyPerformance from './Components/MonthlyPerformance/MonthlyPerformance';
// import PaymentHistory from './Components/PaymentHistory/PaymentHistory';
// import Payments from './Components/Payments/Payments';
// import PL from './Components/PL/PL';
// import Setting from './Components/Setting/Setting';
// import UnitDetails from './Components/UnitDetails/UnitDetails';
// import Units from './Components/Units/Units';

// function App() {
//   return (
//     <LanguageProvider>
//       <Router>
//         <div className="app">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/units" element={<Units />} />
//             <Route path="/units/add" element={<AddUnit />} />
//             <Route path="/units/edit" element={<EditUnit />} />
//             <Route path="/units/:id" element={<UnitDetails />} />
//             <Route path="/investors" element={<Investors />} />
//             <Route path="/investors/add" element={<AddInvestor />} />
//             <Route path="/investors/edit/:id" element={<EditInvestor />} />
//             <Route path="/performance" element={<MonthlyPerformance />} />
//             <Route path="/pl" element={<PL />} />
//             <Route path="/pl/addreport" element={<AddReport />} />
//             <Route path="/pl/editreport" element={<EditReport />} />
//             <Route path="/expenses" element={<Expenses />} />
//             <Route path="/expenses/addexpense" element={<AddExpense />} />
//             <Route path="/expenses/editexpense" element={<EditExpense />} />
//             <Route path="/payments" element={<Payments />} />
//             <Route path="/payments/history" element={<PaymentHistory />} />
//             <Route path="/setting" element={<Setting />} />
//           </Routes>
//         </div>
//       </Router>
//     </LanguageProvider>
//   );
// }

// export default App;




import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';

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

import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public route - only accessible when NOT logged in */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/units" element={<ProtectedRoute><Units /></ProtectedRoute>} />
            <Route path="/units/add" element={<ProtectedRoute><AddUnit /></ProtectedRoute>} />
            <Route path="/units/edit/:id" element={<ProtectedRoute><EditUnit /></ProtectedRoute>} />
            <Route path="/units/:id" element={<ProtectedRoute><UnitDetails /></ProtectedRoute>} />

            <Route path="/investors" element={<ProtectedRoute><Investors /></ProtectedRoute>} />
            <Route path="/investors/add" element={<ProtectedRoute><AddInvestor /></ProtectedRoute>} />
            <Route path="/investors/edit/:id" element={<ProtectedRoute><EditInvestor /></ProtectedRoute>} />

            <Route path="/performance" element={<ProtectedRoute><MonthlyPerformance /></ProtectedRoute>} />

            <Route path="/pl" element={<ProtectedRoute><PL /></ProtectedRoute>} />
            <Route path="/pl/addreport" element={<ProtectedRoute><AddReport /></ProtectedRoute>} />
            <Route path="/pl/editreport/:id" element={<ProtectedRoute><EditReport /></ProtectedRoute>} />

            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/expenses/addexpense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path="/expenses/edit/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />

            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/payments/history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />

            <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />

            {/* Catch all route - redirect to appropriate page */}
            <Route path="*" element={
              <Navigate to="/login" replace />
            } />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;