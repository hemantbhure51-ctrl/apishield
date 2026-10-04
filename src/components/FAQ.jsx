import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/landingData'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      style={{
        maxWidth: 980,
        margin: '0 auto',
        padding: '100px 0 120px',
      }}
      className="faq-section"
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
          FAQ
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
          Questions &{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Answers
          </span>
        </h2>
        <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
          Everything you need to know about APISec and how it works.
        </p>
      </div>

      {/* Accordion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              style={{
                background: isOpen
                  ? '#131b26'
                  : 'linear-gradient(160deg, #111720 0%, #0d1319 100%)',
                border: `1px solid ${isOpen ? '#22d3ee66' : '#23313d'}`,
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.25s',
                boxShadow: isOpen ? '0 14px 35px #0006, 0 0 20px #22d3ee0f' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.borderColor = '#385062'
                  e.currentTarget.style.boxShadow = '0 10px 25px #0000004d'
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.borderColor = '#23313d'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '22px 26px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: isOpen ? 'var(--cyan)' : '#edf4f8',
                  fontSize: 17,
                  fontWeight: 700,
                  transition: 'color 0.2s',
                }}
              >
                {faq.q}
                <ChevronDown
                  size={20}
                  style={{
                    flexShrink: 0,
                    color: isOpen ? 'var(--cyan)' : '#728493',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s',
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <p
                  style={{
                    color: '#9cb0bf',
                    padding: '0 26px 24px',
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .faq-section { padding: 80px 0 100px !important; max-width: calc(100% - 72px) !important; }
        }
        @media (max-width: 768px) {
          .faq-section { max-width: calc(100% - 40px) !important; }
        }
      `}</style>
    </section>
  )
}
