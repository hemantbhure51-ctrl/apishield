import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Pause,
  Play,
  Globe,
  Shield,
  Clock,
  Check,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel
} from '../components/ui/AppUI'
import { scanLifecyclePhases, findingsData } from '../data/appData'

export default function ScanDetailPage() {
  const { scanId = 'SCN-1042' } = useParams()
  const [isPaused, setIsPaused] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="BACKGROUND SECURITY JOB"
        title="Security scan"
        description={`${scanId} · Acme Production API`}
        action={
          <>
            <Badge tone="warning">PROTOTYPE DATA</Badge>
            <Button
              variant="secondary"
              icon={isPaused ? Play : Pause}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume scan' : 'Pause scan'}
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowCancelModal(true)}
              disabled={isCancelled}
            >
              {isCancelled ? 'Cancelled' : 'Cancel'}
            </Button>
          </>
        }
      />

      <div className="monitor-status">
        <div className="scan-status-copy">
          <Badge tone={isCancelled ? 'neutral' : isPaused ? 'warning' : 'cyan'} dot>
            {isCancelled ? 'CANCELLED' : isPaused ? 'PAUSED' : 'SCANNING'}
          </Badge>
          <div className="monitor-title">
            {isCancelled
              ? 'Scan cancelled by Jordan Davis'
              : 'Authorization testing'}
          </div>
          <p>
            Comparing observed access across 3 authenticated identities against
            20 expected authorization rules.
          </p>
          <div className="monitor-meta">
            <span>
              <Globe size={14} /> api.acme.com
            </span>
            <span>
              <Shield size={14} /> Safe mode
            </span>
            <span>
              <Clock size={14} /> 00:18:42 elapsed
            </span>
          </div>
        </div>

        <div className="large-progress">
          <svg viewBox="0 0 160 160">
            <circle className="ring-bg" cx="80" cy="80" r="67" />
            <circle
              className="ring-progress"
              cx="80"
              cy="80"
              r="67"
              pathLength="100"
              strokeDasharray={`${isCancelled ? 72 : 72} 100`}
            />
          </svg>
          <div>
            <strong>72%</strong>
            <span>{isCancelled ? 'HALTED' : isPaused ? 'PAUSED' : 'IN PROGRESS'}</span>
          </div>
        </div>
      </div>

      <Panel
        className="lifecycle-panel"
        title="Scan lifecycle"
        subtitle="Executed by an isolated security worker"
      >
        <div className="lifecycle">
          {scanLifecyclePhases.map((phase, idx) => (
            <div
              key={phase}
              className={`${idx < 7 ? 'complete' : ''} ${
                idx === 7 ? 'active' : ''
              }`}
            >
              <span>
                {idx < 7 ? (
                  <Check size={12} />
                ) : idx === 7 ? (
                  <ArrowRight size={12} />
                ) : null}
              </span>
              <small>{phase}</small>
            </div>
          ))}
        </div>
      </Panel>

      <div className="monitor-metrics">
        {[
          ['Endpoints tested', '48', '/ 67', Globe],
          ['Requests', '840', '/ 1,200', ArrowRight],
          ['Findings', '6', 'open', ShieldCheck],
          ['Critical', '2', 'requires action', AlertTriangle],
          ['High', '4', 'requires review', Shield]
        ].map(([title, val, sub, Icon]) => (
          <Panel key={title}>
            <div
              className={`metric-mini-icon ${
                title === 'Critical' ? 'critical' : ''
              }`}
            >
              <Icon size={17} />
            </div>
            <span>{title}</span>
            <strong>
              {val} <small>{sub}</small>
            </strong>
          </Panel>
        ))}
      </div>

      <div className="monitor-grid">
        <Panel
          className="terminal-panel"
          title="Live activity"
          subtitle="Worker events · redacted"
          action={<Badge tone="success" dot>LIVE</Badge>}
        >
          <div className="terminal-head">
            <span>EVENT STREAM</span>
            <span>worker-sec-07</span>
          </div>

          <div className="activity-stream">
            {[
              ['10:42:01', 'Discovery completed', 'success'],
              ['10:42:03', 'Testing GET /api/v1/users/{id}', ''],
              ['10:42:04', 'Authorization comparison started', ''],
              ['10:42:05', 'Potential BOLA detected', 'danger'],
              [
                '10:42:07',
                'Evidence captured and sensitive fields redacted',
                'warning'
              ],
              [
                '10:42:08',
                'Finding confidence calculated · 96%',
                'cyan'
              ]
            ].map(([time, desc, tone], idx) => (
              <div
                key={time + desc}
                className={`activity-line ${tone}`}
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <span>{time}</span>
                <i />
                <code>{desc}</code>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Live findings"
          subtitle="Detected during this assessment"
          action={
            <Link to="/app/findings" className="panel-link">
              View all
            </Link>
          }
        >
          <div className="live-findings">
            {findingsData.slice(0, 3).map(([tone, title, , endpoint, conf]) => (
              <Link to="/app/findings/FND-284" key={title}>
                <Badge tone={tone}>{tone.toUpperCase()}</Badge>
                <div>
                  <strong>{title}</strong>
                  <code>{endpoint}</code>
                </div>
                <span>
                  {conf} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal-backdrop">
          <div className="modal confirm-modal">
            <div className="danger-icon">
              <AlertTriangle size={22} />
            </div>
            <div className="modal-title">Cancel this scan?</div>
            <p>
              Current progress and collected evidence will be preserved. The
              worker will stop after its current request completes.
            </p>
            <div className="modal-footer">
              <Button
                variant="ghost"
                onClick={() => setShowCancelModal(false)}
              >
                Continue scan
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setShowCancelModal(false)
                  setIsCancelled(true)
                }}
              >
                Cancel scan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
