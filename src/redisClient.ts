import Redis from 'ioredis'
import { Redis as UpstashRedis } from '@upstash/redis'

export { Redis }

let redisClient: Redis | null = null
let upstashClient: UpstashRedis | null = null

// Helper to get Upstash credentials from various possible env var names
function getUpstashCredentials():
  | { url: string; token: string }
  | null {
  // Try different possible environment variable names
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_API_URL

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_API_TOKEN

  if (url && token) {
    return { url, token }
  }

  return null
}

export function getRedisClient(): Redis | UpstashRedis {
  // Check for Upstash REST API (supports multiple env var naming conventions)
  const upstashCreds = getUpstashCredentials()
  if (upstashCreds) {
    if (!upstashClient) {
      upstashClient = new UpstashRedis({
        url: upstashCreds.url,
        token: upstashCreds.token,
      })
    }
    return upstashClient
  }

  // Check for REDIS_URL (standard Redis connection string)
  if (process.env.REDIS_URL || process.env.STORAGE_REDIS_URL) {
    const redisUrl = process.env.REDIS_URL || process.env.STORAGE_REDIS_URL
    if (!redisClient) {
      redisClient = new Redis(redisUrl!)
    }
    return redisClient
  }

  // Fallback to local Redis (for development)
  if (!redisClient) {
    redisClient = new Redis()
  }
  return redisClient
}
