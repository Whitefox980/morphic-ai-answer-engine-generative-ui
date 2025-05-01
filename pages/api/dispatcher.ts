
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, user = 'anon' } = req.body;
  if (!query) return res.status(400).json({ error: 'No query provided' });

  const q = query.toLowerCase();
  let agent = 'Operator';
  if (q.includes('zakon') || q.includes('ugovor') || q.includes('firma')) agent = 'Pravni agent';
  else if (q.includes('lokacija') || q.includes('gde')) agent = 'Marko – lokacijski agent';
  else if (q.includes('turizam') || q.includes('putovanje')) agent = 'Turistički agent';

  const cacheKey = `gdekako:${q}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    await redis.rpush(`gdekako:${user}:history`, `Q: ${query}
A: ${cached}`);
    await redis.ltrim(`gdekako:${user}:history`, -10, -1);
    return res.status(200).json({ agent, odgovor: cached });
  }

  const tavilyRes = await axios.post('https://api.tavily.com/search', {
    api_key: process.env.TAVILY_KEY,
    query,
    search_depth: 'advanced',
    include_answers: true
  });
  const docs = tavilyRes.data.answers.map((a: any) => `- ${a.answer}`).join('
');
  const prompt = `Korisnik pita: ${query}
Nađeni podaci:
${docs}
Formuliši jasan odgovor na srpskom.`;

  const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const final = openaiRes.data.choices[0].message.content;
  await redis.set(cacheKey, final, 'EX', 86400);
  await redis.rpush(`gdekako:${user}:history`, `Q: ${query}
A: ${final}`);
  await redis.ltrim(`gdekako:${user}:history`, -10, -1);
  return res.status(200).json({ agent, odgovor: final });
}
