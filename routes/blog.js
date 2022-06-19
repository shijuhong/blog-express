const express = require("express");
const { SuccessModel } = require("../model/resModel");
const { getList } = require("../controller/blog");

const router = express.Router();

router.get("/list", function (req, res, next) {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  // if (req.query.isadmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req);
  //   if (loginCheckResult) {
  //     // 未登录
  //     return loginCheckResult;
  //   }
  //   // 强制查询自己的博客
  //   author = req.session.username;
  // }

  const result = getList(author, keyword);
  // 返回 promise
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

module.exports = router;
