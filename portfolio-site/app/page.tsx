export default function Home() {
  return (
    <div className="container" style={{maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem'}}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 0',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
        borderRadius: '16px',
        marginBottom: '3rem',
        border: '1px solid var(--card-border)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 className="gradient-text" style={{fontSize: '3.5rem', marginBottom: '1rem'}}>
          AWS Solutions Architect
        </h1>
        <p style={{fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem'}}>
          Government Cloud Infrastructure Specialist delivering enterprise-grade solutions with significant cost savings and enhanced security
        </p>
      </section>

      {/* Metrics Section with Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md" 
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--success)'}}>
              $267K
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Annual Savings</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Cost Analysis →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/security/compliance-docs/fedramp-alignment.md" 
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent)'}}>
              92%
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>FedRAMP Compliance</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Compliance Details →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md#roi-analysis" 
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--warning)'}}>
              594%
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>5-Year ROI</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View ROI Calculation →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/security/risk-management-dashboard.md" 
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--danger)'}}>
              87%
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Risk Reduction</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Risk Analysis →
            </div>
          </div>
        </a>
      </div>

      {/* Dashboard Preview */}
      <section style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '3rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{fontSize: '1.5rem'}}>
            <i className="fas fa-chart-bar" style={{marginRight: '0.5rem'}}></i>
            Risk Management Dashboard
          </h2>
          <a href="/dashboard-full" style={{
            background: 'var(--accent)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            View Full Dashboard <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        <div style={{
          padding: '2rem',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>
            Interactive visualization of security risk mitigation and cost optimization
          </p>
          <div style={{
            background: 'var(--secondary-bg)',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <i className="fas fa-chart-pie" style={{fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem', display: 'block'}}></i>
            <p>Advanced metrics showing risk reduction and cost savings</p>
          </div>
        </div>
      </section>
    </div>
  );
}