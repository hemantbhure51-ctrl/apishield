import React from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Globe,
  Radio,
  ArrowRight,
  MoreHorizontal,
  Terminal,
  Zap
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  PostureRing,
  StatCard
} from '../components/ui/AppUI'
import { metricsData, findingsData, scansData } from '../data/appData'

export default function DashboardOverview() {
  return (
    <>
      <PageHeader
        eyebrow="WORKSPACE / ACME LABS"
        title="Security overview"
        description="Monitor the security posture of your APIs and applications."
        action={
          <>
            <Button variant="secondary" icon={Globe}>
              Export
            </Button>
            <Link to="/app/scans/new" className="button button-primary">
              <Plus size={15} /> New scan
            </Link>
          </>
        }
      />

      <div className="demo-notice">
        <Terminal size={15} />
        <span>Prototype workspace</span> Data shown is representative and does not indicate a real security assessment.
        <Zap size={14} />
      </div>

      <div className="stats-grid">
        {metricsData.map((item, index) => (
          <StatCard item={item} index={index} key={item.label} />
        ))}
      </div>

      <div className="dashboard-grid">
        <Panel
          title="Security posture"
          subtitle="Weighted by severity, confidence and affected endpoints"
          action={<Badge tone="success">+6 since last scan</Badge>}
        >
          <div className="posture-content">
            <PostureRing value={87} />
            <div className="posture-breakdown">
              {[
                ['Critical', '4', 'critical'],
                ['High', '17', 'high'],
                ['Medium', '31', 'medium'],
                ['Low', '18', 'low']
              ].map(([label, count, tone]) => (
                <div key={label}>
                  <span>
                    <i className={`severity-dot ${tone}`} />
                    {label}
                  </span>
                  <strong>{count}</strong>
                </div>
              ))}
              <p>
                Security posture improved after 8 findings were resolved in the latest assessment.
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Security trend"
          subtitle="Open vs. resolved findings · 30 days"
          action={
            <button className="icon-button" aria-label="More options">
              <MoreHorizontal size={17} />
            </button>
          }
        >
          <div className="line-chart">
            <div className="chart-y">
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            <svg viewBox="0 0 540 190" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#22d3ee" stopOpacity=".2" />
                  <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="area-path"
                d="M0 40 C70 48,90 79,145 76 S235 108,290 92 S375 135,420 115 S490 143,540 128 L540 190 L0 190Z"
                fill="url(#trendArea)"
              />
              <path
                className="chart-line primary"
                d="M0 40 C70 48,90 79,145 76 S235 108,290 92 S375 135,420 115 S490 143,540 128"
                pathLength="1"
              />
              <path
                className="chart-line secondary"
                d="M0 170 C80 158,95 150,150 154 S220 132,285 139 S360 104,420 111 S495 74,540 82"
                pathLength="1"
              />
            </svg>
            <div className="chart-legend">
              <span>
                <i className="cyan" /> Open findings
              </span>
              <span>
                <i className="green" /> Resolved
              </span>
            </div>
          </div>
        </Panel>
      </div>

      <div className="dashboard-grid lower">
        <Panel
          title="Vulnerability categories"
          subtitle="Open findings by OWASP API risk"
        >
          <div className="bar-list">
            {[
              ['BOLA', 84, 12],
              ['Authentication', 65, 9],
              ['Security misconfiguration', 48, 7],
              ['BFLA', 38, 5],
              ['Rate limiting', 27, 4]
            ].map(([cat, width, count]) => (
              <div className="bar-item" key={cat}>
                <span>{cat}</span>
                <div>
                  <i style={{ width: `${width}%` }} />
                </div>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Recent findings"
          subtitle="Prioritized by severity and confidence"
          action={
            <Link to="/app/findings" className="panel-link">
              View all <ArrowRight size={14} />
            </Link>
          }
        >
          <div className="finding-feed">
            {findingsData.slice(0, 3).map(([tone, title, owasp, endpoint, conf]) => (
              <Link
                to="/app/findings/FND-284"
                className="finding-row"
                key={title}
              >
                <span className={`severity-stripe ${tone}`} />
                <Badge tone={tone}>{tone.toUpperCase()}</Badge>
                <div>
                  <strong>{title}</strong>
                  <span>
                    <code>{endpoint}</code> · {owasp}
                  </span>
                </div>
                <span className="confidence">
                  {conf} <small>confidence</small>
                </span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        className="full-panel"
        title="Recent scans"
        subtitle="Latest background security assessment jobs"
        action={
          <Link to="/app/scans" className="panel-link">
            Scan history <ArrowRight size={14} />
          </Link>
        }
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Scan ID</th>
                <th>Target</th>
                <th>Environment</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Findings</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scansData.map((row) => (
                <tr key={row[0]}>
                  <td>
                    <Link className="mono-link" to={`/app/scans/${row[0]}`}>
                      {row[0]}
                    </Link>
                  </td>
                  <td>
                    <div className="table-primary">{row[1]}</div>
                  </td>
                  <td>
                    <Badge tone={row[2] === 'Production' ? 'warning' : 'neutral'}>
                      {row[2]}
                    </Badge>
                  </td>
                  <td>
                    <span className="muted">{row[3]} mode</span>
                  </td>
                  <td>
                    <Badge
                      dot
                      tone={
                        row[4] === 'Running'
                          ? 'cyan'
                          : row[4] === 'Completed'
                          ? 'success'
                          : 'warning'
                      }
                    >
                      {row[4]}
                    </Badge>
                  </td>
                  <td>
                    <div className="table-progress">
                      <i style={{ width: row[5] }} />
                      <span>{row[5]}</span>
                    </div>
                  </td>
                  <td>
                    <span className="finding-count">{row[6]}</span>
                  </td>
                  <td>
                    <button className="icon-button" aria-label="Details">
                      <MoreHorizontal size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
