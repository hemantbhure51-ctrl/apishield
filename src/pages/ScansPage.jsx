import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  SlidersHorizontal,
  Clock,
  MoreHorizontal
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  SearchBox
} from '../components/ui/AppUI'
import { scansData } from '../data/appData'

export default function ScansPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = scansData.filter(
    (s) =>
      s[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
      s[1].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <PageHeader
        eyebrow="ASSESSMENT OPERATIONS"
        title="Scan history"
        description="Track controlled assessments and background security jobs."
        action={
          <Link to="/app/scans/new" className="button button-primary">
            <Plus size={15} /> New scan
          </Link>
        }
      />

      <Panel className="full-panel">
        <div className="table-toolbar">
          <SearchBox
            placeholder="Search scan ID or target"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="toolbar-right">
            <Button variant="secondary" icon={SlidersHorizontal}>
              All statuses
            </Button>
            <Button variant="secondary" icon={Clock}>
              Last 30 days
            </Button>
          </div>
        </div>

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
                <th>Started</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
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
                  <td className="muted">{row[7]}</td>
                  <td>
                    <button className="icon-button" aria-label="Scan options">
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
