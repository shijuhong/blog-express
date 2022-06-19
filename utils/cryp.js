const crypto = require("crypto");

// 密钥
const SECRET_KEY = "kfdsjl_742938#";

// md5 加密内容
const md5 = (content) => {
  // 输出变成 16 进制
  return crypto.createHash("md5").update(content).digest("hex");
};

// 加密函数
const genPassword = (password) => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
};

module.exports = {
  genPassword,
};
