import { useState } from 'react'
import { ShieldAlert, CheckCircle2, Terminal, Code2, Lightbulb } from 'lucide-react'
import { evidenceItems } from '../data/landingData'

const tabOptions = ['Request', 'Response', 'Remediation']

export default function LiveEvidence() {
  const [activeCard, setActiveCard] = useState(0)
  const [activeTab, setActiveTab] = useState('Request')
  const active = evidenceItems[activeCard]

  return (
    <section
      id="evidence"
      style={{
        background: `radial-gradient(at 80% 20%, #22d3ee0a, transparent 60%),
          radial-gradient(at 20% 80%, #f0525209, transparent 60%),
          #0a0f16`,
        borderTop: '1px solid #1f2d3a',
        borderBottom: '1px solid #1f2d3a',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1348,
          margin: '0 auto',
          padding: '110px 0',
        }}
        className="evidence-inner"
      >
        {/* Heading */}
        <div style={{ marginBottom: 8 }}>
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
            <Terminal size={13} />
            Live Evidence
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
            Real Vulnerabilities,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Real Proof
            </span>
          </h2>
          <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7, maxWidth: 600 }}>
            APISec doesn't just flag issues — it provides full proof-of-concept
            evidence showing exactly how each vulnerability can be exploited.
          </p>
        </div>

        {/* Evidence container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: 24,
            marginTop: 40,
          }}
          className="evidence-layout"
        >
          {/* Left: evidence list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {evidenceItems.map((item, i) => (
              <EvidenceCard
                key={item.id}
                item={item}
                isActive={activeCard === i}
                onClick={() => { setActiveCard(i); setActiveTab('Request') }}
              />
            ))}
          </div>

          {/* Right: viewer */}
          <div
            style={{
              background: '#0d141c',
              border: '1px solid #283a48',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 50px #00000073',
            }}
          >
            {/* Viewer header */}
            <div
              style={{
                background: '#090e14',
                borderBottom: '1px solid #202e3b',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 22px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#f0f6fa',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <ShieldAlert
                    size={14}
                    color={active.severity === 'critical' ? 'var(--red)' : 'var(--amber)'}
                  />
                  {active.title}
                </span>
                <code
                  style={{
                    color: 'var(--cyan)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {active.endpoint}
                </code>
              </div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 6 }}>
                {tabOptions.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? '#22d3ee1a' : 'transparent',
                      border: `1px solid ${activeTab === tab ? '#22d3ee4d' : 'transparent'}`,
                      borderRadius: 6,
                      color: activeTab === tab ? 'var(--cyan)' : '#8496a5',
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Viewer body */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 18,
                padding: 24,
                overflowX: 'auto',
              }}
            >
              {activeTab === 'Request' && (
                <div
                  style={{
                    background: '#080c11',
                    border: '1px solid #1c2733',
                    borderRadius: 10,
                    padding: 18,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    color: '#cbd7e2',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {active.curlExample.split('\n').map((line, i) => (
                    <div key={i}>
                      <span
                        style={{
                          color: line.startsWith('curl') ? '#38bdf8' : 
                            line.includes('-H') ? '#94a3b8' : 
                            line.includes('Bearer') ? '#f472b6' : '#cbd7e2',
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Response' && (
                <div
                  style={{
                    background: '#080c11',
                    border: '1px solid #1c2733',
                    borderRadius: 10,
                    padding: 18,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    color: '#cbd7e2',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": 4421,\n  "email": "victim@example.com",\n  "ssn": '}
                  <span
                    style={{
                      color: '#fbbf24',
                      background: '#f59e0b1f',
                      borderRadius: 4,
                      padding: '2px 6px',
                      fontWeight: 600,
                    }}
                  >
                    "[REDACTED]"
                  </span>
                  {',\n  "role": "admin",\n  "internal_flags": {...}\n}'}
                </div>
              )}

              {activeTab === 'Remediation' && (
                <div
                  style={{
                    background: '#10b98114',
                    border: '1px solid #10b98140',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 20px',
                  }}
                >
                  <Lightbulb size={20} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong
                      style={{
                        display: 'block',
                        color: '#e2fdf5',
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      Remediation Guidance
                    </strong>
                    <p style={{ color: '#9ecbc0', margin: 0, fontSize: 13, lineHeight: 1.55 }}>
                      {active.remediation}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div
                style={{
                  background: '#0f1620',
                  border: '1px solid #1c2733',
                  borderRadius: 10,
                  padding: '14px 18px',
                  color: '#9cb0bf',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: '#dce7ee', display: 'block', marginBottom: 6, fontSize: 13 }}>
                  Description
                </strong>
                {active.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .evidence-inner { max-width: calc(100% - 72px) !important; padding: 80px 0 !important; }
          .evidence-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .evidence-inner { max-width: calc(100% - 40px) !important; }
        }
      `}</style>
    </section>
  )
}

function EvidenceCard({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        cursor: 'pointer',
        background: isActive
          ? 'linear-gradient(135deg, #162432, #101923)'
          : '#0f1620',
        border: `1px solid ${isActive ? 'var(--cyan)' : '#23313f'}`,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '16px 20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isActive ? '0 10px 30px #0006, 0 0 20px #22d3ee1f' : 'none',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#141e2a'
          e.currentTarget.style.borderColor = '#3b5062'
          e.currentTarget.style.transform = 'translateX(4px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#0f1620'
          e.currentTarget.style.borderColor = '#23313f'
          e.currentTarget.style.transform = 'translateX(0)'
        }
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 3,
            background: 'var(--cyan)',
            boxShadow: '0 0 10px var(--cyan)',
          }}
        />
      )}

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: 4,
            padding: '3px 8px',
            color: item.severity === 'critical' ? '#f87171' : '#fbbf24',
            background: item.severity === 'critical' ? '#f052521f' : '#f59e0b1f',
            border: `1px solid ${item.severity === 'critical' ? '#f0525240' : '#f59e0b40'}`,
          }}
        >
          {item.severity}
        </span>
        <span style={{ color: '#7b8e9d', fontSize: 11, fontWeight: 600 }}>{item.category}</span>
      </div>

      {/* Title */}
      <h4 style={{ color: '#f0f6fa', margin: 0, fontSize: 15, fontWeight: 700 }}>
        {item.title}
      </h4>

      {/* Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: '#8c9da9',
          fontSize: 12,
        }}
      >
        <code
          style={{
            color: 'var(--cyan)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
          }}
        >
          {item.endpoint}
        </code>
      </div>
    </button>
  )
}
