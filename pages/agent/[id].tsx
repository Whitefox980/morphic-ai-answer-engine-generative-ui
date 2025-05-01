
import { useRouter } from 'next/router';

export default function AgentProfile() {
  const router = useRouter();
  const { id } = router.query;
  const agentMap: Record<string, any> = {
    marko: { name: 'Marko', specialty: 'Lokacije u Srbiji', bio: 'Pronalazi sve — od pumpe do parka.' },
    pravni: { name: 'Pravni Agent', specialty: 'Pravni saveti', bio: 'Zna svaki zakon, kao iz rukava.' },
    turisticki: { name: 'Turistički Agent', specialty: 'Putovanja i vodiči', bio: 'Gde god poželiš — vodi te kao vodič.' },
  };

  const agent = agentMap[id as string];
  if (!agent) return <p style={{ color: '#f00' }}>Nepoznat agent</p>;

  return (
    <main style={{ backgroundColor: 'black', color: '#0f0', fontFamily: 'monospace', minHeight: '100vh', padding: '2rem' }}>
      <h1>{agent.name}</h1>
      <p><strong>Specijalnost:</strong> {agent.specialty}</p>
      <p><strong>Biografija:</strong> {agent.bio}</p>
    </main>
  );
}
