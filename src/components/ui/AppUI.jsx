import React from 'react'
import { Search } from 'lucide-react'

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  onClick,
  disabled,
  className = '',
  type = 'button'
}) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={16} strokeWidth={1.8} />}
      <span>{children}</span>
    </button>
  )
}

export function Badge({ children, tone = 'neutral', dot = false }) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <i className="status-dot" />}
      {children}
    </span>
  )
}

export function SearchBox({ placeholder = 'Search', value, onChange }) {
  return (
    <label className="search-box">
      <Search size={15} />
      <input
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <kbd>⌘ K</kbd>
    </label>
  )
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header enter">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <div className="page-title">{title}</div>
        {description && <div className="page-description">{description}</div>}
      </div>
      {action && <div className="page-actions">{action}</div>}
    </div>
  )
}

export function Panel({ children, className = '', title, subtitle, action }) {
  return (
    <section className={`panel ${className}`.trim()}>
      {(title || subtitle || action) && (
        <div className="panel-header">
          <div>
            {title && <div className="panel-title">{title}</div>}
            {subtitle && <div className="panel-subtitle">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function PostureRing({ value = 87 }) {
  return (
    <div className="posture-ring">
      <svg viewBox="0 0 160 160">
        <circle className="ring-bg" cx="80" cy="80" r="67" />
        <circle
          className="ring-progress"
          cx="80"
          cy="80"
          r="67"
          pathLength="100"
          strokeDasharray={`${value} 100`}
        />
      </svg>
      <div>
        <strong>{value}</strong>
        <span>SECURITY</span>
      </div>
    </div>
  )
}

export function StatCard({ item, index }) {
  const Icon = item.icon
  return (
    <Panel className="stat-card enter">
      <div className="stat-top">
        <div className={`stat-icon tone-${item.tone}`}>
          <Icon size={18} />
        </div>
        <span className="trend">{item.trend}</span>
      </div>
      <div className="stat-value">
        {item.value} {item.suffix && <small>{item.suffix}</small>}
      </div>
      <div className="stat-label">{item.label}</div>
    </Panel>
  )
}

export function CodePanel({ type, title, content }) {
  return (
    <div className="code-panel">
      <div className="code-head">
        <div>
          <span>{type}</span>
          <strong>{title}</strong>
        </div>
      </div>
      <pre>
        <code>
          {Array.isArray(content) ? content.join('\n') : content}
        </code>
      </pre>
    </div>
  )
}
