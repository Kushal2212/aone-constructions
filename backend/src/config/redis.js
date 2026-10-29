const { createClient } = require("redis");

let client;

async function connectRedis(url) {
  if (!url) {
    console.warn("REDIS_URL is not set; response caching is disabled.");
    return null;
  }

  client = createClient({
    url,
    socket: {
      connectTimeout: 1000,
      reconnectStrategy(retries) {
        if (retries > 2) {
          return new Error("Redis connection retries exhausted.");
        }
        return retries * 100;
      },
    },
  });
  client.on("error", (error) => {
    console.error("Redis client error:", error.message);
  });

  try {
    await client.connect();
    console.info("Connected to Redis.");
    return client;
  } catch (error) {
    console.error("Unable to connect to Redis; response caching is disabled:", error.message);
    client = null;
    return null;
  }
}

function getRedisClient() {
  return client?.isReady ? client : null;
}

async function closeRedis() {
  if (client?.isOpen) {
    await client.quit();
  }
}

module.exports = { connectRedis, getRedisClient, closeRedis };
