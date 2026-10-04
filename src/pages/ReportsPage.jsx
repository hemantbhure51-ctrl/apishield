import React, { useState } from 'react'
import {
  Shield,
  FileText,
  Boxes,
  Plus,
  Download,
  CheckCircle2
} from 'lucide-react'
import {
  Button,
  Badge,
  PageHeader,
  Panel
} from '../components/ui/AppUI'

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(null)

  const handleDownload = (name) => {
    setDownloading(name)
    setTimeout(() => {
      setDownloading(null)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        eyebrow="SECURITY COMMUNICATION"
        title="Reports"
        description="Generate evidence-led security reports for technical and executive audiences."
        action={
          <Button icon={Plus}>
            Generate report
          </Button>
        }
      />

      <div className="report-types">
        {[
          [
            'Security assessment',
            'Complete technical findings, evidence and remediation guidance.',
            Shield
          ],
          [
            'API security report',
            'API inventory, OWASP mapping and endpoint-level coverage.',
            FileText
          ],
          [
            'Executive report',
            'Security posture, business risk and remediation summary.',
            Boxes
          ]
        ].map(([title, desc, Icon]) => (
          <Panel className="report-type" key={title}>
            <div className="report-icon">
              <Icon size={21} />
            </div>
            <strong>{title}</strong>
            <p>{desc}</p>
            <Button variant="secondary">Configure report</Button>
          </Panel>
        ))}
      </div>

      <Panel
        className="full-panel"
        title="Generated reports"
        subtitle="Files expire after 30 days"
      >
        <div className="report-list">
          {[
            [
              'Acme API Security Assessment',
              'Security assessment',
              'SCN-1039',
              '18 findings',
              'PDF · 4.2 MB'
            ],
            [
              'Q3 Executive Security Review',
              'Executive report',
              'Multiple scans',
              '34 findings',
              'PDF · 2.8 MB'
            ],
            [
              'Partner Gateway Assessment',
              'API security report',
              'SCN-1038',
              '8 findings',
              'PDF · 3.1 MB'
            ]
          ].map((report, idx) => (
            <div key={report[0]}>
              <div className="pdf-icon">PDF</div>
              <div>
                <strong>{report[0]}</strong>
                <span>
                  Generated {idx + 1} day{idx ? 's' : ''} ago · Jordan Davis
                </span>
              </div>
              <Badge tone="neutral">{report[1]}</Badge>
              <span>{report[2]}</span>
              <span>{report[3]}</span>
              <small>{report[4]}</small>
              <Button
                variant="ghost"
                icon={Download}
                onClick={() => handleDownload(report[0])}
                disabled={downloading === report[0]}
              >
                {downloading === report[0] ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}
