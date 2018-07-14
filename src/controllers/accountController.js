// 控制器
const path = require("path");
const captchapng = require("captchapng");

// 连接数据库
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "mydb";

// 暴露登录的方法
// const getLoginpage = (req,res)=>{
//     // 读取静态登录页面
//     res.sendFile(path.join(__dirname,'../views/login.html'))
// }
// module.exports = getLoginpage

// 登录
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
  // res.send('loginPage ok')
};

// 验证码
exports.getVcode = (req, res) => {
  // 将验证码保存session中
  var random = parseInt(Math.random() * 9000 + 1000);
  req.session.vcode = random;
  var p = new captchapng(80, 30, random); // width,height,numeric captcha

  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(imgbase64);
};

// 注册页面
exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

// 暴露注册到数据库的方法
exports.register = (req, res) => {
  // 假设注册成功
  const result = { status: 0, message: "注册成功" };

  //1.获取传递过来的 username password
  const { username } = req.body;

  //2.判断用户名是否存在，存在就响应用户说用户名已经存在，不存在，就先插入到数据库中，然后响应注册成功
  //2.1 node连接到mongodb服务端

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);

      // 获取到集合
      var collection = db.collection("starsInfo");
      // 根据用户名判断用户是否存在
      collection.findOne({ username }, (err, doc) => {
        // 如果用户名存在
        if (doc != null) {
          // 用户名存在
          result.status = 1;
          result.message = "用户名已经存在!";
          // 关闭数据库
          client.close();
          // 提示用户
          res.json(result);
        } else {
          // 用户不存在，就添加
          collection.insertOne(req.body, (err, result1) => {
            // console.log(req.body);

            // 判断插入结果是否失败，如果失败就是null

            if (result1 == null) {
              result.status = 2;
              result.message = "注册失败!";
            }
            client.close();
            res.json(result);
          });
        }
      });
    }
  );
};

// 暴露处理登录的方法
exports.login = (req, res) => {
  // 假设登录成功
  const result = { status: 0, message: "登录成功" };

  // 获取到请求体中的内容,也就是input中的内容
  const { username, password, vcode } = req.body;
  // console.log(username);

  // 验证验证码 与保存在session中的数据相比
  // console.log(req.session.vcode);
  if (vcode != req.session.vcode) {
    // 不匹配
    result.status = 1;
    result.message = "验证码错误!";

    res.json(result);
    return;
  }

  // 匹配用户名和密码
  // 链接数据库获取数据库里的用户名和密码进行匹配
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      // 连接到集合
      const collection = db.collection("starsInfo");
      // 查询数据库
      collection.findOne({ username, password }, (err, doc) => {
        // 没查到与之匹配的用户名和密码
        if (doc == null) {
          result.status = 2;
          result.message = "用户名或密码错误";
        }
        client.close();
        res.json(result);
      });
    }
  );
};
