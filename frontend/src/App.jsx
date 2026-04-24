import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import PublishPage from './pages/PublishPage';
import TemplatesPage from './pages/TemplatesPage';
import PagesManagementPage from './pages/PagesManagementPage';
import DesignSettingsPage from './pages/DesignSettingsPage';
import AssetsLibraryPage from './pages/AssetsLibraryPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SiteEditorPage from './pages/SiteEditorPage';
import StoreManagementPage from './pages/StoreManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected App Routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pages" element={<PagesManagementPage />} />
          <Route path="/design" element={<DesignSettingsPage />} />
          <Route path="/assets" element={<AssetsLibraryPage />} />
          <Route path="/settings" element={<ProjectSettingsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/store" element={<StoreManagementPage />} />
        </Route>
        
        {/* Full Screen Editor Route without Sidebar */}
        <Route path="/editor" element={<SiteEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
