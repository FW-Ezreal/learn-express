const express = require('express')
const app = express();
app.set('secret', '&*)&GGYGYGggf')


// - [x]  get | post
app.get('/get', async(req, res) => {
  res.send('get')
})
app.post('/post', async(req, res) => {
  res.send('post')
})


// - [ ]  get query params
app.get('/getquery', async(req, res) => {
  res.send(req.query)
})
app.get('/getparams/:id', async(req, res) => {
  res.send(req.params)
})

// - [ ]  get query params
app.get('/geturl', async(req, res) => {
  console.log(req.url)
})

// https://blog.csdn.net/q781045982/article/details/78834781
// - [ ] 应用级中间件
// 没有挂载路径的中间件，应用中的每个请求都会执行该中间件
app.use((req,res,next) => {
  console.log('Time', Date.now());
  next(); // 传递request对象给下一个中间件
})

// 挂载至/user/:id的中间件，任何执行/user/:id的请求都会执行它
app.use('/use/:id',(req,res,next) => {
  console.log('Request Type',req.method);
  next();
})

// 路由和句柄函数（中间件系统），处理指向/user/:id的GET请求
app.get('/use/:id',(req,res,next)=>{
  console.log('USER');
})

// - [ ] 路由中间件
// 路由级中间件和应用级中间件类似，只不过是它绑定对象为express.Router()

// var router = express.Router()
// // 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
// router.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// })
// 将路由挂载至应用
// app.use('/',router)

app.get('/error',(req,res)=>{
  console.log('router error');
  res.status(402)
})




// - [ ] 错误中间件

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Something broke')
})


// - [ ] 内置中间件 express.static()  express.json()


// - [ ] 第三方中间件
// 通过使用第三方中间件从而为Express应用增加更多的功能
// 安装所需功能的node模块，并在应用中加载，可以在应用级中加载，也可以在路由级中加载

// var cookieParser = require('cookie-parser')
 
// 加载用于解析cookie的中间件
// app.use(cookieParser()


// - 3.路由模块化，不同的路由对应不同的js
// > /api/admin/  后台管理系统路由下的
// - [ ] 登录注册
// - [ ] 文章crud


app.use('/api/web', require('./router/web')(app))
app.use('/api/admin', require('./router/admin')(app))









// - [x]  listen 3100 hello world
app.listen(3100, () => {
  console.log('web server is running, port 3100')
})
