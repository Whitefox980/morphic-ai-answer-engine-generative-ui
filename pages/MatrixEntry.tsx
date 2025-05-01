
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function MatrixEntry() {
  const router = useRouter();
  const [input, setInput] = useState('');
  return (
    <div style={{ backgroundColor: 'black', color: '#0f0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Kako vam mogu pomoći danas u Matrixu gde i kako?</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Unesite upit" style={{ padding: '1rem', width: '60%' }} />
      <button onClick={() => router.push(`/agent?query=${encodeURIComponent(input)}`)} style={{ marginTop: '1rem' }}>POKRENI UPIT</button>
    </div>
  );
}
