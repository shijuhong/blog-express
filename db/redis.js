const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建 redis 客户端
const redisClient = redis.createClient(REDIS_CONF);
redisClient.connect();

const set = async (key, val) => {
  // 键值对必须为字符串形式
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  await redisClient.set(key, val);
  return true;
};

const get = async (key) => {
  const value = await redisClient.get(key);
  if (!value) {
    return null;
  }
  // 尝试解析 redis 字符串变为对象
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

module.exports = {
  set,
  get,
};
