import { useRef, useEffect, useState } from 'react'
import {
  ScanLine,
  ShieldAlert,
  Activity,
  FileText,
  CheckCircle2,
} from 'lucide-react'
import { capabilities } from '../data/landingData'

const iconMap = {
  'scan-line': ScanLine,
  'shield-alert': ShieldAlert,
  activity: Activity,
  'file-text': FileText,
}

export default function Capabilities() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="capabilities"
      ref={ref}
      style={{
        maxWidth: 1348,
        margin: '0 auto',
        padding: '120px 0',
        position: 'relative',
      }}
      className="section-container"
    >
      {/* Section heading */}
      <div style={{ maxWidth: 720, marginBottom: 56 }}>
        <span
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
          <ScanLine size={13} />
          Capabilities
        </span>
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
          Everything Your APIs Need{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            to Stay Secure
          </span>
        </h2>
        <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7 }}>
          From initial discovery to continuous monitoring, APISec covers the full
          security lifecycle of every API in your stack.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
        className="capability-cards"
      >
        {capabilities.map((cap, i) => {
          const Icon = iconMap[cap.icon] || Activity
          return (
            <CapabilityCard
              key={cap.title}
              cap={cap}
              Icon={Icon}
              delay={i * 0.1}
              visible={visible}
            />
          )
        })}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .capability-cards { grid-template-columns: 1fr 1fr !important; }
          .section-container { padding: 80px 0 !important; max-width: calc(100% - 72px) !important; }
        }
        @media (max-width: 768px) {
          .capability-cards { grid-template-columns: 1fr !important; }
          .section-container { max-width: calc(100% - 40px) !important; padding: 80px 0 !important; }
        }
      `}</style>
    </section>
  )
}

function CapabilityCard({ cap, Icon, delay, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(160deg, #15202c 0%, #0f1620 100%)'
          : 'linear-gradient(160deg, #121922 0%, #0c1218 100%)',
        border: `1px solid ${hovered ? '#385566' : '#23313d'}`,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 310,
        padding: '28px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 55px #0006, 0 0 30px #22d3ee14' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        animation: visible ? `lpEnter 0.5s ease-out ${delay}s both` : 'none',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Number */}
      <span
        style={{
          position: 'absolute',
          top: 24,
          right: 22,
          color: hovered ? 'var(--cyan)' : '#4b5a67',
          font: '600 12px JetBrains Mono, monospace',
          transition: 'color 0.25s',
        }}
      >
        {cap.number}
      </span>

      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          background: hovered ? '#173844' : 'var(--cyan-soft)',
          border: `1px solid ${hovered ? 'var(--cyan)' : '#22d3ee33'}`,
          borderRadius: 12,
          display: 'grid',
          placeItems: 'center',
          color: hovered ? '#fff' : 'var(--cyan)',
          boxShadow: hovered ? '0 0 24px #22d3ee40' : '0 0 16px #22d3ee14',
          transform: hovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3
        style={{
          color: '#f1f6f9',
          fontSize: 18,
          fontWeight: 700,
          margin: '22px 0 12px',
        }}
      >
        {cap.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#92a4b2',
          fontSize: 14,
          lineHeight: 1.65,
          flex: 1,
          minHeight: 72,
          margin: 0,
        }}
      >
        {cap.description}
      </p>

      {/* Footer */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 16,
          paddingTop: 18,
          borderTop: '1px solid #26313d99',
          color: '#7d909f',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        <CheckCircle2 size={13} color="var(--green)" />
        {cap.footer}
      </footer>
    </article>
  )
}
