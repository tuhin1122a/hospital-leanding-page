'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ 
        fontFamily: 'sans-serif', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        margin: 0,
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{ color: '#0f172a', fontSize: '2rem', marginBottom: '1rem' }}>
          A system foundation error occurred.
        </h1>
        <p style={{ color: '#64748b', maxWidth: '400px', marginBottom: '2rem' }}>
          An unexpected error occurred at the root level of the hospital dashboard. We're working to restore access.
        </p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Restart Application
        </button>
      </body>
    </html>
  )
}
