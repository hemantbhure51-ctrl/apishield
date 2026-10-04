import React, { useState } from 'react'
import {
  KeyRound,
  Shield,
  Check,
  X,
  Upload,
  SlidersHorizontal,
  Download,
  AlertTriangle
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  SearchBox
} from '../components/ui/AppUI'
import {
  endpointsList,
  identitiesList,
  defaultMatrix
} from '../data/appData'

export default function AuthorizationPage() {
  const [matrix, setMatrix] = useState(defaultMatrix)
  const [saved, setSaved] = useState(true)
  const [search, setSearch] = useState('')

  const toggleCell = (rowIdx, colIdx) => {
    setMatrix((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => {
          if (r === rowIdx && c === colIdx) {
            return cell === 'allow' ? 'deny' : 'allow'
          }
          return cell
        })
      )
    )
    setSaved(false)
  }

  // Calculate stats
  let totalRules = 0
  let allowedCount = 0
  let deniedCount = 0
  matrix.forEach((row) =>
    row.forEach((cell) => {
      totalRules++
      if (cell === 'allow') allowedCount++
      if (cell === 'deny') deniedCount++
    })
  )

  const filteredEndpoints = endpointsList.map((ep, idx) => ({ ep, idx }))
    .filter(({ ep }) => ep.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageHeader
        eyebrow="ACCESS EXPECTATIONS"
        title="Authorization matrix"
        description="Define expected access boundaries before a controlled security scan."
        action={
          <>
            <Button variant="secondary" icon={Upload}>
              Import rules
            </Button>
            <Button
              icon={Check}
              onClick={() => setSaved(true)}
            >
              {saved ? 'Rules saved' : 'Save rules'}
            </Button>
          </>
        }
      />

      <div className="matrix-summary">
        <div>
          <Shield size={18} />
          <span>
            <strong>{totalRules}</strong> access rules
          </span>
        </div>
        <div>
          <span className="cell-state allow">
            <Check size={13} />
          </span>
          <span>
            <strong>{allowedCount}</strong> Allowed
          </span>
        </div>
        <div>
          <span className="cell-state deny">
            <X size={13} />
          </span>
          <span>
            <strong>{deniedCount}</strong> Denied
          </span>
        </div>
        <div>
          <span className="cell-state undefined">—</span>
          <span>
            <strong>0</strong> Not defined
          </span>
        </div>
        <Badge tone="neutral">Acme Production API</Badge>
      </div>

      <Panel className="matrix-panel">
        <div className="matrix-toolbar">
          <SearchBox
            placeholder="Search endpoints"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="secondary" icon={SlidersHorizontal}>
            All identities
          </Button>
          <Button variant="secondary" icon={Download}>
            Bulk rules
          </Button>
          <span>Click a cell to change expected access</span>
        </div>

        <div className="matrix-scroll">
          <table className="matrix-table">
            <thead>
              <tr>
                <th className="sticky-col">
                  <span>IDENTITY / ENDPOINT</span>
                </th>
                {filteredEndpoints.map(({ ep, idx }) => {
                  const [method, path] = ep.split(' ')
                  return (
                    <th key={ep}>
                      <Badge
                        tone={
                          method === 'DELETE'
                            ? 'critical'
                            : method === 'POST'
                            ? 'success'
                            : 'cyan'
                        }
                      >
                        {method}
                      </Badge>
                      <code>{path}</code>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {identitiesList.map((identity, rowIdx) => (
                <tr key={identity}>
                  <td className="sticky-col">
                    <div className="matrix-identity">
                      <span>{identity.slice(0, 2).toUpperCase()}</span>
                      <div>
                        <strong>{identity}</strong>
                        <small>
                          {rowIdx === 0
                            ? 'No authentication'
                            : rowIdx === 3
                            ? 'Administrator role'
                            : 'Customer role'}
                        </small>
                      </div>
                    </div>
                  </td>
                  {filteredEndpoints.map(({ ep, idx: colIdx }) => {
                    const status = matrix[rowIdx][colIdx]
                    return (
                      <td key={ep}>
                        <button
                          type="button"
                          className={`matrix-cell ${status}`}
                          onClick={() => toggleCell(rowIdx, colIdx)}
                        >
                          {status === 'allow' ? (
                            <>
                              <Check size={16} /> Allowed
                            </>
                          ) : (
                            <>
                              <X size={16} /> Denied
                            </>
                          )}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="matrix-legend">
          <span>LEGEND</span>
          <span>
            <i className="allow">
              <Check size={11} />
            </i>{' '}
            Allowed
          </span>
          <span>
            <i className="deny">
              <X size={11} />
            </i>{' '}
            Denied
          </span>
          <span>
            <i>—</i> Not defined
          </span>
          <span>
            <i className="unexpected">
              <AlertTriangle size={11} />
            </i>{' '}
            Unexpected access
          </span>
        </div>
      </Panel>
    </>
  )
}
