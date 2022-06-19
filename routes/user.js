const express = require("express");
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const router = express.Router();

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  // 查询登录是否成功
  const result = login(username, password);
  return result.then((data) => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username;
      req.session.realName = data.realname;

      res.json(new SuccessModel("登录成功"));
    } else {
      res.json(new ErrorModel("登录失败"));
    }
  });
});

router.get("/login-test", (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: "已登录",
    });
  } else {
    res.json({
      errno: -1,
      msg: "未登录",
    });
  }
});

// router.get("/session-test", (req, res, next) => {
//   const session = req.session;
//   if (!session.viewNum) {
//     session.viewNum = 0;
//   }
//   session.viewNum++;

//   res.json(session);
// });

module.exports = router;
