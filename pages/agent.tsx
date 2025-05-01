
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function Agent() {
  const router = useRouter();
  const { query } = router.query;
  const [odgovor, setOdgovor] = useState('');
  const [agent, setAgent] = useState('');
  useEffect(() => {
    if (!query) return;
    fetch('/api/dispatcher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(data => {
        setAgent(data.agent);
        setOdgovor(data.odgovor);
      })
      .catch(() => setOdgovor('Greška u povezivanju sa agentom.'));
  }, [query]);
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Upit: {query}</h1>
      <p><strong>Agent:</strong> {agent}</p>
      <p><strong>Odgovor:</strong> {odgovor}</p>
    </main>
  );
}
