const { getRedisClient } = require("../config/redis");

async function readCache(key) {
  const redis = getRedisClient();
  if (!redis) return null;
  try {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Redis cache read failed:", error.message);
    return null;
  }
}

async function writeCache(key, value, seconds) {
  const redis = getRedisClient();
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), { EX: seconds });
  } catch (error) {
    console.error("Redis cache write failed:", error.message);
  }
}

async function invalidateCache(...patterns) {
  const redis = getRedisClient();
  if (!redis) return;
  try {
    for (const pattern of patterns) {
      let cursor = 0;
      do {
        const result = await redis.scan(cursor, { MATCH: pattern, COUNT: 100 });
        cursor = result.cursor;
        if (result.keys.length) await redis.del(result.keys);
      } while (Number(cursor) !== 0);
    }
  } catch (error) {
    console.error("Redis cache invalidation failed:", error.message);
  }
}

function cachedGet(keyPrefix, seconds, handler) {
  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.originalUrl}`;
    const cached = await readCache(key);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    try {
      const body = await handler(req);
      await writeCache(key, body, seconds);
      res.set("X-Cache", "MISS");
      res.json(body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { cachedGet, invalidateCache };
