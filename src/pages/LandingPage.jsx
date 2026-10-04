import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MetricsStrip from '../components/MetricsStrip'
import Capabilities from '../components/Capabilities'
import RiskSection from '../components/RiskSection'
import Workflow from '../components/Workflow'
import DashboardPreview from '../components/DashboardPreview'
import LiveEvidence from '../components/LiveEvidence'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', color: 'var(--text)', background: 'var(--bg)' }}>
      <Navbar />
      <main>
        <Hero />
        <div style={{ maxWidth: 1348, margin: '0 auto', padding: '0 0 20px' }} className="metrics-wrapper">
          <MetricsStrip />
        </div>
        <Capabilities />
        <RiskSection />
        <Workflow />
        <DashboardPreview />
        <LiveEvidence />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      <style>{`
        .metrics-wrapper {
          max-width: calc(100% - 72px) !important;
        }
        @media (max-width: 768px) {
          .metrics-wrapper { max-width: calc(100% - 40px) !important; }
        }
      `}</style>
    </div>
  )
}
