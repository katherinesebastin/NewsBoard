import { useState } from 'react';

// Custom SVG Icons
const SearchIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const NewspaperIcon = ({ size = '20px' }) => (
  <svg style={{ width: size, height: size }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

function ArticleCard({ a }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease',
        overflow: 'hidden',
        border: '1px solid #f3f4f6',
        marginBottom: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ padding: '24px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#111827', 
          marginTop: 0, 
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          {a.title}
        </h2>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          fontSize: '14px', 
          color: '#6b7280',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px', 
            fontWeight: '500',
            color: '#2563eb' 
          }}>
            <NewspaperIcon size="16px" />
            {a.source?.name}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CalendarIcon />
            {new Date(a.publishedAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        {a.description && (
          <p style={{ 
            color: '#374151', 
            marginBottom: '16px',
            lineHeight: '1.6',
            margin: '0 0 16px 0'
          }}>
            {a.description}
          </p>
        )}
        
        <a 
          href={a.url} 
          target="_blank" 
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#2563eb',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#1d4ed8'}
          onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
        >
          Read full article
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadTop() {
    setLoading(true);
    const res = await fetch('http://localhost:8000/news/top?country=us');
    const json = await res.json();
    setArticles(json.articles || []);
    setLoading(false);
  }

  async function search(e) {
    e?.preventDefault();
    if (!q) return;
    setLoading(true);
    const res = await fetch(`http://localhost:8000/news/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    setArticles(json.articles || []);
    setLoading(false);
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ 
              backgroundColor: '#2563eb', 
              padding: '8px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <NewspaperIcon size="32px" />
            </div>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#111827', margin: 0 }}>
                NewsBoard
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                Stay informed with the latest headlines
              </p>
            </div>
          </div>

          {/* Controls */}
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 640 ? 'column' : 'row',
            gap: '12px' 
          }}>
            <button 
              onClick={loadTop}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: loading ? '#93c5fd' : '#2563eb',
                color: 'white',
                fontWeight: '500',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontSize: '15px'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              <TrendingUpIcon />
              Top Headlines (US)
            </button>

            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <div style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <SearchIcon />
                </div>
                <input 
                  value={q} 
                  onChange={e => setQ(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && search(e)}
                  placeholder="Search for news topics..."
                  disabled={loading}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '15px',
                    backgroundColor: loading ? '#f3f4f6' : 'white',
                    color: loading ? '#6b7280' : '#111827',
                    cursor: loading ? 'not-allowed' : 'text',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button 
                onClick={search}
                disabled={loading || !q}
                style={{
                  padding: '12px 20px',
                  backgroundColor: (loading || !q) ? '#9ca3af' : '#111827',
                  color: 'white',
                  fontWeight: '500',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (loading || !q) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  fontSize: '15px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => !(loading || !q) && (e.currentTarget.style.backgroundColor = '#1f2937')}
                onMouseOut={(e) => !(loading || !q) && (e.currentTarget.style.backgroundColor = '#111827')}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {loading && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '48px 0' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #2563eb',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}></div>
              <span style={{ fontSize: '18px' }}>Loading articles...</span>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
              padding: '48px',
              maxWidth: '450px',
              margin: '0 auto'
            }}>
              <NewspaperIcon size="64px" />
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#111827', 
                margin: '16px 0 8px 0' 
              }}>
                No articles to display
              </h3>
              <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                Click "Top Headlines" to see trending news or use the search bar to find specific topics.
              </p>
            </div>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div>
            <div style={{ 
              fontSize: '14px', 
              color: '#6b7280', 
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              Showing {articles.length} article{articles.length !== 1 ? 's' : ''}
            </div>
            {articles.map((a, i) => <ArticleCard key={i} a={a} />)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '64px', 
        padding: '32px 0', 
        textAlign: 'center', 
        fontSize: '14px', 
        color: '#6b7280',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{ margin: 0 }}></p>
      </footer>
    </div>
  );
}