//路由

// 导入express
const express = require("express");
const path = require("path");

// 创建路由对象
const accountRouter = express.Router();

// 创建控制器的对象
const accountCTRL = require(path.join(
  __dirname,
  "../controllers/accountController.js"
));
// console.log(accountCTRL);

// 浏览器发出请求，控制器响应
// 登录请求
accountRouter.get("/login", accountCTRL.getLoginPage);
// 验证请求
accountRouter.get("/vcode", accountCTRL.getVcode);

// 导出模块
module.exports = accountRouter;
