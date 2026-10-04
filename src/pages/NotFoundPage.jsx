import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Badge } from '../components/ui/AppUI'

export default function NotFoundPage() {
  return (
    <div className="not-found" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px' }}>
      <div className="network-art" style={{ marginBottom: 24 }}>
        <ShieldAlert size={56} style={{ color: 'var(--amber)' }} />
      </div>
      <Badge tone="warning">HTTP 404</Badge>
      <div className="page-title" style={{ fontSize: 28, fontWeight: 700, margin: '16px 0 8px', color: '#f0f5f7' }}>
        Endpoint not found.
      </div>
      <p style={{ color: 'var(--muted)', maxWidth: 440, marginBottom: 24, fontSize: 15 }}>
        The route you requested is not available or has been decommissioned from this workspace.
      </p>
      <Link to="/app/dashboard" className="button button-primary" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <ArrowLeft size={16} /> Return to overview
      </Link>
    </div>
  )
}
