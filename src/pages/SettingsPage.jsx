import React, { useState } from 'react'
import {
  Button,
  PageHeader,
  Panel
} from '../components/ui/AppUI'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Security')
  const [mfa, setMfa] = useState(true)
  const [timeout, setTimeoutVal] = useState('8 hours')
  const [retention, setRetention] = useState('90 days')
  const [notify, setNotify] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Settings"
        description="Manage workspace preferences, security controls and scanner defaults."
      />

      <div className="settings-layout">
        <div className="settings-nav">
          {[
            'Account',
            'Workspace',
            'Security',
            'Notifications',
            'Scanner defaults',
            'Scan limits',
            'Sessions'
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button
            type="button"
            className={`danger ${activeTab === 'Danger zone' ? 'active' : ''}`}
            onClick={() => setActiveTab('Danger zone')}
          >
            Danger zone
          </button>
        </div>

        <Panel
          className="settings-panel"
          title={activeTab}
          subtitle="Workspace security policies and authentication requirements"
        >
          {activeTab === 'Danger zone' ? (
            <div style={{ padding: '20px 0' }}>
              <div
                style={{
                  background: '#f0525215',
                  border: '1px solid #f0525240',
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <strong style={{ color: '#f87171', display: 'block', marginBottom: 6 }}>
                  Delete Workspace
                </strong>
                <p style={{ color: '#9cb0bf', fontSize: 14, margin: 0 }}>
                  Permanently delete this workspace, including all connected targets, recorded evidence, and scan histories. This action cannot be undone.
                </p>
                <div style={{ marginTop: 16 }}>
                  <Button variant="danger">Delete Acme Labs Workspace</Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="settings-section">
                <div>
                  <strong>Multi-factor authentication</strong>
                  <span>Require MFA for all workspace administrators.</span>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={mfa}
                    onChange={(e) => setMfa(e.target.checked)}
                  />
                  <i />
                </label>
              </div>

              <div className="settings-section">
                <div>
                  <strong>Session timeout</strong>
                  <span>Automatically sign out inactive workspace members.</span>
                </div>
                <label className="field compact">
                  <select
                    value={timeout}
                    onChange={(e) => setTimeoutVal(e.target.value)}
                  >
                    <option>8 hours</option>
                    <option>4 hours</option>
                    <option>1 hour</option>
                  </select>
                </label>
              </div>

              <div className="settings-section">
                <div>
                  <strong>Finding evidence retention</strong>
                  <span>
                    Evidence remains encrypted and sensitive values stay redacted.
                  </span>
                </div>
                <label className="field compact">
                  <select
                    value={retention}
                    onChange={(e) => setRetention(e.target.value)}
                  >
                    <option>90 days</option>
                    <option>30 days</option>
                  </select>
                </label>
              </div>

              <div className="settings-section">
                <div>
                  <strong>Critical finding notifications</strong>
                  <span>
                    Notify workspace administrators when a critical issue is
                    detected.
                  </span>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={notify}
                    onChange={(e) => setNotify(e.target.checked)}
                  />
                  <i />
                </label>
              </div>

              <div className="settings-save">
                <Button onClick={handleSave}>
                  {saved ? 'Changes saved ✓' : 'Save changes'}
                </Button>
              </div>
            </>
          )}
        </Panel>
      </div>
    </>
  )
}
