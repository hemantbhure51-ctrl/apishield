import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, Lock, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button, Badge } from '../components/ui/AppUI'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('jordan.davis@acme.com')
  const [password, setPassword] = useState('••••••••••••')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/app/dashboard')
    }, 400)
  }

  const handleQuickLogin = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/app/dashboard')
    }, 300)
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
          Sign In to Security Console
        </h1>
        <p style={{ color: '#9cb0bf', fontSize: 15, margin: 0 }}>
          Access your enterprise vulnerability assessments and telemetry.
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'linear-gradient(160deg, #111720 0%, #0d1319 100%)',
          border: '1px solid #23313d',
          borderRadius: 16,
          padding: 28,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(34,211,238,0.06)',
        }}
      >
        {/* Quick Demo Login Option */}
        <div
          onClick={handleQuickLogin}
          style={{
            background: 'linear-gradient(135deg, #15222e 0%, #0f1822 100%)',
            border: '1px solid #22d3ee44',
            borderRadius: 10,
            padding: '14px 16px',
            marginBottom: 20,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--cyan)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#22d3ee44'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #334150, #1c252e)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 12,
              color: '#dffbff',
              border: '1px solid #22d3ee66',
            }}
          >
            JD
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f6fa' }}>
              Jordan Davis (Security Admin)
            </div>
            <div style={{ fontSize: 11, color: 'var(--cyan)' }}>
              1-Click Demo Sign In →
            </div>
          </div>
          <Badge tone="cyan">Demo</Badge>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '18px 0',
            color: '#5c6875',
            fontSize: 12,
          }}
        >
          <div style={{ flex: 1, height: 1, background: '#1f2d3a' }} />
          <span>OR SIGN IN WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: '#1f2d3a' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9cb0bf' }}>Email Address</span>
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
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9cb0bf' }}>Password</span>
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
              <Lock size={16} style={{ color: '#5c6875' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Authenticating...' : 'Sign In to Platform'} <ArrowRight size={15} />
          </button>
        </form>

        <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: '#8c9ea9' }}>
          Don't have an enterprise workspace?{' '}
          <Link to="/signup" style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}>
            Start Free Scan
          </Link>
        </div>
      </div>
    </div>
  )
}
