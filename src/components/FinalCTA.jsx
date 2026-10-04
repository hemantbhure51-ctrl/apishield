import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowRight, PlayCircle, Shield } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from './Navbar'

export default function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section
      style={{
        width: 'min(1348px, calc(100% - 48px))',
        margin: '20px auto 110px',
        background: `radial-gradient(at 50% 40%, #22d3ee1f, transparent 60%),
          radial-gradient(at 80% 90%, #10b9810f, transparent 50%),
          #0c141c`,
        border: '1px solid #2e4352',
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 440,
        padding: '64px 32px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 30px 80px #00000073, 0 0 60px #22d3ee0f',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3b586c'
        e.currentTarget.style.boxShadow = '0 35px 95px #00000080, 0 0 80px #22d3ee1f'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2e4352'
        e.currentTarget.style.boxShadow = '0 30px 80px #00000073, 0 0 60px #22d3ee0f'
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#26313d29 1px, transparent 1px), linear-gradient(90deg, #26313d29 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(circle, #000, transparent 70%)',
          maskImage: 'radial-gradient(circle, #000, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 68,
          height: 68,
          background: 'var(--cyan-soft)',
          border: '1px solid #22d3ee59',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--cyan)',
          marginBottom: 24,
          boxShadow: '0 0 30px rgba(34,211,238,0.2)',
          animation: '3.5s infinite lpPulse',
        }}
      >
        <Shield size={32} />
      </div>

      {/* Kicker */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'var(--cyan)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        COMMENCE ASSESSMENT
      </div>

      {/* Heading */}
      <h2
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(38px, 3.4vw, 50px)',
          fontWeight: 750,
          letterSpacing: '-0.04em',
          color: '#f7fafc',
          margin: '0 0 16px',
          lineHeight: 1.12,
        }}
      >
        Ready to Secure Your APIs?
      </h2>

      {/* Copy */}
      <p
        style={{
          position: 'relative',
          zIndex: 2,
          color: '#9cb0bf',
          maxWidth: 620,
          margin: '0 auto 30px',
          fontSize: 17,
          lineHeight: 1.68,
        }}
      >
        Register your target host, configure identity credentials, and run your
        first comprehensive vulnerability scan in minutes.
      </p>

      {/* Buttons */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        className="cta-buttons"
      >
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <PrimaryButton>
            Start Free Scan <ArrowRight size={15} />
          </PrimaryButton>
        </Link>
        <Link to="/app/dashboard" style={{ textDecoration: 'none' }}>
          <SecondaryButton>
            Access Console <ArrowRight size={15} />
          </SecondaryButton>
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cta-buttons a, .cta-buttons button {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
