export default function CloudFormationPage() {
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
          Infrastructure as Code
        </h1>
        <p style={{fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto'}}>
          Production-ready CloudFormation templates demonstrating enterprise AWS architecture
        </p>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/infrastructure/cloudformation/vpc-foundation.yaml"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-cloud" style={{fontSize: '2rem', color: 'var(--success)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--success)'}}>VPC Foundation</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Multi-AZ VPC with complete networking</p>
            <code style={{color: 'var(--accent)', fontSize: '0.9rem'}}>vpc-foundation.yaml</code>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem'}}>
              View Template →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/infrastructure/cloudformation/compute-infrastructure.yaml"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-server" style={{fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent)'}}>Compute Infrastructure</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Auto Scaling Groups with ALB</p>
            <code style={{color: 'var(--accent)', fontSize: '0.9rem'}}>compute-infrastructure.yaml</code>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem'}}>
              View Template →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/infrastructure/cloudformation/database-simple.yaml"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-database" style={{fontSize: '2rem', color: 'var(--warning)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--warning)'}}>Database Layer</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>RDS PostgreSQL Multi-AZ</p>
            <code style={{color: 'var(--accent)', fontSize: '0.9rem'}}>database-simple.yaml</code>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem'}}>
              View Template →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/infrastructure/cloudformation/security-groups.yaml"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-shield-alt" style={{fontSize: '2rem', color: 'var(--danger)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--danger)'}}>Security Groups</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Complete security configurations</p>
            <code style={{color: 'var(--accent)', fontSize: '0.9rem'}}>security-groups.yaml</code>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem'}}>
              View Template →
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
          <i className="fas fa-check-circle" style={{marginRight: '0.5rem', color: 'var(--success)'}}></i>
          Key Features
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
          <div>✓ Modular and reusable templates</div>
          <div>✓ Parameter-driven configuration</div>
          <div>✓ Cross-stack references</div>
          <div>✓ Built-in security best practices</div>
          <div>✓ Cost optimization tags</div>
          <div>✓ FedRAMP compliance ready</div>
        </div>
      </section>

      <div style={{textAlign: 'center'}}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/tree/main/infrastructure/cloudformation" 
           target="_blank"
           style={{
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
          View All Templates on GitHub <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
}