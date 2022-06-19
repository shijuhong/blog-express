const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建 redis 客户端
const redisClient = redis.createClient({
  ...REDIS_CONF,
  legacyMode: true,
});
redisClient.connect();

module.exports = {
  redisClient,
};
