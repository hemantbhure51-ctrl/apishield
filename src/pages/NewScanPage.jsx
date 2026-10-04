import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  Upload,
  Boxes,
  Globe,
  FileText,
  KeyRound,
  Radio,
  FileCode,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel
} from '../components/ui/AppUI'
import {
  wizardSteps,
  wizardSubtitles,
  projectsData,
  targetsData,
  identitiesData,
  endpointsList,
  identitiesList,
  defaultMatrix
} from '../data/appData'

export default function NewScanPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)
  const [authorized, setAuthorized] = useState(false)

  const handleNext = () => {
    if (currentStep === 9) {
      navigate('/app/scans/SCN-1042')
    } else {
      setCurrentStep((prev) => Math.min(9, prev + 1))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  return (
    <>
      <PageHeader
        eyebrow="CONTROLLED ASSESSMENT"
        title="New security scan"
        description="Configure scope, identities and testing expectations before launch."
        action={<Badge tone="neutral">Draft saved</Badge>}
      />

      <div className="wizard-steps">
        {wizardSteps.map((step, idx) => (
          <button
            key={step}
            type="button"
            onClick={() => idx < currentStep && setCurrentStep(idx)}
            className={`${idx === currentStep ? 'current' : ''} ${
              idx < currentStep ? 'complete' : ''
            }`}
          >
            <span>
              {idx < currentStep ? (
                <Check size={13} />
              ) : (
                String(idx + 1).padStart(2, '0')
              )}
            </span>
            <small>{step}</small>
          </button>
        ))}
      </div>

      <div className="wizard-layout">
        <Panel className="wizard-main">
          <div className="wizard-kicker">
            STEP {String(currentStep + 1).padStart(2, '0')} OF 10
          </div>
          <div className="wizard-title">{wizardSteps[currentStep]}</div>
          <div className="wizard-subtitle">{wizardSubtitles[currentStep]}</div>

          {/* Step Contents */}
          {currentStep === 0 && (
            <div className="selection-list">
              {projectsData.map((p, idx) => (
                <button
                  type="button"
                  key={p[0]}
                  onClick={() => setSelectedOption(idx)}
                  className={`selection-card ${
                    selectedOption === idx ? 'selected' : ''
                  }`}
                >
                  <span className="selection-icon">
                    <Boxes size={19} />
                  </span>
                  <div>
                    <strong>{p[0]}</strong>
                    <small>{p[1]}</small>
                  </div>
                  <Badge tone={p[2] === 'Production' ? 'warning' : 'neutral'}>
                    {p[2]}
                  </Badge>
                  <span className="radio-mark">
                    {selectedOption === idx && <i />}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="selection-list">
              {targetsData.map((t, idx) => (
                <button
                  type="button"
                  key={t[0]}
                  onClick={() => setSelectedOption(idx)}
                  className={`selection-card target-select ${
                    selectedOption === idx ? 'selected' : ''
                  }`}
                >
                  <span className="selection-icon">
                    <Globe size={19} />
                  </span>
                  <div>
                    <strong>{t[0]}</strong>
                    <code>{t[1]}</code>
                  </div>
                  <div>
                    <small>
                      {t[3]} · {t[4]} endpoints
                    </small>
                    <Badge dot tone="success">
                      {t[5]}
                    </Badge>
                  </div>
                  <span className="radio-mark">
                    {selectedOption === idx && <i />}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="spec-review">
              <div className="spec-file">
                <FileText size={24} />
                <div>
                  <strong>openapi-acme-production.yaml</strong>
                  <span>Synced 18 minutes ago · 184 KB</span>
                </div>
                <Badge tone="success">
                  <Check size={12} /> VALID
                </Badge>
              </div>

              <div className="spec-stats">
                <div>
                  <strong>3.1</strong>
                  <span>OpenAPI</span>
                </div>
                <div>
                  <strong>67</strong>
                  <span>Endpoints</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>Tags</span>
                </div>
                <div>
                  <strong>38</strong>
                  <span>Schemas</span>
                </div>
              </div>

              <Button variant="secondary" icon={Upload}>
                Replace specification
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="option-grid">
              {[
                ['Bearer / JWT', KeyRound, 'Authorization header'],
                ['API key', Lock, 'Header or query parameter'],
                ['Basic auth', Radio, 'Username and password'],
                ['Cookie', Zap, 'Session cookie'],
                ['Anonymous', Globe, 'No authentication']
              ].map(([authType, Icon, note], idx) => (
                <button
                  type="button"
                  key={authType}
                  className={`option-card ${
                    selectedOption === idx ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedOption(idx)}
                >
                  <Icon size={20} />
                  <strong>{authType}</strong>
                  <small>{note}</small>
                  <span className="radio-mark">
                    {selectedOption === idx && <i />}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 4 && (
            <div className="selection-list">
              {identitiesData.slice(1).map((id) => (
                <label className="identity-select" key={id[0]}>
                  <input type="checkbox" defaultChecked />
                  <span>
                    <Check size={13} />
                  </span>
                  <div className="identity-avatar tone-cyan">{id[3]}</div>
                  <div>
                    <strong>{id[0]}</strong>
                    <small>
                      {id[1]} · {id[2]}
                    </small>
                  </div>
                  <Badge tone="success">READY</Badge>
                </label>
              ))}
              <div className="inline-alert">
                <Shield size={16} /> Three identities selected. Cross-role
                authorization comparison is enabled.
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="compact-matrix">
              {identitiesList.slice(1).map((identity, rowIdx) => (
                <div key={identity}>
                  <strong>{identity}</strong>
                  {endpointsList.slice(0, 4).map((ep, colIdx) => (
                    <span
                      key={colIdx}
                      className={defaultMatrix[rowIdx + 1][colIdx]}
                    >
                      {defaultMatrix[rowIdx + 1][colIdx] === 'allow' ? (
                        <Check size={14} />
                      ) : (
                        <span style={{ fontSize: 13, fontWeight: 700 }}>✕</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {currentStep === 6 && (
            <div className="profile-grid">
              <button
                type="button"
                onClick={() => setSelectedOption(0)}
                className={`profile-card ${
                  selectedOption === 0 ? 'selected' : ''
                }`}
              >
                <div>
                  <Shield size={22} />
                  <Badge tone="success">RECOMMENDED</Badge>
                </div>
                <strong>Safe mode</strong>
                <p>
                  Conservative testing for production and controlled environments.
                </p>
                <ul>
                  <li>Reduced request volume</li>
                  <li>Non-destructive checks</li>
                  <li>Adaptive rate limiting</li>
                </ul>
                <span>~ 1,200 request budget</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOption(1)}
                className={`profile-card active-mode ${
                  selectedOption === 1 ? 'selected' : ''
                }`}
              >
                <div>
                  <Zap size={22} />
                  <Badge tone="warning">EXPLICIT APPROVAL</Badge>
                </div>
                <strong>Active mode</strong>
                <p>Broader coverage for dedicated test environments only.</p>
                <ul>
                  <li>Higher request volume</li>
                  <li>Extended test coverage</li>
                  <li>Requires authorization</li>
                </ul>
                <span>~ 4,500 request budget</span>
              </button>
            </div>
          )}

          {currentStep === 7 && (
            <div className="scope-card">
              <div className="scope-map">
                <span>AUTHORIZED TARGET</span>
                <strong>https://api.acme.com</strong>
                <code>/api/v1/*</code>
                <div>
                  Excluded: <code>/internal/*</code> <code>/admin/billing/*</code>
                </div>
              </div>

              <div className="scope-metrics">
                <div>
                  <span>Request budget</span>
                  <strong>1,200</strong>
                </div>
                <div>
                  <span>Timeout</span>
                  <strong>30 min</strong>
                </div>
                <div>
                  <span>Rate limit</span>
                  <strong>5 req/s</strong>
                </div>
              </div>

              <label className="confirm-check">
                <input
                  type="checkbox"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                />
                <span>
                  <Check size={13} />
                </span>
                <div>
                  <strong>I own or am authorized to test this target.</strong>
                  <small>
                    This confirmation is recorded in the audit log with your
                    identity and timestamp.
                  </small>
                </div>
              </label>
            </div>
          )}

          {currentStep === 8 && (
            <div className="review-grid">
              {[
                ['Project', 'Acme Commerce API'],
                ['Target', 'api.acme.com · Production'],
                ['OpenAPI', '3.1 · 67 endpoints'],
                ['Authentication', 'Bearer / JWT'],
                ['Identities', 'Customer A, Customer B, Administrator'],
                ['Authorization', '20 access rules configured'],
                ['Scan mode', selectedOption === 1 ? 'Active mode' : 'Safe mode'],
                ['Scope', '/api/v1/* · 2 exclusions'],
                ['Request budget', '1,200 requests'],
                ['Timeout', '30 minutes']
              ].map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <strong>{v}</strong>
                  <Check size={15} style={{ color: 'var(--green)' }} />
                </div>
              ))}
            </div>
          )}

          {currentStep === 9 && (
            <div className="launch-state">
              <div className="launch-shield">
                <Shield size={34} />
                <i />
              </div>
              {[
                'Configuration verified',
                'Authorization confirmed',
                'Scope validated',
                'Ready to queue'
              ].map((msg, idx) => (
                <div key={msg} style={{ animationDelay: `${idx * 120}ms` }}>
                  <Check size={15} />
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="wizard-footer">
            <Button
              variant="ghost"
              icon={ChevronLeft}
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === 7 && !authorized}
            >
              {currentStep === 8
                ? 'Start security scan'
                : currentStep === 9
                ? 'Open scan monitor'
                : 'Continue'}{' '}
              <ArrowRight size={15} />
            </Button>
          </div>
        </Panel>

        {/* Wizard Aside Summary */}
        <aside className="wizard-aside">
          <Panel title="Scan configuration" subtitle="ACME LABS / DRAFT">
            {[
              ['Project', 'Acme Commerce'],
              ['Target', 'api.acme.com'],
              ['Environment', 'Production'],
              ['OpenAPI', '3.1 · 67 endpoints'],
              ['Identities', '3 selected'],
              ['Scan mode', selectedOption === 1 ? 'Active' : 'Safe']
            ].map(([k, v], idx) => (
              <div
                className={`summary-row ${
                  currentStep < idx ? 'pending' : ''
                }`}
                key={k}
              >
                <span>{k}</span>
                <strong>{currentStep < idx ? 'Not configured' : v}</strong>
              </div>
            ))}
          </Panel>

          <div className="scope-notice">
            <Shield size={18} />
            <div>
              <strong>Scope enforced</strong>
              <span>
                The scanner worker only sends requests to explicitly authorized
                paths.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
