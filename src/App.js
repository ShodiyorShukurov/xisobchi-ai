import { Route, Routes, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import PrivateRoute from "./utils/PrivateRoute";


import LoginPage from "./components/layout/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import UsersListTable from "./pages/UserList/UsersListTable";
import TransactionListTable from "./pages/TransactionList/TransactionListTable";
import BotSettings from "./pages/BotSettings/BotSettings";
import PartnerList from "./pages/PartnerList/PartnerList";
import CategoryList from "./pages/CategoryList/CategoryList";
import Cards from "./pages/Cards/Cards";
import ReportsPage from "./pages/Reports/ReportsPage";
import DebtsPage from "./pages/Debts/DebtsPage";
// import { ADMIN_ROLE } from "./utils/constants";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private route logic for protecting routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-list" element={<UsersListTable />} />
          <Route path="transaction-list" element={<TransactionListTable />} />
          <Route path="bot-settings" element={<BotSettings />} />
          <Route path="partner" element={<PartnerList />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="card-list" element={<Cards />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="debts" element={<DebtsPage />} />
          {/* {localStorage.getItem(ADMIN_ROLE) === "main_admin" ? (
            <Route path="admin-list" element={<Admin />} />
          ) : (
            <Route path="admin-list" element={<Navigate to="/dashboard" />} />
          )} */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
