import React from 'react'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-soft)',
        background: '#080b10',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          maxWidth: 1440,
          minHeight: 90,
          margin: '0 auto',
          padding: '28px 46px',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }}
        className="footer-inner"
      >
        {/* Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexShrink: 0,
          }}
          className="footer-brand"
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                background: 'var(--cyan-soft)',
                border: '1px solid #22d3ee4d',
                borderRadius: 8,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--cyan)',
              }}
            >
              <Shield size={16} />
            </span>
            <strong
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              AEGIS<span style={{ color: 'var(--cyan)' }}>API</span>
            </strong>
          </Link>
          <span
            style={{
              color: '#7b8b98',
              fontSize: 13,
              fontWeight: 500,
              borderLeft: '1px solid var(--border)',
              paddingLeft: 14,
            }}
          >
            Enterprise API Security
          </span>
        </div>

        {/* Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            flexWrap: 'nowrap',
          }}
          className="footer-nav"
        >
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, '#features')}
            style={{
              color: '#8c9ea9',
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c9ea9')}
          >
            Capabilities
          </a>
          <a
            href="#risks"
            onClick={(e) => handleNavClick(e, '#risks')}
            style={{
              color: '#8c9ea9',
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c9ea9')}
          >
            OWASP Coverage
          </a>
          <a
            href="#evidence"
            onClick={(e) => handleNavClick(e, '#evidence')}
            style={{
              color: '#8c9ea9',
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c9ea9')}
          >
            Evidence Ledger
          </a>
          <a
            href="#workflow"
            onClick={(e) => handleNavClick(e, '#workflow')}
            style={{
              color: '#8c9ea9',
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c9ea9')}
          >
            Workflow
          </a>
          <Link
            to="/app/dashboard"
            style={{
              color: 'var(--cyan)',
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Console
          </Link>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            style={{
              color: '#8c9ea9',
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c9ea9')}
          >
            FAQ
          </a>
        </nav>

        {/* Right */}
        <div style={{ flexShrink: 0 }} className="footer-right">
          <small style={{ color: '#5c6875', fontSize: 13 }}>
            © 2026 AEGIS Security. All telemetry protected.
          </small>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-inner {
            flex-wrap: wrap !important;
            justify-content: space-between !important;
            padding: 24px 20px !important;
          }
          .footer-nav {
            order: 3;
            width: 100% !important;
            justify-content: center !important;
            gap: 18px !important;
            padding-top: 14px;
            border-top: 1px solid #26313d66;
          }
        }
      `}</style>
    </footer>
  )
}
