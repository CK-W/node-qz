// 导入express
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// 移入sisson存储
const session = require("express-session");

// 创建app
const app = express();

// 处理。响应  这一步在控制器中实现

// node中处理静态资源 bootstrap
app.use(express.static(path.join(__dirname, "statics")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 使用sisson
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60000 }
  })
);

// 继承路由中间件
const accountRouter = require(path.join(
  __dirname,
  "./routers/accountRouter.js"
));
const studentManagerRouter = require(path.join(
  __dirname,
  "./routers/studentManagerRouter"
));

// 使用这个路由中间件
app.use("/account", accountRouter);
app.use("/studentmanager", studentManagerRouter);

// 开启监听
app.listen(3000, "127.0.0.1", err => {
  if (err) {
    console.log(err);
  }
  console.log("我是一条咸鱼");
});
