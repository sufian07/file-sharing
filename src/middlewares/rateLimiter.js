const rateLimit = require("express-rate-limit");
const MAX_UPLOADS_PER_IP = process.env.MAX_UPLOADS_PER_IP || 5;
const MAX_DOWNLOADS_PER_IP = process.env.MAX_DOWNLOADS_PER_IP || 5;

const downloadLimiter = rateLimit({
  max: MAX_DOWNLOADS_PER_IP,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  keyGenerator: (req) => req.ip + "_download",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,
  message: 'Daily download limit is completed, try again tomorrow'
});

const uploadLimiter = rateLimit({
  max: MAX_UPLOADS_PER_IP,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  keyGenerator: (req) => req.ip + "_upload",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,
  message: 'Daily upload limit is completed, try again tomorrow'
});

module.exports= {downloadLimiter, uploadLimiter};