import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { risks } from '../data/landingData'

const toneColors = [
  { bg: 'var(--cyan)', shadow: '#22d3ee80' },
  { bg: 'var(--green)', shadow: '#10b98180' },
  { bg: 'var(--amber)', shadow: '#f59e0b80' },
  { bg: '#60a5fa', shadow: '#60a5fa80' },
]

export default function RiskSection() {
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
      id="risks"
      ref={ref}
      style={{
        background: `radial-gradient(circle at 50% 30%, #22d3ee09, transparent 70%), #0b1016`,
        borderTop: '1px solid #1f2b36',
        borderBottom: '1px solid #1f2b36',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1348,
          margin: '0 auto',
          padding: '110px 0',
        }}
        className="risk-inner"
      >
        {/* Heading grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            alignItems: 'end',
            gap: 80,
            marginBottom: 48,
          }}
          className="risk-heading-grid"
        >
          <div>
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
              Coverage
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
              Every OWASP API Risk,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Tested & Covered
              </span>
            </h2>
          </div>
          <div>
            <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7, margin: '0 0 10px' }}>
              APISec maps every vulnerability category to the OWASP API Security Top 10, giving
              you full traceability from finding to compliance requirement.
            </p>
          </div>
        </div>

        {/* Risk cloud */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {risks.map((risk, i) => (
            <RiskTag key={risk} risk={risk} tone={toneColors[i % toneColors.length]} visible={visible} delay={i * 0.06} />
          ))}
        </div>

        {/* Mantra */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 54,
            color: '#8c9ba7',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          <i style={{ width: 50, height: 1, background: '#2b3944', display: 'block' }} />
          Detect · Prioritize · Remediate · Verify
          <i style={{ width: 50, height: 1, background: '#2b3944', display: 'block' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .risk-inner { max-width: calc(100% - 72px) !important; padding: 80px 0 !important; }
          .risk-heading-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (max-width: 768px) {
          .risk-inner { max-width: calc(100% - 40px) !important; }
        }
      `}</style>
    </section>
  )
}

function RiskTag({ risk, tone, visible, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 50,
        padding: '0 18px',
        background: hovered ? '#16222f' : '#111822',
        border: `1px solid ${hovered ? '#3f5567' : '#23313e'}`,
        borderRadius: 10,
        color: hovered ? '#fff' : '#b2c0cc',
        fontSize: 14,
        fontWeight: 550,
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 10px 24px #00000059, 0 0 18px #22d3ee1a` : 'none',
        opacity: visible ? 1 : 0,
        animation: visible ? `lpEnter 0.5s ease-out ${delay}s both` : 'none',
      }}
    >
      <i
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: tone.bg,
          boxShadow: `0 0 10px ${tone.shadow}`,
          flexShrink: 0,
          transform: hovered ? 'scale(1.3)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}
      />
      {risk}
      <ArrowRight
        size={14}
        style={{
          color: hovered ? 'var(--cyan)' : '#5c6c7b',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 0.2s',
        }}
      />
    </span>
  )
}
