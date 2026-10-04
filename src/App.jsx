import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'

// Landing page
import LandingPage from './pages/LandingPage'

// Auth pages
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// App Layout & Screens
import AppLayout from './components/AppLayout'
import DashboardOverview from './pages/DashboardOverview'
import ProjectsPage from './pages/ProjectsPage'
import TargetsPage from './pages/TargetsPage'
import IdentitiesPage from './pages/IdentitiesPage'
import AuthorizationPage from './pages/AuthorizationPage'
import ScansPage from './pages/ScansPage'
import NewScanPage from './pages/NewScanPage'
import ScanDetailPage from './pages/ScanDetailPage'
import FindingsPage from './pages/FindingsPage'
import FindingDetailPage from './pages/FindingDetailPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Marketing / Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Flow */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Core Connected Application Flow */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="targets" element={<TargetsPage />} />
          <Route path="identities" element={<IdentitiesPage />} />
          <Route path="authorization" element={<AuthorizationPage />} />
          <Route path="scans" element={<ScansPage />} />
          <Route path="scans/new" element={<NewScanPage />} />
          <Route path="scans/:scanId" element={<ScanDetailPage />} />
          <Route path="findings" element={<FindingsPage />} />
          <Route path="findings/:findingId" element={<FindingDetailPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Shorthand / Direct URL Aliases */}
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/projects" element={<Navigate to="/app/projects" replace />} />
        <Route path="/targets" element={<Navigate to="/app/targets" replace />} />
        <Route path="/identities" element={<Navigate to="/app/identities" replace />} />
        <Route path="/authorization" element={<Navigate to="/app/authorization" replace />} />
        <Route path="/scans" element={<Navigate to="/app/scans" replace />} />
        <Route path="/scans/new" element={<Navigate to="/app/scans/new" replace />} />
        <Route path="/scans/:scanId" element={<Navigate to="/app/scans/:scanId" replace />} />
        <Route path="/findings" element={<Navigate to="/app/findings" replace />} />
        <Route path="/findings/:findingId" element={<Navigate to="/app/findings/:findingId" replace />} />
        <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
        <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
        <Route path="/profile" element={<Navigate to="/app/settings" replace />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
