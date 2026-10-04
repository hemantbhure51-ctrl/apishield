import { useState } from 'react'
import { Plug, Search, BarChart2, CheckCircle, ArrowRight } from 'lucide-react'
import { workflows } from '../data/landingData'

const iconMap = {
  plug: Plug,
  search: Search,
  'bar-chart-2': BarChart2,
  'check-circle': CheckCircle,
}

export default function Workflow() {
  return (
    <section
      id="workflow"
      style={{
        maxWidth: 1348,
        margin: '0 auto',
        padding: '120px 0',
      }}
      className="workflow-container"
    >
      {/* Centered heading */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
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
          How It Works
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
          Get Secure in{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #22d3ee 20%, #4ade80 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Four Simple Steps
          </span>
        </h2>
        <p style={{ color: '#9cb0bf', fontSize: 16, lineHeight: 1.7 }}>
          From zero to fully secured APIs in minutes — no complex setup, no
          agents to deploy.
        </p>
      </div>

      {/* Workflow grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          position: 'relative',
        }}
        className="workflow-cards"
      >
        {workflows.map((step, i) => {
          const Icon = iconMap[step.icon] || CheckCircle
          return <WorkflowCard key={step.title} step={step} Icon={Icon} index={i} />
        })}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .workflow-container { max-width: calc(100% - 72px) !important; padding: 80px 0 !important; }
          .workflow-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .workflow-container { max-width: calc(100% - 40px) !important; }
          .workflow-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function WorkflowCard({ step, Icon, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(160deg, #15222d 0%, #0f1620 100%)'
          : 'linear-gradient(160deg, #121921 0%, #0d1319 100%)',
        border: `1px solid ${hovered ? '#385567' : '#23313d'}`,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 290,
        padding: '24px 24px 28px',
        position: 'relative',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 50px #0006, 0 0 24px #22d3ee14' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        {/* Step number */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: hovered ? 'var(--cyan)' : '#0f161e',
            border: `1px solid ${hovered ? 'var(--cyan)' : '#334351'}`,
            display: 'grid',
            placeItems: 'center',
            font: '700 14px JetBrains Mono, monospace',
            color: hovered ? '#071014' : '#9cb0bf',
            boxShadow: hovered ? '0 0 20px #22d3ee66' : 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
            position: 'relative',
          }}
        >
          {step.step}
        </div>

        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            background: 'var(--cyan-soft)',
            border: `1px solid ${hovered ? 'var(--cyan)' : '#22d3ee33'}`,
            borderRadius: 12,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--cyan)',
            transform: hovered ? 'scale(1.1) rotate(4deg)' : 'scale(1) rotate(0deg)',
            boxShadow: hovered ? '0 0 16px #22d3ee33' : 'none',
            transition: 'all 0.3s',
          }}
        >
          <Icon size={20} />
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          color: '#f1f7fa',
          fontSize: 19,
          fontWeight: 700,
          margin: '0 0 12px',
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#93a4b3',
          fontSize: 14,
          lineHeight: 1.65,
          flex: 1,
          minHeight: 60,
          margin: 0,
        }}
      >
        {step.description}
      </p>

      {/* Tag */}
      <span
        style={{
          display: 'inline-block',
          color: '#687988',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        {step.tag}
      </span>
    </article>
  )
}
