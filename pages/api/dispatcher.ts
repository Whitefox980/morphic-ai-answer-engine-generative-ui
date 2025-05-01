
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'No query provided' });

  const q = query.toLowerCase();
  let agent = 'Operator';
  if (q.includes('zakon') || q.includes('ugovor') || q.includes('firma')) agent = 'Pravni agent';
  else if (q.includes('lokacija') || q.includes('gde')) agent = 'Marko – lokacijski agent';
  else if (q.includes('turizam') || q.includes('putovanje')) agent = 'Turistički agent';

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
  return res.status(200).json({ agent, odgovor: final });
}
