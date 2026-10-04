import { useState } from 'react'
import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  FileText,
  Settings,
  Bell,
  Plus,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShieldAlert, label: 'Findings' },
  { icon: Activity, label: 'Monitor' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

const tableRows = [
  { endpoint: '/api/v1/users', method: 'GET', status: 'running', score: 0.72, progress: 72 },
  { endpoint: '/api/auth/login', method: 'POST', status: 'completed', score: 1.0, progress: 100 },
  { endpoint: '/api/v2/payments', method: 'POST', status: 'running', score: 0.38, progress: 38 },
  { endpoint: '/api/admin/users', method: 'DELETE', status: 'completed', score: 0.91, progress: 91 },
]

const score = 68
const circumference = 2 * Math.PI * 40
const dashArray = `${(score / 100) * circumference} ${circumference}`

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <section
      id="demo"
      style={{
        maxWidth: 1348,
        margin: '0 auto',
        paddingTop: 100,
        paddingBottom: 120,
      }}
      className="preview-section"
    >
      {/* Label */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--cyan)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          background: '#22d3ee14',
          border: '1px solid #22d3ee33',
          borderRadius: 9999,
          padding: '6px 14px',
          marginBottom: 8,
        }}
      >
        <LayoutDashboard size={13} />
        Product Preview
      </div>

      {/* Title row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'end',
          gap: 80,
          marginBottom: 48,
        }}
        className="preview-title-grid"
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(36px, 3.2vw, 48px)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              color: '#f7fafc',
              margin: '16px 0',
              lineHeight: 1.12,
            }}
          >
            A Dashboard Built for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Security Teams
            </span>
          </h2>
        </div>
        <div>
          <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7, margin: '0 0 10px' }}>
            Get full visibility into your API security posture with real-time scan results,
            vulnerability trends, and actionable remediation guidance.
          </p>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div
        style={{
          background: '#0a0f16',
          border: '1px solid #2e3e4e',
          borderRadius: 16,
          display: 'grid',
          gridTemplateColumns: '68px 1fr',
          height: 720,
          overflow: 'hidden',
          boxShadow: '0 40px 100px #00000080, 0 0 60px #22d3ee0d',
          transition: 'all 0.3s',
        }}
        className="dashboard-mock"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3b5368'
          e.currentTarget.style.boxShadow = '0 45px 115px #0000008c, 0 0 80px #22d3ee1a'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2e3e4e'
          e.currentTarget.style.boxShadow = '0 40px 100px #00000080, 0 0 60px #22d3ee0d'
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: '#090e14',
            borderRight: '1px solid var(--border-soft)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '20px 10px',
          }}
        >
          {/* Brand icon */}
          <div
            style={{
              width: 38,
              height: 38,
              background: 'var(--cyan-soft)',
              border: '1px solid #22d3ee52',
              borderRadius: 9,
              display: 'grid',
              placeItems: 'center',
              color: 'var(--cyan)',
              marginBottom: 8,
            }}
          >
            <ShieldCheck size={18} />
          </div>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                title={item.label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  display: 'grid',
                  placeItems: 'center',
                  color: item.active ? 'var(--cyan)' : '#647482',
                  background: item.active ? 'var(--cyan-soft)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={18} />
              </span>
            )
          })}
        </div>

        {/* Main body */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              padding: '0 26px',
              background: '#0c1219',
              borderBottom: '1px solid var(--border-soft)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#728392',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <LayoutDashboard size={15} />
              Dashboard
              <span style={{ color: '#d8e3eb', fontWeight: 600 }}>· API Security</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#34d399',
                background: '#10b98114',
                border: '1px solid #10b98133',
                borderRadius: 20,
                padding: '5px 12px',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <i
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 6px var(--green)',
                }}
              />
              Scan Active
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 26, overflow: 'hidden' }}>
            {/* Heading */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <small
                  style={{
                    color: 'var(--cyan)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                  }}
                >
                  SECURITY OVERVIEW
                </small>
                <strong style={{ color: '#f1f6f9', fontSize: 22, fontWeight: 700 }}>
                  API Security Dashboard
                </strong>
              </div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'var(--cyan)',
                  color: '#071014',
                  borderRadius: 8,
                  padding: '9px 14px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Plus size={14} /> New Scan
              </span>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                marginTop: 22,
              }}
              className="stats-row"
            >
              {[
                { label: 'Endpoints Scanned', value: '147', type: 'neutral' },
                { label: 'Vulnerabilities', value: '23', type: 'critical' },
                { label: 'Issues Resolved', value: '89', type: 'success' },
                { label: 'Pending Review', value: '11', type: 'warning' },
              ].map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            {/* Analytics row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '290px 1fr',
                gap: 14,
                marginTop: 18,
              }}
              className="analytics-row"
            >
              {/* Posture ring */}
              <div
                style={{
                  background: '#10161f',
                  border: '1px solid #23313e',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: 18,
                }}
              >
                <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
                  <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="45" cy="45" r="40" fill="none" stroke="#1e2c38" strokeWidth="9" />
                    <circle
                      cx="45"
                      cy="45"
                      r="40"
                      fill="none"
                      stroke="var(--cyan)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={dashArray}
                      style={{ filter: 'drop-shadow(0 0 6px #22d3ee66)' }}
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <strong style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{score}</strong>
                    <span style={{ color: '#728391', fontSize: 10 }}>/ 100</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <strong style={{ color: '#a4b4c2', fontSize: 12, marginBottom: 2 }}>Posture Score</strong>
                  {[
                    { label: 'Critical', color: 'var(--red)', count: '3' },
                    { label: 'High', color: 'var(--amber)', count: '8' },
                    { label: 'Medium', color: 'var(--cyan)', count: '12' },
                    { label: 'Low', color: '#64748b', count: '24' },
                  ].map((item) => (
                    <span
                      key={item.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        color: '#8c9ca9',
                      }}
                    >
                      <i
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: item.color,
                        }}
                      />
                      {item.label}
                      <b
                        style={{
                          color: '#d8e2ea',
                          marginLeft: 'auto',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 12,
                        }}
                      >
                        {item.count}
                      </b>
                    </span>
                  ))}
                </div>
              </div>

              {/* Trend chart */}
              <div
                style={{
                  background: '#10161f',
                  border: '1px solid #23313e',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '18px 22px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#e4edf3', fontSize: 14, fontWeight: 600 }}>
                    Vulnerability Trend
                  </strong>
                  <span style={{ color: '#798b9a', fontSize: 12 }}>Last 30 days</span>
                </div>
                <svg width="100%" height="75" viewBox="0 0 400 75" style={{ marginTop: 10 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 60 L50 55 L100 45 L150 50 L200 35 L250 30 L300 20 L350 15 L400 10 L400 75 L0 75 Z"
                    fill="url(#areaGrad)"
                  />
                  <path
                    d="M0 60 L50 55 L100 45 L150 50 L200 35 L250 30 L300 20 L350 15 L400 10"
                    fill="none"
                    stroke="var(--cyan)"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M0 65 L50 62 L100 58 L150 60 L200 50 L250 48 L300 42 L350 40 L400 38"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>

            {/* Table */}
            <div
              style={{
                background: '#10161f',
                border: '1px solid #23313e',
                borderRadius: 12,
                marginTop: 16,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 20px',
                  background: '#0d131b',
                  borderBottom: '1px solid var(--border-soft)',
                }}
              >
                <strong style={{ color: '#dce7ee', fontSize: 13, fontWeight: 600 }}>
                  Recent Scans
                </strong>
                <span style={{ color: '#778897', fontSize: 12 }}>View all →</span>
              </div>
              {tableRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1.4fr 110px 1fr 110px',
                    alignItems: 'center',
                    padding: '11px 20px',
                    borderBottom: i < tableRows.length - 1 ? '1px solid #26313d73' : 'none',
                    fontSize: 13,
                    transition: 'background 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#22d3ee08' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <code
                    style={{
                      color: 'var(--cyan)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {row.method}
                  </code>
                  <span style={{ color: '#a8b8c5', fontSize: 12 }}>{row.endpoint}</span>
                  <b
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      fontSize: 12,
                      fontWeight: 600,
                      color: row.status === 'running' ? 'var(--cyan)' : 'var(--green)',
                    }}
                  >
                    {row.status === 'running' ? (
                      <Activity size={12} style={{ animation: '1s infinite pulse' }} />
                    ) : (
                      <CheckCircle2 size={12} />
                    )}
                    {row.status}
                  </b>
                  <i
                    style={{
                      background: '#1f2a36',
                      borderRadius: 3,
                      maxWidth: 120,
                      height: 5,
                      display: 'block',
                      overflow: 'hidden',
                    }}
                  >
                    <em
                      style={{
                        background: 'var(--cyan)',
                        borderRadius: 3,
                        height: '100%',
                        width: `${row.progress}%`,
                        display: 'block',
                      }}
                    />
                  </i>
                  <strong
                    style={{
                      textAlign: 'right',
                      color: '#8fa1af',
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {Math.round(row.score * 100)}%
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginTop: 18,
          color: '#728392',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <ShieldCheck size={14} color="var(--cyan)" />
        Live dashboard preview — data updates in real time
      </p>

      <style>{`
        @media (max-width: 1080px) {
          .preview-section { max-width: calc(100% - 72px) !important; }
          .preview-title-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .dashboard-mock { height: 680px !important; }
          .analytics-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .preview-section { max-width: calc(100% - 40px) !important; }
          .dashboard-mock { grid-template-columns: 50px 1fr !important; height: 600px !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function StatCard({ stat }) {
  const colorMap = {
    neutral: { icon: 'var(--cyan)', bg: 'var(--cyan-soft)' },
    critical: { icon: 'var(--red)', bg: 'var(--red-soft)' },
    success: { icon: 'var(--green)', bg: 'var(--green-soft)' },
    warning: { icon: 'var(--amber)', bg: '#f59e0b1f' },
  }
  const colors = colorMap[stat.type]

  const iconEl = stat.type === 'neutral' ? <TrendingUp size={16} /> :
    stat.type === 'critical' ? <ShieldAlert size={16} /> :
      stat.type === 'success' ? <CheckCircle2 size={16} /> :
        <Bell size={16} />

  return (
    <div
      style={{
        background: '#10161f',
        border: '1px solid #23313e',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 112,
        padding: '16px 18px',
        position: 'relative',
        transition: 'all 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#141c27'
        e.currentTarget.style.borderColor = '#384e60'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#10161f'
        e.currentTarget.style.borderColor = '#23313e'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: 'grid',
          placeItems: 'center',
          background: colors.bg,
          color: colors.icon,
        }}
      >
        {iconEl}
      </span>
      <small style={{ color: '#8c9ea9', fontSize: 13, fontWeight: 500 }}>{stat.label}</small>
      <strong style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>{stat.value}</strong>
      <i
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: '#1c2631',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <b
          style={{
            display: 'block',
            width: '65%',
            height: '100%',
            background: 'var(--cyan)',
          }}
        />
      </i>
    </div>
  )
}
