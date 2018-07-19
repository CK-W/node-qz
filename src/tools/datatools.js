// 封装链接数据库模块

// 引入数据库模块
const MongoClient = require("mongodb").MongoClient;
// 链接地址
const url = "mongodb://localhost:27017";
// 链接数据库
const dbName = "mydb";

// 抽取获取集合的模块
/**
 * collectionName:集合的名称（形参）
 * callback：回调函数（形参）
 */
const getCollection = (collectionName, callback) => {
    //1.连接
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);

        //获取集合，进行操作
        const collection = db.collection(collectionName);

        //通过回调，返回操作的状态
        callback(client, collection)
    })
}

// 将数据库的操作方法（增。查）暴露给控制器
exports.insertOne = (collectionName, params, callback)=>{
    
}


