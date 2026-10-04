import { useRef, useEffect, useState } from 'react'
import { Shield, Bug, Zap, Lock } from 'lucide-react'
import { metrics } from '../data/landingData'

const iconMap = { shield: Shield, bug: Bug, zap: Zap, lock: Lock }

export default function MetricsStrip() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 1348,
        margin: '10px auto 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'linear-gradient(#0f151c, #0a0f14)',
        border: '1px solid var(--border-soft)',
        borderRadius: 14,
        minHeight: 116,
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 50px #00000047',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
      className="metrics-strip-grid"
    >
      {metrics.map((metric, i) => {
        const Icon = iconMap[metric.icon] || Shield
        return (
          <div
            key={metric.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '26px 32px',
              borderRight: i < metrics.length - 1 ? '1px solid var(--border-soft)' : 'none',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#22d3ee06' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <span
              style={{
                width: 46,
                height: 46,
                background: 'var(--cyan-soft)',
                border: '1px solid #22d3ee33',
                borderRadius: 11,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--cyan)',
                flexShrink: 0,
                transition: 'all 0.25s',
              }}
            >
              <Icon size={20} />
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong
                style={{
                  color: '#fff',
                  fontSize: 26,
                  fontWeight: 750,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {metric.value}
              </strong>
              <small style={{ color: '#8c9ca9', fontSize: 13, fontWeight: 500, marginTop: 4 }}>
                {metric.label}
              </small>
            </div>
          </div>
        )
      })}

      <style>{`
        @media (max-width: 1080px) {
          .metrics-strip-grid {
            grid-template-columns: 1fr 1fr !important;
            max-width: calc(100% - 72px) !important;
          }
        }
        @media (max-width: 768px) {
          .metrics-strip-grid {
            grid-template-columns: 1fr !important;
            max-width: calc(100% - 40px) !important;
          }
        }
      `}</style>
    </div>
  )
}
