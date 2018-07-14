// 控制器
const path = require("path");
const xtpl = require("xtpl");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "mydb";

// 暴露列表静态页面
exports.getStudentListPage = (req, res) => {
  // res.sendFile(path.join(__dirname, "../views/list.html"));

  // 获取到关键字的值
  const keyword = req.query.keyword || ""

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      //获取数据库操作的对象
      const db = client.db(dbName);

      //拿到集合，查询集合中的所有数据
      const collection = db.collection("studentInfo");

      // 查 根据关键字来查 “”代表查询全部
      collection.find({ name: { $regex: keyword } }).toArray((err, docs) => {
        // 关闭数据库
        client.close();
        //使用模板 读取列表页面
        xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,keyword},(err,content)=>{
          res.send(content)
        })
      });
    }
  );
};
