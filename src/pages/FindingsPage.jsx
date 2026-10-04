import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  SearchBox
} from '../components/ui/AppUI'
import { findingsData } from '../data/appData'

export default function FindingsPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const displayed = (filter === 'all'
    ? findingsData
    : findingsData.filter((f) => f[0] === filter)
  ).filter(
    (f) =>
      f[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      f[3].toLowerCase().includes(searchTerm.toLowerCase()) ||
      f[2].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <PageHeader
        eyebrow="VULNERABILITY MANAGEMENT"
        title="Security findings"
        description="Investigate, prioritize and remediate API security issues."
        action={
          <Button variant="secondary" icon={Globe}>
            Export findings
          </Button>
        }
      />

      <div className="severity-stats">
        {[
          ['critical', '04', 'Critical'],
          ['high', '17', 'High'],
          ['medium', '31', 'Medium'],
          ['low', '18', 'Low']
        ].map(([sev, count, label]) => (
          <button
            key={sev}
            type="button"
            className={`severity-stat ${filter === sev ? 'active' : ''}`}
            onClick={() => setFilter(filter === sev ? 'all' : sev)}
          >
            <i className={sev} />
            <div>
              <strong>{count}</strong>
              <span>{label}</span>
            </div>
            <small>{sev === 'critical' ? '−2' : `+${count}`}</small>
          </button>
        ))}
      </div>

      <Panel className="full-panel">
        <div className="table-toolbar findings-toolbar">
          <SearchBox
            placeholder="Search findings or endpoints"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="toolbar-right">
            <Button variant="secondary" icon={SlidersHorizontal}>
              Severity
            </Button>
            <Button variant="secondary">Status</Button>
            <Button variant="secondary">OWASP category</Button>
          </div>
        </div>

        <div className="findings-table">
          <div className="findings-head">
            <span>SEVERITY</span>
            <span>FINDING</span>
            <span>OWASP</span>
            <span>ENDPOINT</span>
            <span>CONFIDENCE</span>
            <span>STATUS</span>
            <span />
          </div>

          {displayed.map(([tone, title, owasp, endpoint, conf], idx) => (
            <Link
              to="/app/findings/FND-284"
              className="findings-line"
              key={title}
            >
              <span>
                <Badge tone={tone}>{tone.toUpperCase()}</Badge>
              </span>
              <span>
                <strong>{title}</strong>
                <small>First detected {idx + 1} days ago</small>
              </span>
              <span>{owasp}</span>
              <code>{endpoint}</code>
              <span>
                <strong>{conf}</strong>
                <small>High confidence</small>
              </span>
              <span>
                <Badge tone="neutral">OPEN</Badge>
              </span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </Panel>
    </>
  )
}
