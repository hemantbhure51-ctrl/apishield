import React, { useState } from 'react'
import {
  Radio,
  Plus,
  Lock,
  Eye,
  Zap,
  MoreHorizontal,
  KeyRound,
  FileCode,
  ShieldCheck
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel
} from '../components/ui/AppUI'
import { identitiesData } from '../data/appData'

export default function IdentitiesPage() {
  const [testingId, setTestingId] = useState(null)
  const [testSuccess, setTestSuccess] = useState(null)

  const handleTestConnection = (name) => {
    setTestingId(name)
    setTimeout(() => {
      setTestingId(null)
      setTestSuccess(name)
      setTimeout(() => setTestSuccess(null), 3000)
    }, 800)
  }

  return (
    <>
      <PageHeader
        eyebrow="AUTHENTICATION CONTEXTS"
        title="Authentication identities"
        description="Configure the identities used to validate authentication and authorization boundaries."
        action={
          <Button icon={Plus}>
            Add identity
          </Button>
        }
      />

      <div className="security-callout">
        <Lock size={18} />
        <div>
          <strong>Credentials are encrypted and always masked</strong>
          <span>
            Secret values are never displayed after creation or included in evidence and reports.
          </span>
        </div>
        <Badge tone="success">Vault protected</Badge>
      </div>

      <div className="identity-grid">
        {identitiesData.map(([name, type, credential, initials, tone]) => (
          <Panel className="identity-card" key={name}>
            <div className="identity-head">
              <div className={`identity-avatar tone-${tone}`}>{initials}</div>
              <Badge
                tone={name === 'Anonymous' ? 'neutral' : 'success'}
                dot
              >
                {name === 'Anonymous' ? 'BASELINE' : 'VERIFIED'}
              </Badge>
              <button className="icon-button" aria-label="Identity options">
                <MoreHorizontal size={17} />
              </button>
            </div>

            <div className="identity-name">{name}</div>
            <div className="identity-type">
              <KeyRound size={14} /> {type}
            </div>

            <div className="secret-box">
              <div>
                <small>CREDENTIAL</small>
                <code>{credential}</code>
              </div>
              {name !== 'Anonymous' && <Eye size={15} style={{ cursor: 'pointer', color: '#7b8e9d' }} />}
            </div>

            <div className="identity-meta">
              <span>Last tested</span>
              <strong>
                {testingId === name
                  ? 'Testing connection...'
                  : testSuccess === name
                  ? 'Connection valid ✓'
                  : name === 'Anonymous'
                  ? 'Always available'
                  : '12 minutes ago'}
              </strong>
            </div>

            <div className="card-actions">
              <Button
                variant="secondary"
                icon={Zap}
                disabled={testingId === name}
                onClick={() => handleTestConnection(name)}
              >
                {testingId === name ? 'Testing...' : 'Test connection'}
              </Button>
              <Button variant="ghost">Edit</Button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  )
}
