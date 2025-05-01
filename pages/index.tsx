
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  return (
    <div style={{ backgroundColor: 'black', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '2rem' }}>Dobrodošli u gde-kako.rs</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Gde mogu da..."
        style={{ padding: '1rem', width: '60%', marginTop: '2rem', backgroundColor: '#001100', color: '#0f0', border: '1px solid #0f0' }}
      />
      <button onClick={() => router.push(`/agent?query=${encodeURIComponent(input)}`)} style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#0f0', color: '#000' }}>POŠALJI</button>
    </div>
  );
}
