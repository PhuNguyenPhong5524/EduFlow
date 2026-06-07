import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import SecuritySettingsPage from "./pages/auth/SecuritySettingsPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/customer/DashboardPage";
import InstructorDashboardPage from "./pages/provider/InstructorDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<></>} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/security-settings" element={<SecuritySettingsPage />} />

          {/* Customer */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["student"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Provider / Instructor */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute roles={["instructor"]}>
                <InstructorDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
