export default function ArchitecturePage() {
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
          System Architecture
        </h1>
        <p style={{fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto'}}>
          Enterprise-grade AWS infrastructure designed for government compliance and high availability
        </p>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/documentation/architecture/network-architecture.md"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-network-wired" style={{fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)'}}>Multi-Tier Network</h3>
            <ul style={{listStyle: 'none', textAlign: 'left', color: 'var(--text-secondary)'}}>
              <li>✓ Multi-AZ VPC Architecture</li>
              <li>✓ Public/Private/Data Subnets</li>
              <li>✓ NAT Gateway High Availability</li>
              <li>✓ VPC Flow Logs Enabled</li>
            </ul>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem', textAlign: 'center'}}>
              View Network Docs →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/security/compliance-docs/security-architecture.md"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-shield-alt" style={{fontSize: '2rem', color: 'var(--success)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--success)'}}>Security Architecture</h3>
            <ul style={{listStyle: 'none', textAlign: 'left', color: 'var(--text-secondary)'}}>
              <li>✓ Defense-in-depth Strategy</li>
              <li>✓ Bastion Host Access Control</li>
              <li>✓ AES-256 Encryption</li>
              <li>✓ WAF & Shield Protection</li>
            </ul>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem', textAlign: 'center'}}>
              View Security Docs →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/documentation/architecture/high-level-design.md"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-server" style={{fontSize: '2rem', color: 'var(--warning)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--warning)'}}>Compute Layer</h3>
            <ul style={{listStyle: 'none', textAlign: 'left', color: 'var(--text-secondary)'}}>
              <li>✓ Auto Scaling Groups</li>
              <li>✓ Application Load Balancer</li>
              <li>✓ EC2 t3.medium Instances</li>
              <li>✓ CloudWatch Monitoring</li>
            </ul>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem', textAlign: 'center'}}>
              View Design Docs →
            </div>
          </div>
        </a>

        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/blob/main/infrastructure/cloudformation/database-simple.yaml"
           target="_blank"
           style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="metric-card" style={{cursor: 'pointer'}}>
            <i className="fas fa-database" style={{fontSize: '2rem', color: 'var(--danger)', marginBottom: '1rem'}}></i>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--danger)'}}>Data Layer</h3>
            <ul style={{listStyle: 'none', textAlign: 'left', color: 'var(--text-secondary)'}}>
              <li>✓ RDS Multi-AZ PostgreSQL</li>
              <li>✓ Automated Backups (7 days)</li>
              <li>✓ Read Replica Support</li>
              <li>✓ Point-in-Time Recovery</li>
            </ul>
            <div style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '1rem', textAlign: 'center'}}>
              View Database Config →
            </div>
          </div>
        </a>
      </div>

      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect/tree/main/documentation/architecture/images"
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
          View Architecture Diagrams <i className="fas fa-diagram-project"></i>
        </a>
      </div>
    </div>
  );
}