
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    upiti: 128,
    redis_hits: 91,
    tavily_calls: 52,
    openai_calls: 47,
    agents: {
      marko: 61,
      pravni: 38,
      turisticki: 29
    }
  });
}
