import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, Globe, Mail, ArrowLeft, Building2 } from 'lucide-react'
import { Button } from '../components/ui/AppUI'

export default function SignupPage() {
  const navigate = useNavigate()
  const [workspace, setWorkspace] = useState('Acme Corp')
  const [targetUrl, setTargetUrl] = useState('https://api.acme.com')
  const [email, setEmail] = useState('alex.chen@acme.com')
  const [loading, setLoading] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/app/scans/new')
    }, 400)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(1000px circle at 50% 20%, #22d3ee14, transparent 50%), #080b10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        position: 'relative',
      }}
    >
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: 32,
          left: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--muted)',
          fontSize: 14,
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        <ArrowLeft size={16} /> Back to homepage
      </Link>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: 'var(--cyan-soft)',
              border: '1px solid #22d3ee52',
              borderRadius: 12,
              display: 'grid',
              placeItems: 'center',
              color: 'var(--cyan)',
            }}
          >
            <Shield size={24} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ fontSize: 18, color: '#fff', letterSpacing: '-0.02em', display: 'block' }}>
              AEGIS<span style={{ color: 'var(--cyan)' }}>API</span>
            </strong>
            <small style={{ color: '#5c6875', fontSize: 9, letterSpacing: '0.14em', fontWeight: 700 }}>
              SECURITY PLATFORM
            </small>
          </div>
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 750, color: '#f7fafc', margin: '8px 0' }}>
          Start Your Free API Scan
        </h1>
        <p style={{ color: '#9cb0bf', fontSize: 15, margin: 0 }}>
          Set up your workspace and launch your first non-destructive vulnerability assessment.
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'linear-gradient(160deg, #111720 0%, #0d1319 100%)',
          border: '1px solid #23313d',
          borderRadius: 16,
          padding: 28,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(34,211,238,0.06)',
        }}
      >
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9cb0bf' }}>Workspace Name</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#090e14',
                border: '1px solid #23313d',
                borderRadius: 8,
                padding: '0 12px',
                height: 42,
              }}
            >
              <Building2 size={16} style={{ color: '#5c6875' }} />
              <input
                type="text"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                required
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  outline: 'none',
                  fontSize: 14,
                }}
              />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9cb0bf' }}>Target API Base URL</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#090e14',
                border: '1px solid #23313d',
                borderRadius: 8,
                padding: '0 12px',
                height: 42,
              }}
            >
              <Globe size={16} style={{ color: '#5c6875' }} />
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                required
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  outline: 'none',
                  fontSize: 14,
                }}
              />
            </div>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9cb0bf' }}>Work Email</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#090e14',
                border: '1px solid #23313d',
                borderRadius: 8,
                padding: '0 12px',
                height: 42,
              }}
            >
              <Mail size={16} style={{ color: '#5c6875' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  outline: 'none',
                  fontSize: 14,
                }}
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="lp-primary"
            style={{ width: '100%', marginTop: 8 }}
          >
            {loading ? 'Creating Workspace...' : 'Configure Assessment & Launch'} <ArrowRight size={15} />
          </button>
        </form>

        <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: '#8c9ea9' }}>
          Already have an enterprise account?{' '}
          <Link to="/login" style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
