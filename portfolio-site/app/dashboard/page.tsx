import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container" style={{maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem'}}>
      <section style={{
        textAlign: 'center',
        padding: '3rem 0',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
        borderRadius: '16px',
        marginBottom: '3rem',
        border: '1px solid var(--card-border)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 className="gradient-text" style={{fontSize: '3rem', marginBottom: '1rem'}}>
          Analytics Dashboard
        </h1>
        <p style={{fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto'}}>
          Real-time visualization of infrastructure optimization and business impact
        </p>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md#monthly-cost-breakdown"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--success)'}}>
              $22,300
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Monthly Savings</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Breakdown →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md#cost-optimization-strategies"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent)'}}>
              33%
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Cost Reduction</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Strategy →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md#payback-period"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--warning)'}}>
              8 months
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Payback Period</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Analysis →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/comprehensive-cost-analysis.md#5-year-projection"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--danger)'}}>
              $1.34M
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>5-Year Savings</div>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem'}}>
              View Projection →
            </div>
          </div>
        </a>
      </div>

      <section style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>
          <i className="fas fa-chart-pie" style={{marginRight: '0.5rem', color: 'var(--accent)'}}></i>
          Cost Optimization Breakdown
          <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/cost-optimization/analysis/savings-breakdown.md"
             target="_blank"
             style={{
               fontSize: '0.9rem',
               color: 'var(--accent)',
               marginLeft: '1rem',
               textDecoration: 'none'
             }}>
            (View Details →)
          </a>
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <div style={{padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)'}}>$10,000</div>
            <div style={{color: 'var(--text-secondary)'}}>Compute Savings</div>
          </div>
          <div style={{padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)'}}>$5,000</div>
            <div style={{color: 'var(--text-secondary)'}}>Database Savings</div>
          </div>
          <div style={{padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--warning)'}}>$4,000</div>
            <div style={{color: 'var(--text-secondary)'}}>Network Savings</div>
          </div>
          <div style={{padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)'}}>$3,300</div>
            <div style={{color: 'var(--text-secondary)'}}>Storage Savings</div>
          </div>
        </div>
      </section>

      <div style={{textAlign: 'center'}}>
        <Link href="/dashboard-full" style={{
          background: 'var(--accent)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.1rem'
        }}>
          View Full Interactive Dashboard <i className="fas fa-arrow-right"></i>
        </Link>
        <p style={{marginTop: '1rem', color: 'var(--text-secondary)'}}>
          <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/security/risk-management-dashboard.md"
             target="_blank"
             style={{color: 'var(--accent)', textDecoration: 'none'}}>
            View Risk Management Methodology →
          </a>
        </p>
      </div>
    </div>
  );
}