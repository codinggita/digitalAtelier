import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import PublishPage from './pages/PublishPage';
import TemplatesPage from './pages/TemplatesPage';
import PagesManagementPage from './pages/PagesManagementPage';
import DesignSettingsPage from './pages/DesignSettingsPage';
import AssetsLibraryPage from './pages/AssetsLibraryPage';
import PublishSuccessPage from './pages/PublishSuccessPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SiteEditorPage from './pages/SiteEditorPage';
import StoreManagementPage from './pages/StoreManagementPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingSpinner from './components/LoadingSpinner';

// Custom PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Custom PublicRoute component (redirects away from login/register if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      </Route>

      {/* Protected App Routes */}
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pages" element={<PagesManagementPage />} />
        <Route path="/design" element={<DesignSettingsPage />} />
        <Route path="/assets" element={<AssetsLibraryPage />} />
        <Route path="/publish-success/:id" element={<PublishSuccessPage />} />
        <Route path="/settings" element={<ProjectSettingsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/store" element={<StoreManagementPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>
      
      {/* Full Screen Editor Route without Sidebar */}
      <Route path="/editor/:id" element={<PrivateRoute><SiteEditorPage /></PrivateRoute>} />

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
