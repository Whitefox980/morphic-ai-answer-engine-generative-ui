
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.user || 'anon';
  const key = `gdekako:${userId}:history`;
  const history = await redis.lrange(key, -10, -1);
  res.status(200).json({ history });
}
