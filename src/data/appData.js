import {
  LayoutDashboard,
  Boxes,
  Globe,
  Radio,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Settings,
  Shield,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  ListFilter
} from 'lucide-react'

export const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ]
  },
  {
    label: 'Workspace',
    items: [
      { to: '/app/projects', label: 'Projects', icon: Boxes },
      { to: '/app/targets', label: 'API Targets', icon: Globe },
      { to: '/app/identities', label: 'Identities', icon: Radio },
      { to: '/app/authorization', label: 'Authorization', icon: KeyRound }
    ]
  },
  {
    label: 'Security',
    items: [
      { to: '/app/scans', label: 'Scans', icon: ArrowRight, badge: '3' },
      { to: '/app/findings', label: 'Findings', icon: ShieldAlert, badge: '21' },
      { to: '/app/reports', label: 'Reports', icon: FileText }
    ]
  },
  {
    label: 'Administration',
    items: [
      { to: '/app/settings', label: 'Settings', icon: Settings }
    ]
  }
]

export const breadcrumbTitles = {
  dashboard: 'Security overview',
  projects: 'Projects',
  targets: 'API targets',
  identities: 'Authentication identities',
  authorization: 'Authorization matrix',
  scans: 'Security scans',
  findings: 'Security findings',
  reports: 'Reports',
  settings: 'Settings',
  new: 'New scan',
  'SCN-1042': 'SCN-1042',
  'FND-284': 'FND-284'
}

export const metricsData = [
  { label: 'Security posture', value: '87', suffix: '/100', trend: '+6 pts', icon: Shield, tone: 'cyan' },
  { label: 'API targets', value: '28', suffix: '', trend: '+3 this month', icon: Globe, tone: 'neutral' },
  { label: 'Active scans', value: '03', suffix: '', trend: '2 authorization', icon: ArrowRight, tone: 'success' },
  { label: 'Critical findings', value: '04', suffix: '', trend: '−2 vs last scan', icon: ShieldAlert, tone: 'critical' }
]

export const projectsData = [
  ['Acme Commerce API', 'Customer, order and payment services', 'Production', '87', '12', '3 targets', '2 hours ago'],
  ['Partner Integration Hub', 'External partner APIs and webhooks', 'Staging', '92', '5', '5 targets', 'Yesterday'],
  ['Mobile Application API', 'Consumer mobile application backend', 'Production', '74', '21', '2 targets', '3 days ago']
]

export const targetsData = [
  ['Acme Production API', 'https://api.acme.com', 'Production', 'OpenAPI 3.1', '67', 'Healthy', '2 hours ago'],
  ['Partner Gateway', 'https://partners.staging.acme.com', 'Staging', 'OpenAPI 3.0', '42', 'Healthy', 'Yesterday'],
  ['Mobile Backend', 'https://mobile-api.acme.com', 'Production', 'OpenAPI 3.1', '86', 'Review', '3 days ago']
]

export const identitiesData = [
  ['Anonymous', 'No authentication', 'Public access baseline', 'AN', 'neutral'],
  ['Customer A', 'Bearer / JWT', '••••••••••A83F', 'CA', 'cyan'],
  ['Customer B', 'API key', '••••••••••91D2', 'CB', 'cyan'],
  ['Administrator', 'Bearer / JWT', '••••••••••F72A', 'AD', 'warning']
]

export const endpointsList = [
  'GET /users/{id}',
  'GET /orders/{id}',
  'GET /admin/users',
  'POST /orders',
  'DELETE /users/{id}'
]

export const identitiesList = [
  'Anonymous',
  'Customer A',
  'Customer B',
  'Administrator'
]

export const defaultMatrix = [
  ['deny', 'deny', 'deny', 'deny', 'deny'],
  ['allow', 'allow', 'deny', 'allow', 'deny'],
  ['allow', 'allow', 'deny', 'allow', 'deny'],
  ['allow', 'allow', 'allow', 'allow', 'allow']
]

export const scansData = [
  ['SCN-1042', 'Acme Production API', 'Production', 'Safe', 'Running', '72%', '6', '4 min ago'],
  ['SCN-1041', 'Partner Gateway', 'Staging', 'Safe', 'Completed', '100%', '2', 'Yesterday'],
  ['SCN-1040', 'Mobile Backend', 'Production', 'Active', 'Completed', '100%', '8', '3 days ago']
]

export const findingsData = [
  ['critical', 'Broken Object Level Authorization', 'API1:2023', 'GET /api/v1/orders/{id}', '96%'],
  ['high', 'Admin function accessible to customer role', 'API5:2023', 'GET /api/v1/admin/users', '92%'],
  ['high', 'Authentication token accepted after expiry', 'API2:2023', 'POST /api/v1/session', '88%'],
  ['medium', 'Excessive response data exposure', 'API3:2023', 'GET /api/v1/users/{id}', '84%']
]

export const wizardSteps = [
  'Project',
  'Target',
  'OpenAPI',
  'Authentication',
  'Identities',
  'Authorization',
  'Scan profile',
  'Scope',
  'Review',
  'Launch'
]

export const wizardSubtitles = [
  'Choose the project that will own this assessment.',
  'Select an authorized API target and environment.',
  'Confirm the API inventory used to define the assessment surface.',
  'Choose how the scanner will authenticate requests.',
  'Select identities to compare access behavior across roles.',
  'Review the expected access rules for each identity.',
  'Choose a controlled request profile for this assessment.',
  'Confirm the precise target and path scope you are authorized to test.',
  'Verify every configuration detail before queuing the background job.',
  'Configuration complete. The scan is ready to enter the worker queue.'
]

export const scanLifecyclePhases = [
  'Queued',
  'Initializing',
  'Validating target',
  'Discovering',
  'Baseline',
  'Passive checks',
  'Authentication tests',
  'Authorization tests',
  'Active safe tests',
  'Analyzing',
  'Finalizing'
]
