import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Radio,
  Lock,
  FileCode,
  Shield,
  ShieldAlert,
  RotateCcw,
  Check
} from 'lucide-react'
import { PrimaryButton, SecondaryButton } from './Navbar'

const floatingNodes = [
  {
    id: 'api',
    label: 'API Gateways',
    detail: '67 endpoints mapped',
    icon: Globe,
    cls: 'node-api',
  },
  {
    id: 'auth',
    label: 'Auth Contexts',
    detail: 'JWT, OAuth, API Keys',
    icon: Radio,
    cls: 'node-auth',
  },
  {
    id: 'access',
    label: 'BOLA & RBAC',
    detail: 'Cross-role boundary tests',
    icon: Lock,
    cls: 'node-access',
  },
  {
    id: 'openapi',
    label: 'OpenAPI Spec',
    detail: 'Schema contract drift',
    icon: FileCode,
    cls: 'node-openapi',
  },
  {
    id: 'checks',
    label: 'Security Engine',
    detail: 'OWASP API Top 10',
    icon: Shield,
    cls: 'node-checks',
  },
  {
    id: 'findings',
    label: 'Evidence Ledger',
    detail: 'Redacted HTTP telemetry',
    icon: ShieldAlert,
    cls: 'node-findings',
  },
]

const coreChecklist = [
  'OAuth & JWT Boundaries',
  'BOLA Authorization Matrix',
  'OWASP API Inventory',
  'Redacted Secrets Vault',
  'Autonomous Security Engine',
]

const trustIndicators = [
  'Authorized Targets Only',
  'Non-Destructive Scanning',
  'Redacted Telemetry Logs',
]

export default function Hero() {
  const [activeNode, setActiveNode] = useState('checks')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 8, y: -y * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setActiveNode('checks')
  }

  return (
    <section className="lp-hero" ref={heroRef}>
      {/* Background grid */}
      <div className="hero-backdrop" />

      {/* Left Column: Hero Copy */}
      <div className="lp-hero-copy">
        {/* Eyebrow badge */}
        <div className="lp-eyebrow">
          <i /> CONTINUOUS API THREAT DETECTION <span>•</span> REAL-TIME DEFENSE
        </div>

        {/* Heading */}
        <h1>
          Secure Every API{' '}
          <span className="gradient-text">Before Exploitation.</span>
        </h1>

        {/* Description */}
        <p>
          Autonomous enterprise API vulnerability scanning, rigorous BOLA &amp; broken
          authentication detection, and granular evidence-driven reports for
          engineering and security teams.
        </p>

        {/* Action Buttons */}
        <div className="lp-hero-actions">
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <PrimaryButton>
              Start Scanning <ArrowRight size={15} />
            </PrimaryButton>
          </Link>
          <a href="#capabilities" style={{ textDecoration: 'none' }}>
            <SecondaryButton>
              Explore Capabilities <ArrowRight size={15} />
            </SecondaryButton>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="lp-trust">
          {trustIndicators.map((item) => (
            <span key={item}>
              <CheckCircle2 size={14} color="var(--green)" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Security Scanner Visual */}
      <div
        className="scanner-visual"
        aria-label="API security scanner product preview"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="scanner-grid" />
        <div className="scanner-orbit orbit-a" />
        <div className="scanner-orbit orbit-b" />

        {/* Animated Connector Lines & Moving Particles */}
        <svg
          className="scanner-lines"
          viewBox="0 0 660 560"
          aria-hidden="true"
        >
          <path d="M330 280 L120 105" />
          <path d="M330 280 L535 105" />
          <path d="M330 280 L585 280" />
          <path d="M330 280 L525 465" />
          <path d="M330 280 L135 465" />
          <path d="M330 280 L72 280" />

          {/* Flowing animated particles */}
          <circle className="particle p1" r="3.5">
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              path="M330 280 L120 105"
            />
          </circle>
          <circle className="particle p2" r="3.5">
            <animateMotion
              dur="4.0s"
              repeatCount="indefinite"
              path="M330 280 L535 105"
            />
          </circle>
          <circle className="particle p3" r="3.5">
            <animateMotion
              dur="3.0s"
              repeatCount="indefinite"
              path="M330 280 L585 280"
            />
          </circle>
          <circle className="particle p4" r="3.5">
            <animateMotion
              dur="4.4s"
              repeatCount="indefinite"
              path="M330 280 L135 465"
            />
          </circle>
          <circle className="particle p5" r="3.5">
            <animateMotion
              dur="3.8s"
              repeatCount="indefinite"
              path="M330 280 L72 280"
            />
          </circle>
          <circle className="particle p6" r="3.5">
            <animateMotion
              dur="4.2s"
              repeatCount="indefinite"
              path="M330 280 L525 465"
            />
          </circle>
        </svg>

        {/* 6 Floating Surrounding Cards */}
        {floatingNodes.map(({ id, label, icon: Icon, cls, detail }, idx) => (
          <div
            key={id}
            className={`scanner-node ${cls} ${activeNode === id ? 'is-active' : ''}`}
            style={{ animationDelay: `${idx * 160}ms` }}
            onMouseEnter={() => setActiveNode(id)}
          >
            <span>
              <Icon size={18} />
            </span>
            <div className="scanner-node-text">
              <strong>{label}</strong>
              <small>{detail}</small>
            </div>
          </div>
        ))}

        {/* Center Panel: AEGIS Scanner Core */}
        <div className="scanner-core">
          <div className="core-sweep" />

          {/* Core Header */}
          <div className="core-top">
            <span>
              <RotateCcw size={16} /> AEGIS SCANNER CORE
            </span>
            <i />
          </div>

          {/* Status Row */}
          <div className="core-status">
            <small>
              {activeNode ? `INSPECTING: ${activeNode.toUpperCase()}` : 'INSPECTING: CHECKS'}
            </small>
            <strong>
              <i /> LIVE AGENT
            </strong>
          </div>

          {/* Security Score & Checklist Row */}
          <div className="score-row">
            <div className="score-ring">
              <svg viewBox="0 0 104 104">
                <circle cx="52" cy="52" r="44" />
                <circle
                  className="score-progress"
                  cx="52"
                  cy="52"
                  r="44"
                  pathLength="100"
                  strokeDasharray="87 100"
                />
              </svg>
              <div>
                <strong>87</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="check-list">
              {coreChecklist.map((item) => (
                <span key={item}>
                  <Check size={13} color="var(--green)" /> {item}
                </span>
              ))}
            </div>
          </div>

          {/* Core Footer */}
          <div className="core-foot">
            <span>
              <ArrowRight size={13} /> Autonomous Security Engine
            </span>
            <span>ACTIVE · ENTERPRISE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
