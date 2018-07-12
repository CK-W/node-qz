// 导入express
const express = require('expresss')
const path = require('path')

// 创建app
const app = express()

// 处理。响应  这一步在控制器中实现

// node中处理静态资源 bootstrap
app.use(express.static(path.join(__dirname,'statics')))

// 继承路由中间件
const accountRouter = require(path.join(__dirname,'./routers/accountRouter'))
// 使用这个路由中间件
app.use('/account', accountRouter)

// 开启监听
app.listen(3000,'12.0.0.1',err=>{
    if (err) {
        console.log(err)
    }
    console.log("我是一条咸鱼");
    
});