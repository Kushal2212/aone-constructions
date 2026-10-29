const Redis = require("ioredis");

let client;

async function connectRedis(url) {
  if (!url) {
    console.warn("REDIS_URL is not set; response caching is disabled.");
    return null;
  }

  const redis = new Redis(url, {
    lazyConnect: true,
    connectTimeout: 1000,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy(times) {
      if (times > 2) return null;
      return times * 100;
    },
  });

  redis.on("error", (error) => {
    console.error("Redis client error:", error.message);
  });

  try {
    await redis.connect();
    client = redis;
    console.info("Connected to Redis.");
    return client;
  } catch (error) {
    console.error("Unable to connect to Redis; response caching is disabled:", error.message);
    redis.disconnect();
    client = null;
    return null;
  }
}

function getRedisClient() {
  return client && client.status === "ready" ? client : null;
}

async function closeRedis() {
  if (!client) return;
  const redis = client;
  client = null;
  try {
    await redis.quit();
  } catch {
    redis.disconnect();
  }
}

module.exports = { connectRedis, getRedisClient, closeRedis };
