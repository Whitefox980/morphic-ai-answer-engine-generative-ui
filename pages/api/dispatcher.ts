
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'No query provided' });
  const q = query.toLowerCase();
  let agent = 'Operator';
  if (q.includes('zakon') || q.includes('ugovor') || q.includes('firma')) agent = 'Pravni agent';
  else if (q.includes('lokacija') || q.includes('gde')) agent = 'Marko – lokacijski agent';
  else if (q.includes('turizam') || q.includes('putovanje')) agent = 'Turistički agent';
  const odgovor = `Agent "${agent}" je dodeljen za vaš upit.`;
  res.status(200).json({ agent, odgovor });
}
