// 路由

// 导入第三方模块
const express = require("express");
const path = require("path");

// 创建express
const studentManagerRouter = express.Router();

// 创建控制器的对象
const studentManagerCTRL = require(path.join(
  __dirname,
  "../controllers/studentManagerController.js"
));

// 获取学生列表页面
studentManagerRouter.get("/list", studentManagerCTRL.getStudentListPage);

// 暴露出去
module.exports = studentManagerRouter;
