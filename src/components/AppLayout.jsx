import React, { useState } from 'react'
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Menu,
  ChevronRight,
  ChevronsUpDown,
  MoreHorizontal,
  Bell,
  CheckCircle2
} from 'lucide-react'
import { navGroups, breadcrumbTitles } from '../data/appData'
import { SearchBox } from './ui/AppUI'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const segments = location.pathname.split('/').filter(Boolean).slice(1)

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="brand">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div className="brand-mark">
              <Shield size={21} />
            </div>
            {!collapsed && (
              <div className="brand-copy">
                <strong>
                  AEGIS<span>API</span>
                </strong>
                <small>SECURITY PLATFORM</small>
              </div>
            )}
          </Link>

          <button
            className="icon-button collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>

          <button
            className="icon-button mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={18} strokeWidth={1.7} />
                    <span>{item.label}</span>
                    {item.badge && <b>{item.badge}</b>}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div
            className="workspace-chip"
            onClick={() => navigate('/app/projects')}
            style={{ cursor: 'pointer' }}
            title="Switch workspace / View projects"
          >
            <div className="workspace-logo">AC</div>
            <div className="workspace-copy">
              <span>Acme Labs</span>
              <small>Business workspace</small>
            </div>
            <ChevronsUpDown size={15} />
          </div>

          <div
            className="user-chip"
            onClick={() => navigate('/app/settings')}
            style={{ cursor: 'pointer' }}
            title="Profile & Settings"
          >
            <div className="avatar">JD</div>
            <div className="user-copy">
              <span>Jordan Davis</span>
              <small>Security Admin</small>
            </div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Column */}
      <div className="main-column">
        {/* Topbar */}
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={19} />
          </button>

          <div className="breadcrumbs">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <span>Security</span>
            </Link>
            {segments.map((seg) => (
              <span key={seg}>
                <ChevronRight size={13} />{' '}
                <span style={{ color: '#f0f5f7' }}>
                  {breadcrumbTitles[seg] || seg}
                </span>
              </span>
            ))}
          </div>

          <div className="top-actions">
            <div className="scanner-status">
              <i /> Scanner operational
            </div>
            <SearchBox placeholder="Search platform" />

            <div style={{ position: 'relative' }}>
              <button
                className="icon-button has-notification"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={18} />
              </button>

              {/* Notification Flyout */}
              {showNotifications && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    width: 320,
                    background: '#10161f',
                    border: '1px solid #283a48',
                    borderRadius: 12,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                    zIndex: 100,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #1f2d3a',
                      paddingBottom: 8,
                      marginBottom: 10,
                    }}
                  >
                    <strong style={{ fontSize: 13, color: '#f0f6fa' }}>
                      Security Alerts
                    </strong>
                    <span style={{ fontSize: 11, color: 'var(--cyan)' }}>
                      2 unread
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link
                      to="/app/findings/FND-284"
                      onClick={() => setShowNotifications(false)}
                      style={{
                        padding: 8,
                        borderRadius: 6,
                        background: '#15202c',
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171' }}>
                        CRITICAL: Broken Object Level Authorization
                      </div>
                      <small style={{ color: '#8c9da9', fontSize: 11 }}>
                        SCN-1042 · GET /api/v1/orders/{'{id}'}
                      </small>
                    </Link>
                    <Link
                      to="/app/scans/SCN-1042"
                      onClick={() => setShowNotifications(false)}
                      style={{
                        padding: 8,
                        borderRadius: 6,
                        background: '#15202c',
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)' }}>
                        Scan Progress: 72% Completed
                      </div>
                      <small style={{ color: '#8c9da9', fontSize: 11 }}>
                        Authorization comparison in progress
                      </small>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="top-avatar"
              onClick={() => navigate('/app/settings')}
              title="Jordan Davis - Security Admin"
              style={{ cursor: 'pointer' }}
            >
              JD
            </div>
          </div>
        </header>

        {/* Dynamic Nested Routes */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
