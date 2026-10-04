import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Shield, ArrowRight } from 'lucide-react'

export const navItems = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'OWASP Top 10', href: '#risks' },
  { label: 'Evidence Ledger', href: '#evidence' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Console Preview', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
]

export function PrimaryButton({ children, onClick, small, style = {}, className = '' }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: small ? 38 : 44,
        padding: small ? '0 18px' : '0 22px',
        fontSize: small ? 13.5 : 14.5,
        fontWeight: 600,
        color: '#e6fdff',
        background: 'linear-gradient(145deg, #102630, #0a181e)',
        border: '1px solid #22d3eeb3',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0 0 24px #22d3ee1f, inset 0 1px 1px rgba(255,255,255,0.15)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        ...style,
      }}
      className={`lp-primary ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--cyan)'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 30px #22d3ee42, 0 0 12px #22d3ee66'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#22d3eeb3'
        e.currentTarget.style.color = '#e6fdff'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 0 24px #22d3ee1f, inset 0 1px 1px rgba(255,255,255,0.15)'
      }}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, onClick, small, style = {}, className = '' }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: small ? 38 : 44,
        padding: small ? '0 16px' : '0 20px',
        fontSize: small ? 13.5 : 14.5,
        fontWeight: 600,
        color: '#c4d0dc',
        background: '#121820d9',
        border: '1px solid var(--border)',
        borderRadius: 8,
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        ...style,
      }}
      className={`lp-secondary ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4b5e70'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.background = '#18232e'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = '#c4d0dc'
        e.currentTarget.style.background = '#121820d9'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setMenuOpen(false)
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        width: '100%',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: scrolled ? '#080b10f0' : '#080b10e0',
        borderBottom: '1px solid #26313db8',
        transition: 'background 0.3s',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          height: 74,
          padding: '0 46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
        className="lp-nav"
      >
        {/* Brand */}
        <div className="lp-nav-corner">
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}
            className="lp-brand"
          >
            <span>
              <Shield size={19} />
            </span>
            <strong>
              APIShield
            </strong>
          </Link>
          <span className="lp-nav-tag">
            ENTERPRISE SCANNER
          </span>
        </div>

        {/* Center Nav Links */}
        <nav
          className={menuOpen ? 'open' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            whiteSpace: 'nowrap',
          }}
        >
          {navItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: '#9aa7b3',
                fontSize: 14,
                fontWeight: 500,
                padding: '6px 8px',
                borderRadius: 6,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f1f8fc'
                e.currentTarget.style.background = '#ffffff0a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9aa7b3'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div
          className="lp-nav-actions"
          style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}
        >
          <Link
            to="/login"
            className="lp-nav-signin"
            style={{
              color: '#b0bcc6',
              fontSize: 14,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = '#ffffff0f'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#b0bcc6'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Sign In
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <PrimaryButton small>
              Start Scanning <ArrowRight size={14} />
            </PrimaryButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lp-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            background: '#0f161f',
            border: '1px solid var(--border)',
            borderRadius: 12,
            margin: '0 14px 12px',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            boxShadow: '0 25px 60px #0009',
          }}
        >
          {navItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: '#9aa7b3',
                fontSize: 15,
                fontWeight: 500,
                padding: '12px 14px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 12,
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#b0bcc6',
                fontSize: 15,
                fontWeight: 600,
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <PrimaryButton style={{ width: '100%' }}>
                Start Scanning <ArrowRight size={14} />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
