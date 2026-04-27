import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KYCPage from './pages/KYCPage';
import HomePage from './pages/HomePage';
import FundsPage from './pages/FundsPage';
import FundDetailPage from './pages/FundDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import GoalsPage from './pages/GoalsPage';
import ProfilePage from './pages/ProfilePage';
import SupportPage from './pages/SupportPage';
import FormsPage from './pages/FormsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminFundsPage from './pages/admin/AdminFundsPage';
import AdminKYCPage from './pages/admin/AdminKYCPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminBroadcastPage from './pages/admin/AdminBroadcastPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/kyc" element={<ProtectedRoute><KYCPage /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/funds" element={<ProtectedRoute><FundsPage /></ProtectedRoute>} />
            <Route path="/funds/:id" element={<ProtectedRoute><FundDetailPage /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
            <Route path="/forms" element={<ProtectedRoute><FormsPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
            <Route path="/admin/funds" element={<ProtectedRoute adminOnly><AdminFundsPage /></ProtectedRoute>} />
            <Route path="/admin/kyc" element={<ProtectedRoute adminOnly><AdminKYCPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrdersPage /></ProtectedRoute>} />
            <Route path="/admin/broadcast" element={<ProtectedRoute adminOnly><AdminBroadcastPage /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReportsPage /></ProtectedRoute>} />
            <Route path="/admin/system" element={<ProtectedRoute adminOnly><AdminSystemPage /></ProtectedRoute>} />
          </Routes>
        </AppShell>
      </AuthProvider>
    </BrowserRouter>
  );
}
