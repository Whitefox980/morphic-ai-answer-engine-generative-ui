
import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState('anon');

  useEffect(() => {
    fetch(`/api/history?user=${user}`)
      .then(res => res.json())
      .then(d => setData(d.history || []));
  }, [user]);

  return (
    <main style={{ padding: '2rem', background: 'black', color: '#0f0', fontFamily: 'monospace', minHeight: '100vh' }}>
      <h1>Admin Panel</h1>
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="user ID" style={{ marginBottom: '1rem', padding: '0.5rem' }} />
      <ul>
        {data.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{entry}</li>
        ))}
      </ul>
    </main>
  );
}
