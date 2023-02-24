const rateLimit = require("express-rate-limit");
const redis = require("redis");
const client = redis.createClient();

const dailyUploadLimit = 100 * 1024 * 1024; // 100 MB
const dailyDownloadLimit = 500 * 1024 * 1024; // 500 MB

const rateLimiter = rateLimit({
  store: new RedisStore({ client }),
  max: dailyDownloadLimit,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  keyGenerator: (req) => req.ip + "_download",
});

const uploadLimiter = rateLimit({
  store: new RedisStore({ client }),
  max: dailyUploadLimit,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  keyGenerator: (req) => req.ip + "_upload",
});

module.exports= {uploadLimiter, rateLimiter};