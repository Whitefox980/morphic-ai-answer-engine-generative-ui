
import Redis from 'ioredis';

const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL!, {
  password: process.env.UPSTASH_REDIS_REST_TOKEN,
  tls: {} // koristi TLS za Upstash
});

export default redis;
