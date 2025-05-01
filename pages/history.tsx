
import { useEffect, useState } from 'react';

export default function History() {
  const [user, setUser] = useState('anon');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/history?user=${user}`)
      .then(res => res.json())
      .then(data => setHistory(data.history || []))
      .catch(err => console.error('Greška u učitavanju istorije:', err));
  }, [user]);

  return (
    <main style={{ backgroundColor: 'black', color: '#0f0', minHeight: '100vh', fontFamily: 'monospace', padding: '2rem' }}>
      <h1>Istorija upita korisnika: {user}</h1>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem', backgroundColor: '#001100', color: '#0f0', border: '1px solid #0f0' }}
        placeholder="Unesite user ID (ili anon)"
      />
      <ul>
        {history.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{entry}</li>
        ))}
      </ul>
    </main>
  );
}
