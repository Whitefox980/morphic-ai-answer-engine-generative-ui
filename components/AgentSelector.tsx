
interface AgentOption {
  id: string;
  label: string;
}

const AGENTS: AgentOption[] = [
  { id: 'marko', label: 'Marko – Lokacije' },
  { id: 'pravni', label: 'Pravni Agent' },
  { id: 'turisticki', label: 'Turistički Agent' },
];

export default function AgentSelector({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: '0.5rem', fontSize: '1rem' }}>
      <option value="">Izaberi agenta</option>
      {AGENTS.map(agent => (
        <option key={agent.id} value={agent.id}>{agent.label}</option>
      ))}
    </select>
  );
}
