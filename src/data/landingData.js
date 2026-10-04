// Design data extracted from the Figma/live site

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#workflow' },
  { label: 'Live Demo', href: '#demo' },
  { label: 'Risks', href: '#risks' },
  { label: 'FAQ', href: '#faq' },
]

export const trustItems = [
  { label: 'No credit card required' },
  { label: 'SOC 2 compliant' },
  { label: 'GDPR ready' },
]

export const metrics = [
  { icon: 'shield', value: '10,000+', label: 'APIs Scanned' },
  { icon: 'bug', value: '94%', label: 'Vuln Detection Rate' },
  { icon: 'zap', value: '<5 min', label: 'First Scan Time' },
  { icon: 'lock', value: 'OWASP', label: 'Top 10 Coverage' },
]

export const capabilities = [
  {
    icon: 'scan-line',
    number: '01',
    title: 'Automated API Discovery',
    description:
      'Automatically crawl and enumerate all API endpoints, schemas, and authentication flows across your entire infrastructure.',
    footer: 'REST · GraphQL · gRPC',
  },
  {
    icon: 'shield-alert',
    number: '02',
    title: 'Vulnerability Detection',
    description:
      'Identify OWASP API Security Top 10 vulnerabilities including BOLA, broken authentication, excessive data exposure, and more.',
    footer: 'OWASP Top 10 Covered',
  },
  {
    icon: 'activity',
    number: '03',
    title: 'Real-Time Monitoring',
    description:
      'Continuous surveillance of your API traffic with anomaly detection, alerting you instantly to suspicious patterns and attacks.',
    footer: 'Live threat intelligence',
  },
  {
    icon: 'file-text',
    number: '04',
    title: 'Compliance Reports',
    description:
      'Generate detailed security reports with actionable remediation guidance mapped to PCI DSS, HIPAA, SOC 2, and ISO 27001.',
    footer: 'Audit-ready exports',
  },
]

export const workflows = [
  {
    step: '01',
    icon: 'plug',
    title: 'Connect Your API',
    description:
      'Import your OpenAPI spec, Postman collection, or let our scanner auto-discover endpoints in minutes.',
    tag: 'Takes 2 minutes',
  },
  {
    step: '02',
    icon: 'search',
    title: 'Deep Scan & Analyse',
    description:
      'Our AI-powered engine tests every endpoint for hundreds of vulnerability patterns, misconfigurations, and logic flaws.',
    tag: 'Runs automatically',
  },
  {
    step: '03',
    icon: 'bar-chart-2',
    title: 'Review Findings',
    description:
      'Get a prioritized list of vulnerabilities with severity scores, proof-of-concept payloads, and detailed context.',
    tag: 'Prioritized by risk',
  },
  {
    step: '04',
    icon: 'check-circle',
    title: 'Remediate & Verify',
    description:
      'Follow guided fixes and re-scan to verify issues are resolved. Track your security posture over time.',
    tag: 'Close the loop',
  },
]

export const risks = [
  'Broken Object Level Authorization',
  'Broken Authentication',
  'Excessive Data Exposure',
  'Lack of Resource Throttling',
  'Missing Function Level Authorization',
  'Mass Assignment',
  'Security Misconfigurations',
  'Injection Attacks',
  'Improper Asset Management',
  'Insufficient Logging',
]

export const evidenceItems = [
  {
    id: 1,
    severity: 'critical',
    category: 'BOLA / IDOR',
    title: 'Broken Object Level Authorization',
    endpoint: '/api/v1/users/{id}',
    description: 'Unauthenticated users can access other users\' data by manipulating the {id} parameter.',
    curlExample: `curl -X GET \\
  'https://api.example.com/api/v1/users/4421' \\
  -H 'Authorization: Bearer <victim_token>'`,
    remediation: 'Implement proper authorization checks verifying the requesting user has access to the specific resource. Use indirect object references instead of direct database IDs.',
  },
  {
    id: 2,
    severity: 'critical',
    category: 'Auth Bypass',
    title: 'JWT Algorithm Confusion Attack',
    endpoint: '/api/auth/verify',
    description: 'The API accepts JWTs signed with the "none" algorithm, allowing token forgery.',
    curlExample: `curl -X POST \\
  'https://api.example.com/api/auth/verify' \\
  -H 'Authorization: Bearer eyJ0.REDACTED.none'`,
    remediation: 'Explicitly validate the JWT algorithm on the server side. Reject tokens using the "none" algorithm or symmetric algorithms when asymmetric is expected.',
  },
  {
    id: 3,
    severity: 'high',
    category: 'Data Exposure',
    title: 'Sensitive PII in API Response',
    endpoint: '/api/v2/profile',
    description: 'The profile endpoint returns full SSN, payment card details, and internal user flags.',
    curlExample: `curl -X GET \\
  'https://api.example.com/api/v2/profile' \\
  -H 'Authorization: Bearer <your_token>'`,
    remediation: 'Apply response filtering to return only fields required by the client. Implement field-level access control and data masking for sensitive attributes.',
  },
]

export const faqs = [
  {
    q: 'How does APISec detect vulnerabilities without source code access?',
    a: 'APISec uses dynamic black-box testing techniques combined with AI-driven fuzzing. We analyze API responses, behavior, and error patterns to detect vulnerabilities without requiring source code, similar to how a real attacker would probe your APIs.',
  },
  {
    q: 'What API types and specifications are supported?',
    a: 'We support REST APIs, GraphQL, gRPC, SOAP, and WebSocket endpoints. You can import OpenAPI/Swagger (v2 & v3) specifications, Postman collections, HAR files, or use our automated discovery to find endpoints.',
  },
  {
    q: 'Will scanning affect my production environment?',
    a: 'APISec is designed to be non-disruptive. Our scanner uses carefully crafted payloads that detect vulnerabilities without causing data corruption or service interruption. We also offer a sandbox mode that replicates your API behavior in an isolated environment.',
  },
  {
    q: 'How long does a typical scan take?',
    a: 'Initial scans of small-to-medium APIs (under 100 endpoints) typically complete in under 5 minutes. Larger APIs with complex authentication flows may take 15-30 minutes. All scans run continuously in the background without blocking your workflow.',
  },
  {
    q: 'Does APISec integrate with our CI/CD pipeline?',
    a: 'Yes. We offer native integrations for GitHub Actions, GitLab CI, Jenkins, CircleCI, and Azure DevOps. Our CLI tool and REST API allow you to embed security scans into any pipeline and gate deployments based on security thresholds.',
  },
]
