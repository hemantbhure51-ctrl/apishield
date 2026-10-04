import React, { useState } from 'react'
import {
  Globe,
  Plus,
  FileText,
  SlidersHorizontal,
  RefreshCw,
  MoreHorizontal,
  X,
  Upload,
  Check,
  CheckCircle2,
  FileCode
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel,
  SearchBox
} from '../components/ui/AppUI'
import { targetsData } from '../data/appData'

export default function TargetsPage() {
  const [targets, setTargets] = useState(targetsData)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Add target modal state
  const [apiName, setApiName] = useState('Acme Commerce API')
  const [env, setEnv] = useState('Production')
  const [baseUrl, setBaseUrl] = useState('https://api.acme.com')
  const [uploaded, setUploaded] = useState(false)
  const [confirmed, setConfirmed] = useState(true)

  const filtered = targets.filter(
    (t) =>
      t[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
      t[1].toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTarget = () => {
    if (!uploaded || !confirmed) return
    const newTarget = [
      apiName,
      baseUrl,
      env,
      'OpenAPI 3.1',
      '67',
      'Healthy',
      'Just now'
    ]
    setTargets([newTarget, ...targets])
    setShowModal(false)
    setUploaded(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="API INVENTORY"
        title="API targets"
        description="Register and control the APIs authorized for security assessment."
        action={
          <Button icon={Plus} onClick={() => setShowModal(true)}>
            Add API target
          </Button>
        }
      />

      <Panel className="full-panel">
        <div className="table-toolbar">
          <SearchBox
            placeholder="Search targets"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="toolbar-right">
            <Button variant="secondary" icon={SlidersHorizontal}>
              Environment
            </Button>
            <Button variant="ghost" icon={RefreshCw}>
              Sync
            </Button>
          </div>
        </div>

        <div className="target-list">
          {filtered.map(([name, url, environment, spec, endpoints, status, lastScan]) => (
            <div className="target-item" key={name}>
              <div className="target-icon">
                <Globe size={19} />
              </div>

              <div className="target-main">
                <strong>{name}</strong>
                <code>{url}</code>
              </div>

              <div>
                <small>ENVIRONMENT</small>
                <Badge tone={environment === 'Production' ? 'warning' : 'neutral'}>
                  {environment}
                </Badge>
              </div>

              <div>
                <small>SPECIFICATION</small>
                <span>
                  <FileText size={14} /> {spec}
                </span>
              </div>

              <div>
                <small>ENDPOINTS</small>
                <strong>{endpoints}</strong>
              </div>

              <div>
                <small>STATUS</small>
                <Badge
                  dot
                  tone={status === 'Healthy' ? 'success' : 'warning'}
                >
                  {status}
                </Badge>
              </div>

              <div>
                <small>LAST SCAN</small>
                <span>{lastScan}</span>
              </div>

              <button className="icon-button" aria-label="Target actions">
                <MoreHorizontal size={17} />
              </button>
            </div>
          ))}
        </div>
      </Panel>

      {/* Add API Target Modal */}
      {showModal && (
        <div className="modal-backdrop" onMouseDown={() => setShowModal(false)}>
          <div className="modal large" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Add API target</div>
                <div className="modal-subtitle">
                  Register a scoped API for authorized security testing.
                </div>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>API name</span>
                <input
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Environment</span>
                <select
                  value={env}
                  onChange={(e) => setEnv(e.target.value)}
                >
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </label>

              <label className="field full">
                <span>Base URL</span>
                <div className="input-with-icon">
                  <Globe size={15} />
                  <input
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div
              className={`upload-zone ${uploaded ? 'uploaded' : ''}`}
              onClick={() => setUploaded(true)}
              style={{ cursor: 'pointer' }}
            >
              {uploaded ? (
                <>
                  <FileCode size={27} />
                  <strong>openapi-acme.yaml</strong>
                  <span>Validated · OpenAPI 3.1 · 67 endpoints extracted</span>
                </>
              ) : (
                <>
                  <Upload size={27} />
                  <strong>Drop OpenAPI specification here</strong>
                  <span>JSON or YAML · Maximum 10 MB</span>
                  <Button variant="secondary" onClick={(e) => { e.stopPropagation(); setUploaded(true); }}>
                    Choose file
                  </Button>
                </>
              )}
            </div>

            {uploaded && (
              <div className="parse-steps">
                {['Uploaded', 'Parsed', 'Validated', 'Ready'].map((step) => (
                  <span key={step}>
                    <Check size={13} /> {step}
                  </span>
                ))}
              </div>
            )}

            <label className="confirm-check">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                <Check size={13} />
              </span>
              <div>
                <strong>I confirm that I am authorized to test this API.</strong>
                <small>
                  Assessment requests will be restricted to the defined base URL and scope.
                </small>
              </div>
            </label>

            <div className="modal-footer">
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                disabled={!uploaded || !confirmed}
                onClick={handleAddTarget}
              >
                Add API target
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
