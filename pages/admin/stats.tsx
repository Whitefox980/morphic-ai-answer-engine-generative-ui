
import { useEffect, useState } from 'react';

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(setStats);
  }, []);

  if (!stats) return <p style={{ color: '#0f0' }}>Učitavanje...</p>;

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: 'black', color: '#0f0', minHeight: '100vh' }}>
      <h1>Statistika sistema</h1>
      <p>Ukupno upita: {stats.upiti}</p>
      <p>Redis keš hitovi: {stats.redis_hits}</p>
      <p>Tavily API poziva: {stats.tavily_calls}</p>
      <p>OpenAI poziva: {stats.openai_calls}</p>
      <h2>Upiti po agentima:</h2>
      <ul>
        {Object.entries(stats.agents).map(([agent, count]) => (
          <li key={agent}>{agent}: {count}</li>
        ))}
      </ul>
    </main>
  );
}
