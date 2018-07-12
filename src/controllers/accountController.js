// 控制器
const path = require('path')

// 暴露登录的方法
exports.getLoginpage = (req,res)=>{
    // 读取静态登录页面
    res.sendFile(path.join(__dirname,'../views/login.html'))
}