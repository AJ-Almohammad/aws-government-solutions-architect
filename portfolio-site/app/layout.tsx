import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amer Almohammad | Cloud Portfolio",
  description: "Government-focused AWS Solutions Architect delivering enterprise cloud solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <header style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#f8fafc',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fas fa-cloud" style={{marginRight: '0.5rem', color: '#3b82f6'}}></i>
            Amer Almohammad
          </Link>
          
          <nav style={{display: 'flex', gap: '1.5rem'}}>
            <Link href="/" style={{
              color: '#cbd5e1',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}>
              <i className="fas fa-home"></i> Home
            </Link>
            <Link href="/architecture" style={{
              color: '#cbd5e1',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}>
              <i className="fas fa-project-diagram"></i> Architecture
            </Link>
            <Link href="/dashboard" style={{
              color: '#cbd5e1',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}>
              <i className="fas fa-chart-line"></i> Dashboard
            </Link>
            <Link href="/cloudformation" style={{
              color: '#cbd5e1',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}>
              <i className="fas fa-code"></i> CloudFormation
            </Link>
            <a href="https://github.com/AJ-Almohammad/aws-government-solutions-architect" 
               target="_blank" 
               style={{
                 color: '#cbd5e1',
                 textDecoration: 'none',
                 fontWeight: 500,
                 padding: '0.5rem 1rem',
                 borderRadius: '6px'
               }}>
              <i className="fab fa-github"></i> GitHub
            </a>
          </nav>
        </header>
        
        {children}
        
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          marginTop: '4rem',
          color: '#cbd5e1',
          borderTop: '1px solid #334155'
        }}>
          <div style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>
            Created by Amer Almohammad
          </div>
          <div style={{fontSize: '0.9rem', color: '#3b82f6'}}>
            Junior Cloud Engineer
          </div>
        </footer>
      </body>
    </html>
  );
}