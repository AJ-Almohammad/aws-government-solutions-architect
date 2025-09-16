# Network Architecture Design - Department of Citizen Services

## Network Architecture Overview

This document details the network architecture for the Department of 
Citizen Services cloud infrastructure, designed for maximum security, 
scalability, and compliance with government standards including FedRAMP 
and NIST guidelines.

## Network Architecture Diagram

![Network Architecture](images/network_architecture.png)

## VPC Design Strategy

### **Multi-AZ VPC Configuration**
- **Primary Region:** us-east-1 (N. Virginia) - Government cloud region
- **VPC CIDR Block:** 10.0.0.0/16 (65,536 IP addresses)
- **Availability Zones:** 3 AZs for high availability
- **DNS Resolution:** Enabled for internal service discovery
- **DNS Hostnames:** Enabled for proper hostname resolution

### **Subnet Architecture**

#### **Public Subnets (Internet-Facing)**
| Subnet Name | CIDR Block | AZ | Purpose | Resources |
|-------------|------------|----|---------|-----------| 
| Public-1A | 10.0.1.0/24 | us-east-1a | Load Balancers | ALB, NAT Gateway 
|
| Public-1B | 10.0.2.0/24 | us-east-1b | Load Balancers | ALB, NAT Gateway 
|
| Public-1C | 10.0.3.0/24 | us-east-1c | Bastion Host | Management Access 
|

#### **Private Subnets (Application Layer)**
| Subnet Name | CIDR Block | AZ | Purpose | Resources |
|-------------|------------|----|---------|-----------| 
| App-1A | 10.0.10.0/24 | us-east-1a | Web/App Servers | EC2, Auto Scaling 
|
| App-1B | 10.0.20.0/24 | us-east-1b | Web/App Servers | EC2, Auto Scaling 
|
| App-1C | 10.0.30.0/24 | us-east-1c | Web/App Servers | EC2, Auto Scaling 
|

#### **Private Subnets (Database Layer)**
| Subnet Name | CIDR Block | AZ | Purpose | Resources |
|-------------|------------|----|---------|-----------| 
| DB-1A | 10.0.100.0/24 | us-east-1a | Database Primary | RDS PostgreSQL |
| DB-1B | 10.0.110.0/24 | us-east-1b | Database Standby | RDS Multi-AZ |
| DB-1C | 10.0.120.0/24 | us-east-1c | Cache & Backup | ElastiCache, 
Backups |

## Internet Gateway and Routing

### **Internet Gateway Configuration**
- **Purpose:** Provides internet access to public subnets
- **Redundancy:** AWS-managed, inherently highly available
- **Security:** Only attached to VPC, no direct instance access

### **Route Tables**

#### **Public Route Table**
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | Local | Internal VPC traffic |
| 0.0.0.0/0 | Internet Gateway | Internet access |

#### **Private Route Tables (per AZ)**
| Destination | Target | Purpose |
|-------------|--------|---------|
| 10.0.0.0/16 | Local | Internal VPC traffic |
| 0.0.0.0/0 | NAT Gateway | Outbound internet via NAT |

## NAT Gateway Design

### **High Availability NAT Configuration**
- **Deployment:** One NAT Gateway per Availability Zone
- **Bandwidth:** 45 Gbps with auto-scaling capability
- **Redundancy:** AZ-level isolation prevents single points of failure
- **Cost Optimization:** Right-sized for government workload patterns

#### **NAT Gateway Specifications**
| NAT Gateway | Location | Subnet | Elastic IP | Monthly Cost |
|-------------|----------|--------|------------|--------------|
| NAT-1A | us-east-1a | Public-1A | eip-1a | $32.85 |
| NAT-1B | us-east-1b | Public-1B | eip-1b | $32.85 |
| NAT-1C | us-east-1c | Public-1C | eip-1c | $32.85 |

## Security Groups Architecture

### **Web Tier Security Group (SG-Web)**
| Type | Protocol | Port | Source | Purpose |
|------|----------|------|--------|---------|
| Inbound | HTTP | 80 | ALB Security Group | HTTP traffic from load 
balancer |
| Inbound | HTTPS | 443 | ALB Security Group | HTTPS traffic from load 
balancer |
| Inbound | SSH | 22 | Bastion Security Group | Administrative access |
| Outbound | All | All | 0.0.0.0/0 | Internet access for updates |

### **Application Tier Security Group (SG-App)**
| Type | Protocol | Port | Source | Purpose |
|------|----------|------|--------|---------|
| Inbound | HTTP | 8080 | SG-Web | Application traffic from web tier |
| Inbound | HTTPS | 8443 | SG-Web | Secure application traffic |
| Inbound | SSH | 22 | Bastion Security Group | Administrative access |
| Outbound | PostgreSQL | 5432 | SG-Database | Database connections |
| Outbound | Redis | 6379 | SG-Cache | Cache connections |
| Outbound | HTTPS | 443 | 0.0.0.0/0 | AWS API calls |

### **Database Tier Security Group (SG-Database)**
| Type | Protocol | Port | Source | Purpose |
|------|----------|------|--------|---------|
| Inbound | PostgreSQL | 5432 | SG-App | Application database access |
| Inbound | PostgreSQL | 5432 | Bastion Security Group | Administrative 
access |
| Outbound | None | None | None | No outbound access required |

### **Load Balancer Security Group (SG-ALB)**
| Type | Protocol | Port | Source | Purpose |
|------|----------|------|--------|---------|
| Inbound | HTTP | 80 | 0.0.0.0/0 | Public web traffic |
| Inbound | HTTPS | 443 | 0.0.0.0/0 | Secure public web traffic |
| Outbound | HTTP | 80 | SG-Web | Forward to web tier |
| Outbound | HTTPS | 443 | SG-Web | Forward secure traffic |

### **Bastion Host Security Group (SG-Bastion)**
| Type | Protocol | Port | Source | Purpose |
|------|----------|------|--------|---------|
| Inbound | SSH | 22 | Government IP ranges | Administrative SSH access |
| Outbound | SSH | 22 | Private subnets | SSH to internal resources |
| Outbound | PostgreSQL | 5432 | SG-Database | Database administration |

## Network Access Control Lists (NACLs)

### **Public Subnet NACL**
| Rule # | Type | Protocol | Port | Source/Dest | Action | Purpose |
|---------|------|----------|------|-------------|---------|---------|
| 100 | Inbound | HTTP | 80 | 0.0.0.0/0 | ALLOW | Web traffic |
| 110 | Inbound | HTTPS | 443 | 0.0.0.0/0 | ALLOW | Secure web traffic |
| 120 | Inbound | SSH | 22 | Gov IP ranges | ALLOW | Admin access |
| 200 | Inbound | TCP | 1024-65535 | 0.0.0.0/0 | ALLOW | Return traffic |
| * | Inbound | All | All | 0.0.0.0/0 | DENY | Default deny |

### **Private Subnet NACL**
| Rule # | Type | Protocol | Port | Source/Dest | Action | Purpose |
|---------|------|----------|------|-------------|---------|---------|
| 100 | Inbound | All | All | 10.0.0.0/16 | ALLOW | Internal VPC traffic |
| 200 | Inbound | TCP | 1024-65535 | 0.0.0.0/0 | ALLOW | Return traffic |
| * | Inbound | All | All | 0.0.0.0/0 | DENY | Default deny |

## VPC Endpoints Configuration

### **Gateway Endpoints (No additional cost)**
- **S3 Gateway Endpoint:** Direct access to S3 without internet routing
- **DynamoDB Gateway Endpoint:** Direct DynamoDB access from private 
subnets

### **Interface Endpoints (VPC Endpoints)**
| Service | Endpoint Type | Purpose | Monthly Cost |
|---------|---------------|---------|--------------|
| EC2 | Interface | Instance management | $21.90 |
| RDS | Interface | Database management | $21.90 |
| Lambda | Interface | Serverless functions | $21.90 |
| Secrets Manager | Interface | Credential management | $21.90 |
| KMS | Interface | Encryption key management | $21.90 |
| CloudWatch | Interface | Monitoring and logging | $21.90 |

## DNS and Service Discovery

### **Route 53 Private Hosted Zone**
- **Zone Name:** dcs.internal
- **Purpose:** Internal service discovery and DNS resolution
- **Records:** A records for internal services, CNAME for aliases

### **Internal DNS Records**
| Record Name | Type | Value | Purpose |
|-------------|------|-------|---------|
| db-primary.dcs.internal | A | RDS endpoint | Primary database |
| db-read.dcs.internal | A | Read replica endpoint | Read-only database |
| cache.dcs.internal | A | ElastiCache endpoint | Application cache |
| api.dcs.internal | A | Internal ALB | Internal API access |

## Network Monitoring and Logging

### **VPC Flow Logs Configuration**
- **Destination:** CloudWatch Logs
- **Capture:** ALL traffic (accepted and rejected)
- **Format:** Custom format with source, destination, protocol, ports
- **Retention:** 90 days for compliance
- **Analysis:** Integration with CloudWatch Insights and Athena

### **Network Monitoring Metrics**
- **Bandwidth Utilization:** Per subnet and NAT Gateway
- **Connection Tracking:** Active connections and connection rates
- **Packet Loss:** Network performance monitoring
- **Latency Monitoring:** Inter-subnet and internet latency
- **Security Events:** Blocked connections and intrusion attempts

## Network Security Controls

### **DDoS Protection**
- **AWS Shield Standard:** Automatic DDoS protection (included)
- **AWS Shield Advanced:** Enhanced DDoS protection for critical resources
- **CloudFront:** Geographic distribution and DDoS mitigation
- **Rate Limiting:** API Gateway and application-level rate limiting

### **Network Intrusion Detection**
- **GuardDuty:** AI-powered threat detection for network anomalies
- **VPC Flow Log Analysis:** Automated analysis of network patterns
- **CloudWatch Alarms:** Real-time alerting for suspicious activity
- **Third-party Integration:** SIEM integration for comprehensive 
monitoring

## Disaster Recovery Network Design

### **Cross-Region Connectivity**
- **Primary Region:** us-east-1 (N. Virginia)
- **DR Region:** us-west-2 (Oregon)
- **VPC Peering:** Secure connectivity between regions
- **Transit Gateway:** Centralized routing for multi-region architecture

### **DR Network Configuration**
| Component | Primary (us-east-1) | DR (us-west-2) | Sync Method |
|-----------|--------------------|--------------------|-------------|
| VPC CIDR | 10.0.0.0/16 | 10.1.0.0/16 | N/A |
| Database | RDS Multi-AZ | Cross-region replica | Async replication |
| Storage | S3 primary | S3 cross-region replication | Async replication |
| DNS | Route 53 primary | Route 53 failover | Health checks |

## Network Performance Optimization

### **Bandwidth and Throughput**
- **Enhanced Networking:** SR-IOV for EC2 instances
- **Placement Groups:** Cluster placement for low latency
- **Dedicated Tenancy:** For sensitive government workloads
- **Instance Types:** Network-optimized instances (c5n, m5n, r5n)

### **Content Delivery Network (CDN)**
- **CloudFront Distribution:** Global edge locations
- **Origin Shield:** Additional caching layer for cost optimization
- **Compression:** Automatic content compression
- **HTTP/2 Support:** Modern protocol support for performance

## Compliance and Security Standards

### **FedRAMP Network Requirements**
- **Network Segmentation:** Multi-tier architecture with security zones
- **Encryption in Transit:** TLS 1.3 for all communications
- **Access Controls:** Least privilege network access
- **Monitoring:** Comprehensive network monitoring and logging
- **Incident Response:** Network-based incident detection and response

### **NIST Cybersecurity Framework Alignment**
- **Identify:** Network asset inventory and risk assessment
- **Protect:** Security groups, NACLs, and access controls
- **Detect:** Flow logs, GuardDuty, and monitoring
- **Respond:** Automated incident response and isolation
- **Recover:** Network disaster recovery and business continuity

## Cost Analysis and Optimization

### **Monthly Network Costs**
| Component | Quantity | Unit Cost | Monthly Total |
|-----------|----------|-----------|---------------|
| NAT Gateways | 3 | $32.85 | $98.55 |
| VPC Endpoints | 6 | $21.90 | $131.40 |
| Data Transfer | 10TB | $0.09/GB | $900.00 |
| Route 53 Queries | 100M | $0.40/1M | $40.00 |
| **Total Network Cost** | | | **$1,169.95** |

### **Cost Optimization Strategies**
- **VPC Endpoints:** Reduce data transfer costs by 60%
- **CloudFront:** Cache hit ratio of 85% reduces origin costs
- **Reserved Capacity:** NAT Gateway reserved instances where available
- **Data Transfer Optimization:** Compression and efficient routing

## Network Architecture Decision Records

### **NAD-001: Multi-AZ NAT Gateway Deployment**
**Decision:** Deploy NAT Gateway in each Availability Zone  
**Rationale:** Eliminates cross-AZ data transfer costs and provides 
redundancy  
**Impact:** Higher cost ($98.55/month) but improved availability and 
performance

### **NAD-002: VPC Endpoints Implementation**
**Decision:** Implement interface endpoints for critical AWS services  
**Rationale:** Reduces internet data transfer costs and improves security  
**Impact:** $131.40/month cost but $540/month savings in data transfer

### **NAD-003: Private Subnet Database Tier**
**Decision:** Isolate databases in private subnets with no internet access  
**Rationale:** Meets FedRAMP security requirements and reduces attack 
surface  
**Impact:** Requires bastion host for administration but significantly 
improves security

## Implementation Roadmap

### **Phase 1: Core VPC Setup (Week 3)**
- [ ] Create VPC with DNS resolution enabled
- [ ] Create subnets across 3 Availability Zones
- [ ] Configure Internet Gateway and route tables
- [ ] Deploy NAT Gateways for outbound internet access

### **Phase 2: Security Configuration (Week 3)**
- [ ] Create security groups with least privilege access
- [ ] Configure Network ACLs for additional security layer
- [ ] Enable VPC Flow Logs for monitoring
- [ ] Set up GuardDuty for threat detection

### **Phase 3: VPC Endpoints and Optimization (Week 4)**
- [ ] Deploy S3 and DynamoDB Gateway Endpoints
- [ ] Create interface endpoints for AWS services
- [ ] Configure private hosted zone for internal DNS
- [ ] Implement network monitoring and alerting

### **Phase 4: Testing and Validation (Week 4)**
- [ ] Conduct network connectivity testing
- [ ] Validate security group rules and NACLs
- [ ] Test disaster recovery network failover
- [ ] Performance testing and optimization

---
*Document Version: 1.0*  
*Created: September 15, 2025*  
*Network Architect: Amer Almohammad*  
*Reviewed: Security Architecture Team*  
*Approved: Sarah Johnson (CTO) & Michael Rodriguez (CISO)*
