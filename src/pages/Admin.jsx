import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('admin_auth') === 'true'
  );
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:5000/api/registrations')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setRegistrations(data.data);
          } else {
            setError(data.error);
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'Acumen-IT-2k26' && loginData.password === 'Acumen@it') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('INVALID CREDENTIALS');
    }
  };

  if (!isAuthenticated) {
    return (
      <main style={{ 
        minHeight: '100vh', 
        background: '#0A0A0A', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#0d0d0d',
          border: '1px solid #1a1a1a',
          padding: '3rem',
          width: '100%',
          maxWidth: '400px',
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            color: '#FFF', 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>ADMIN GATEWAY</h1>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#555', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.5rem' }}>USERNAME</label>
            <input 
              type="text" 
              value={loginData.username}
              onChange={e => setLoginData({...loginData, username: e.target.value})}
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #333',
                padding: '0.8rem',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ color: '#555', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input 
              type="password" 
              value={loginData.password}
              onChange={e => setLoginData({...loginData, password: e.target.value})}
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #333',
                padding: '0.8rem',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            background: '#FFD600',
            border: 'none',
            padding: '1rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>AUTHORIZE ACCESS</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0A0A0A', 
      color: '#FFF', 
      padding: '8rem 2rem 4rem',
      fontFamily: 'var(--font-mono)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', textTransform: 'uppercase' }}>
              REGISTRATION_DATABASE
            </h1>
            <p style={{ color: '#FFD600', fontSize: '0.8rem' }}>TOTAL RECORDS: {registrations.length}</p>
          </div>
          <Link to="/" style={{ color: '#888', textDecoration: 'none', border: '1px solid #333', padding: '0.5rem 1rem' }}>
            BACK TO HOME
          </Link>
        </div>          
        {loading ? (
          <p> LOADING_DATA...</p>
        ) : error ? (
          <p style={{ color: '#FF6B35' }}> ERROR: {error}</p>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid #1a1a1a' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#111', textTransform: 'uppercase', textAlign: 'left' }}>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Date</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Name</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>College</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Roll No</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Events</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Transaction</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid #1a1a1a' }}>Proof</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg._id} style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem', color: '#555' }}>
                      {new Date(reg.registrationDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>{reg.name}</td>
                    <td style={{ padding: '1rem' }}>{reg.college}</td>
                    <td style={{ padding: '1rem', color: '#FFD600' }}>{reg.rollNo}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {reg.selectedEvents.map((ev, i) => (
                          <span key={i} style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            padding: '2px 6px', 
                            fontSize: '0.65rem',
                            border: '1px solid #333'
                          }}>
                            {ev}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                      {reg.transactionId}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <a 
                        href={reg.paymentScreenshotLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#FFD600', fontSize: '0.7rem', textDecoration: 'none', borderBottom: '1px dotted #FFD600' }}
                      >
                        VIEW_LINK
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
