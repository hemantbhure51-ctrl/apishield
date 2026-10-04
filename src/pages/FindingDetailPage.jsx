import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronsUpDown,
  Shield,
  CircleDot,
  Check,
  ChevronRight,
  ShieldAlert
} from 'lucide-react'
import {
  Button,
  Badge,
  Panel,
  CodePanel
} from '../components/ui/AppUI'

export default function FindingDetailPage() {
  const { findingId = 'FND-284' } = useParams()
  const [status, setStatus] = useState('Open')
  const [activeTab, setActiveTab] = useState('Request / Response')
  const [savedMessage, setSavedMessage] = useState(false)

  const handleUpdate = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2500)
  }

  return (
    <>
      <div className="detail-back">
        <Link to="/app/findings">
          <ChevronsUpDown size={15} /> All findings
        </Link>
        <span>{findingId} · Detected in SCN-1042</span>
      </div>

      <div className="finding-hero">
        <div>
          <Badge tone="critical">CRITICAL</Badge>
          <div className="finding-title">
            Broken Object Level Authorization
          </div>
          <p>
            An authenticated customer can retrieve order records belonging to
            another customer by modifying the object identifier.
          </p>
          <div className="finding-tags">
            <Badge tone="neutral">API1:2023</Badge>
            <code>
              <b>GET</b> /api/v1/orders/{'{id}'}
            </code>
            <Badge tone="warning">PRODUCTION</Badge>
          </div>
        </div>

        <div className="risk-score">
          <span>RISK SCORE</span>
          <strong>9.4</strong>
          <small>CRITICAL</small>
        </div>

        <div className="confidence-score">
          <span>CONFIDENCE</span>
          <strong>96%</strong>
          <small>High confidence</small>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <Panel>
            <div className="detail-section">
              <div className="section-label">WHAT HAPPENED</div>
              <p>
                The scanner compared responses for the same order resource using
                two customer identities. Customer B received a successful
                response containing Customer A's order after changing only the
                order ID.
              </p>
            </div>

            <div className="detail-two">
              <div className="detail-section">
                <div className="section-label">EXPECTED BEHAVIOR</div>
                <p>
                  The API should return <code>403 Forbidden</code> or{' '}
                  <code>404 Not Found</code> when the authenticated principal does
                  not own the requested order.
                </p>
              </div>

              <div className="detail-section observed">
                <div className="section-label">OBSERVED BEHAVIOR</div>
                <p>
                  The API returned <code>200 OK</code> and exposed the order
                  resource to an unauthorized identity.
                </p>
              </div>
            </div>
          </Panel>

          <Panel
            title="Evidence"
            subtitle="Sensitive values are automatically redacted"
            action={
              <Badge tone="success">
                <Shield size={12} /> REDACTED
              </Badge>
            }
          >
            <div className="evidence-tabs">
              {['Request / Response', 'Comparison', 'Metadata'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="evidence-grid">
              <CodePanel
                type="REQUEST"
                title="Customer B → Order 4821"
                content={[
                  'GET /api/v1/orders/4821 HTTP/1.1',
                  'Host: api.acme.com',
                  'Authorization: Bearer ••••••••••91D2',
                  'Accept: application/json',
                  'X-Scan-ID: SCN-1042'
                ]}
              />

              <CodePanel
                type="RESPONSE"
                title="HTTP 200 OK · 184 ms"
                content={[
                  'HTTP/1.1 200 OK',
                  'Content-Type: application/json',
                  '',
                  '{',
                  '  "id": 4821,',
                  '  "customer": "[REDACTED]",',
                  '  "amount": "[REDACTED]"',
                  '}'
                ]}
              />
            </div>
          </Panel>

          <Panel>
            <div className="detail-section">
              <div className="section-label">RECOMMENDED FIX</div>
              <p>
                Enforce object-level authorization on every endpoint that receives
                an object identifier. Resolve the requested resource through the
                authenticated principal's permitted scope rather than querying it
                globally.
              </p>
              <div className="fix-list">
                <span>
                  <CircleDot size={15} /> Validate resource ownership
                  server-side
                </span>
                <span>
                  <CircleDot size={15} /> Deny by default when no explicit policy
                  matches
                </span>
                <span>
                  <CircleDot size={15} /> Add cross-tenant authorization
                  regression tests
                </span>
              </div>
            </div>
          </Panel>
        </div>

        <aside className="detail-aside">
          <Panel title="Finding status">
            <label className="field">
              <span>REMEDIATION STATE</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Open</option>
                <option>In progress</option>
                <option>Fixed</option>
                <option>Accepted risk</option>
              </select>
            </label>

            <div className="aside-row">
              <span>Assignee</span>
              <strong>
                <i className="mini-avatar">JD</i> Jordan Davis
              </strong>
            </div>

            <div className="aside-row">
              <span>Project</span>
              <strong>Acme Commerce</strong>
            </div>

            <div className="aside-row">
              <span>First detected</span>
              <strong>02 Oct 2026</strong>
            </div>

            <Button className="full-button" onClick={handleUpdate}>
              {savedMessage ? 'State Saved ✓' : 'Update finding'}
            </Button>
          </Panel>

          <Panel title="Lifecycle">
            <div className="vertical-lifecycle">
              {[
                'Detected',
                'Confirmed',
                'Open',
                'In progress',
                'Fixed',
                'Verified'
              ].map((step, idx) => (
                <div
                  key={step}
                  className={`${idx < 3 ? 'done' : ''} ${
                    idx === 2 ? 'current' : ''
                  }`}
                >
                  <i>{idx < 3 ? <Check size={11} /> : null}</i>
                  <span>{step}</span>
                  {idx < 3 && (
                    <small>
                      {idx === 0
                        ? '02 Oct, 10:42'
                        : idx === 1
                        ? '02 Oct, 10:48'
                        : 'Current state'}
                    </small>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </>
  )
}
