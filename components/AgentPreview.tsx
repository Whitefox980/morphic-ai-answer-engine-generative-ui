
interface AgentPreviewProps {
  name: string;
  status: 'online' | 'offline';
  image: string;
  specialty: string;
}

export default function AgentPreview({ name, status, image, specialty }: AgentPreviewProps) {
  return (
    <div style={{ border: '1px solid #0f0', padding: '1rem', color: '#0f0', fontFamily: 'monospace', backgroundColor: '#000' }}>
      <img src={image} alt={name} style={{ width: '100px', borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p>Status: <strong>{status}</strong></p>
      <p>Specijalnost: {specialty}</p>
      <button style={{ marginTop: '0.5rem', backgroundColor: '#0f0', color: '#000', padding: '0.5rem' }}>Pozovi agenta</button>
    </div>
  );
}
