import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginClient from "./page/LoginClient";
import LoginTrader from "./page/LoginTrader";
import AdminDashboard from "./page/AdminDashboard";
import EmployeeDashboard from "./page/EmployeeDashboard";
import Dashboard from "./page/Dashboard";
import AddCompany from "./page/AddCompany";
import HomePage from "./page/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import JobHistory from "./page/JobHistory";
import ApplicantHistory from "./page/ApplicantHistory";
import About from "./page/About";
import Pricing from "./page/Pricing";
import ForgotPassword from "./page/ForgotPassword";
import Jobs from "./page/Jobs";
import JobDetail from "./page/JobDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home-page" replace />}></Route>
          <Route path="/login-client" element={<LoginClient />}></Route>
          <Route path="/login-trader" element={<LoginTrader />}></Route>
          <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/add-company" element={<ProtectedRoute role="admin"><AddCompany /></ProtectedRoute>}></Route>
          <Route path="/job-history" element={<ProtectedRoute role="admin"><JobHistory /></ProtectedRoute>}></Route>
          <Route path="/applicant-history" element={<ProtectedRoute role="admin"><ApplicantHistory /></ProtectedRoute>}></Route>
          <Route path="/pricing" element={<ProtectedRoute role="admin"><Pricing /></ProtectedRoute>}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/jobs/:id" element={<JobDetail />}></Route>
          <Route path="/home-page" element={<HomePage />}></Route>
          <Route
            path="/employee-dashboard"
            element={<EmployeeDashboard />}
          ></Route>
          <Route path="*" element={<Navigate to="/home-page" replace />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
