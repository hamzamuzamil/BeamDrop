import Redis from 'ioredis'
import { Redis as UpstashRedis } from '@upstash/redis'

export { Redis }

let redisClient: Redis | null = null
let upstashClient: UpstashRedis | null = null

export function getRedisClient(): Redis | UpstashRedis {
  // Check for Upstash REST API first (automatically set by Vercel when using Upstash)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    if (!upstashClient) {
      upstashClient = new UpstashRedis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    }
    return upstashClient
  }

  // Check for REDIS_URL (standard Redis connection string)
  if (process.env.REDIS_URL) {
    if (!redisClient) {
      redisClient = new Redis(process.env.REDIS_URL)
    }
    return redisClient
  }

  // Fallback to local Redis (for development)
  if (!redisClient) {
    redisClient = new Redis()
  }
  return redisClient
}
